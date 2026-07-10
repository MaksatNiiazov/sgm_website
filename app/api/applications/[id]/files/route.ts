import {
  ensureDatabase,
  getD1,
  getMediaBucket,
  toRouteErrorMessage,
} from "../../../../../db";

const PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const VIDEO_TYPES = new Set(["video/mp4", "video/quicktime", "video/webm"]);
const PHOTO_LIMIT = 25 * 1024 * 1024;
const VIDEO_LIMIT = 250 * 1024 * 1024;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const { id: applicationId } = await params;
    const url = new URL(request.url);
    const kind = url.searchParams.get("kind");

    if (kind !== "photo" && kind !== "video") {
      return Response.json({ error: "File kind must be photo or video." }, { status: 400 });
    }

    const contentType =
      request.headers.get("content-type") ?? "application/octet-stream";
    const fileSize = Number(
      request.headers.get("x-file-size") ?? request.headers.get("content-length") ?? "0"
    );
    const allowedTypes = kind === "photo" ? PHOTO_TYPES : VIDEO_TYPES;
    const sizeLimit = kind === "photo" ? PHOTO_LIMIT : VIDEO_LIMIT;

    if (!allowedTypes.has(contentType)) {
      return Response.json(
        { error: `Unsupported ${kind} file type.` },
        { status: 400 }
      );
    }

    if (!fileSize || fileSize > sizeLimit) {
      return Response.json(
        { error: `${kind === "photo" ? "Photo" : "Video"} file is too large.` },
        { status: 413 }
      );
    }

    if (!request.body) {
      return Response.json({ error: "File body is missing." }, { status: 400 });
    }

    const db = getD1();
    const application = await db
      .prepare("SELECT id FROM applications WHERE id = ?")
      .bind(applicationId)
      .first<{ id: string }>();

    if (!application) {
      return Response.json({ error: "Application not found." }, { status: 404 });
    }

    const fileId = crypto.randomUUID();
    const fileName = cleanFileName(request.headers.get("x-file-name") ?? `${kind}-${fileId}`);
    const r2Key = `applications/${applicationId}/${fileId}-${fileName}`;
    const media = getMediaBucket();

    await media.put(r2Key, request.body, {
      httpMetadata: { contentType },
      customMetadata: {
        applicationId,
        kind,
        originalName: fileName,
      },
    });

    await db
      .prepare(
        `INSERT INTO application_files (
          id,
          application_id,
          kind,
          file_name,
          content_type,
          file_size,
          r2_key
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(fileId, applicationId, kind, fileName, contentType, fileSize, r2Key)
      .run();

    return Response.json({ fileId }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

function cleanFileName(raw: string) {
  let decoded = raw;

  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  return decoded
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}
