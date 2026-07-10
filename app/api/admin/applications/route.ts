import {
  ensureDatabase,
  getD1,
  getRuntimeEnv,
  toRouteErrorMessage,
} from "../../../../db";

export async function GET(request: Request) {
  const adminError = requireAdmin(request);
  if (adminError) {
    return adminError;
  }

  try {
    await ensureDatabase();
    const result = await getD1()
      .prepare(
        `SELECT
          applications.id,
          applications.full_name,
          applications.age,
          applications.country_city,
          applications.email,
          applications.messenger,
          applications.timezone,
          applications.status,
          applications.created_at,
          applications.submitted_at,
          COUNT(application_files.id) AS file_count,
          SUM(CASE WHEN application_files.kind = 'photo' THEN 1 ELSE 0 END) AS photo_count,
          SUM(CASE WHEN application_files.kind = 'video' THEN 1 ELSE 0 END) AS video_count
        FROM applications
        LEFT JOIN application_files ON application_files.application_id = applications.id
        GROUP BY applications.id
        ORDER BY applications.created_at DESC
        LIMIT 100`
      )
      .all();

    return Response.json({ applications: result.results });
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
