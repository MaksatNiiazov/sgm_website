import {
  ensureDatabase,
  getD1,
  getMediaBucket,
  getRuntimeEnv,
  toRouteErrorMessage,
} from "../../../../../db";

type FileRow = {
  file_name: string;
  content_type: string;
  r2_key: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminError = requireAdmin(request);
  if (adminError) {
    return adminError;
  }

  try {
    await ensureDatabase();
    const { id } = await params;
    const file = await getD1()
      .prepare(
        "SELECT file_name, content_type, r2_key FROM application_files WHERE id = ?"
      )
      .bind(id)
      .first<FileRow>();

    if (!file) {
      return Response.json({ error: "File not found." }, { status: 404 });
    }

    const object = await getMediaBucket().get(file.r2_key);

    if (!object) {
      return Response.json({ error: "Stored file is missing." }, { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "content-type": file.content_type,
        "content-disposition": `attachment; filename="${file.file_name.replace(/"/g, "'")}"`,
        "cache-control": "private, max-age=0, no-store",
      },
    });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

function requireAdmin(request: Request) {
  const expected = getRuntimeEnv().ADMIN_ACCESS_KEY?.trim();

  if (!expected) {
    return Response.json(
      { error: "Admin access key is not configured." },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";

  if (token !== expected) {
    return Response.json({ error: "Invalid admin access key." }, { status: 401 });
  }

  return null;
}
