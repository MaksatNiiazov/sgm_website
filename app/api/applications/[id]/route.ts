import {
  ensureDatabase,
  getD1,
  getRuntimeEnv,
  toRouteErrorMessage,
} from "../../../../db";

type CountRow = {
  photo_count: number;
  video_count: number;
};

type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  country_city: string;
  submitted_at: string | null;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const { id } = await params;
    const payload = (await request.json()) as { status?: string };

    if (payload.status !== "submitted") {
      return Response.json({ error: "Unsupported status." }, { status: 400 });
    }

    const db = getD1();
    const counts = await db
      .prepare(
        `SELECT
          SUM(CASE WHEN kind = 'photo' THEN 1 ELSE 0 END) AS photo_count,
          SUM(CASE WHEN kind = 'video' THEN 1 ELSE 0 END) AS video_count
        FROM application_files
        WHERE application_id = ?`
      )
      .bind(id)
      .first<CountRow>();

    const photoCount = Number(counts?.photo_count ?? 0);
    const videoCount = Number(counts?.video_count ?? 0);

    if (photoCount < 8 || photoCount > 15 || videoCount < 2 || videoCount > 5) {
      return Response.json(
        { error: "Portfolio must include 8-15 photos and 2-5 videos." },
        { status: 400 }
      );
    }

    await db
      .prepare(
        "UPDATE applications SET status = 'submitted', submitted_at = CURRENT_TIMESTAMP WHERE id = ?"
      )
      .bind(id)
      .run();

    const application = await db
      .prepare(
        "SELECT id, full_name, email, country_city, submitted_at FROM applications WHERE id = ?"
      )
      .bind(id)
      .first<ApplicationRow>();

    await notifyAdmin(application, photoCount, videoCount);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

async function notifyAdmin(
  application: ApplicationRow | null,
  photoCount: number,
  videoCount: number
) {
  const webhookUrl = getRuntimeEnv().ADMIN_WEBHOOK_URL?.trim();

  if (!webhookUrl || !application) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "strawberry_glam_application_submitted",
        application,
        portfolio: { photos: photoCount, videos: videoCount },
      }),
    });
  } catch {
    // Persistent storage is the source of truth; webhook delivery is best effort.
  }
}
