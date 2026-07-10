import {
  ensureDatabase,
  getD1,
  getMediaBucket,
  getRuntimeEnv,
  toRouteErrorMessage,
} from "../../../../../db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminError = requireAdmin(request);
  if (adminError) return adminError;

  try {
    await ensureDatabase();
    const { id } = await params;
    const db = getD1();
    const application = await db
      .prepare("SELECT * FROM applications WHERE id = ?")
      .bind(id)
      .first<Record<string, unknown>>();

    if (!application) {
      return Response.json({ error: "Application not found." }, { status: 404 });
    }

    const files = await db
      .prepare(
        `SELECT id, kind, file_name, content_type, file_size, created_at
         FROM application_files
         WHERE application_id = ?
         ORDER BY created_at ASC`
      )
      .bind(id)
      .all();

    return Response.json({ application: { ...application, files: files.results } });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminError = requireAdmin(request);
  if (adminError) return adminError;

  try {
    await ensureDatabase();
    const { id } = await params;
    const db = getD1();
    const application = await db
      .prepare("SELECT id FROM applications WHERE id = ?")
      .bind(id)
      .first<{ id: string }>();

    if (!application) {
      return Response.json({ error: "Application not found." }, { status: 404 });
    }

    const files = await db
      .prepare("SELECT r2_key FROM application_files WHERE application_id = ?")
      .bind(id)
      .all<{ r2_key: string }>();
    const keys = files.results.map((file) => file.r2_key).filter(Boolean);

    if (keys.length) {
      await getMediaBucket().delete(keys);
    }

    await db
      .prepare("DELETE FROM application_files WHERE application_id = ?")
      .bind(id)
      .run();
    await db.prepare("DELETE FROM applications WHERE id = ?").bind(id).run();

    return Response.json({ ok: true, deletedFiles: keys.length });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
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
