import { ensureDatabase, getD1, toRouteErrorMessage } from "../../../db";

type ApplicationPayload = {
  language?: string;
  personal?: {
    fullName?: string;
    age?: string;
    countryCity?: string;
    email?: string;
    messenger?: string;
    timezone?: string;
  };
  answers?: Record<string, string | undefined>;
  legalAgeConfirmed?: boolean;
  privacyAccepted?: boolean;
};

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const payload = (await request.json()) as ApplicationPayload;
    const personal = payload.personal ?? {};
    const answers = payload.answers ?? {};
    const age = Number(personal.age);

    if (!Number.isFinite(age) || age < 18 || !payload.legalAgeConfirmed) {
      return Response.json(
        { error: "Applicants must be 18+ and confirm age verification readiness." },
        { status: 400 }
      );
    }

    if (!payload.privacyAccepted) {
      return Response.json(
        { error: "Privacy consent is required before submitting materials." },
        { status: 400 }
      );
    }

    const applicationId = crypto.randomUUID();
    const db = getD1();

    await db
      .prepare(
        `INSERT INTO applications (
          id,
          full_name,
          age,
          country_city,
          email,
          messenger,
          timezone,
          language,
          motivation,
          experience,
          hours_per_week,
          preferred_schedule,
          content_comfort,
          strongest_features,
          equipment,
          english_level,
          relocation_open,
          additional_info,
          legal_age_confirmed,
          privacy_accepted,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        applicationId,
        personal.fullName?.trim() ?? "",
        age,
        personal.countryCity?.trim() ?? "",
        personal.email?.trim() ?? "",
        personal.messenger?.trim() ?? "",
        personal.timezone?.trim() ?? "",
        payload.language === "ru" ? "ru" : "en",
        answers.motivation?.trim() ?? "",
        answers.experience?.trim() ?? "",
        answers.hoursPerWeek?.trim() ?? "",
        answers.preferredSchedule?.trim() ?? "",
        answers.contentComfort?.trim() ?? "",
        answers.strongestFeatures?.trim() ?? "",
        answers.equipment?.trim() ?? "",
        answers.englishLevel?.trim() ?? "",
        answers.relocationOpen?.trim() ?? "",
        answers.additionalInfo?.trim() ?? "",
        1,
        1,
        "draft"
      )
      .run();

    return Response.json({ applicationId }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}
