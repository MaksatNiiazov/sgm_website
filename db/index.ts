import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export type RuntimeEnv = {
  DB?: D1Database;
  MEDIA?: R2Bucket;
  ADMIN_ACCESS_KEY?: string;
  ADMIN_WEBHOOK_URL?: string;
};

let schemaReady: Promise<void> | null = null;

export function getRuntimeEnv() {
  return env as unknown as RuntimeEnv;
}

export function getD1() {
  const runtimeEnv = getRuntimeEnv();

  if (!runtimeEnv.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB`."
    );
  }

  return runtimeEnv.DB;
}

export function getMediaBucket() {
  const runtimeEnv = getRuntimeEnv();

  if (!runtimeEnv.MEDIA) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Set the `r2` field in .openai/hosting.json to `MEDIA`."
    );
  }

  return runtimeEnv.MEDIA;
}

export async function ensureDatabase() {
  if (!schemaReady) {
    schemaReady = initializeDatabase().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }

  return schemaReady;
}

async function initializeDatabase() {
  const db = getD1();

  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        country_city TEXT NOT NULL,
        email TEXT NOT NULL,
        messenger TEXT NOT NULL,
        timezone TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        motivation TEXT NOT NULL DEFAULT '',
        experience TEXT NOT NULL DEFAULT '',
        hours_per_week TEXT NOT NULL DEFAULT '',
        preferred_schedule TEXT NOT NULL DEFAULT '',
        content_comfort TEXT NOT NULL DEFAULT '',
        strongest_features TEXT NOT NULL DEFAULT '',
        equipment TEXT NOT NULL DEFAULT '',
        english_level TEXT NOT NULL DEFAULT '',
        relocation_open TEXT NOT NULL DEFAULT '',
        additional_info TEXT NOT NULL DEFAULT '',
        legal_age_confirmed INTEGER NOT NULL DEFAULT 0,
        privacy_accepted INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        submitted_at TEXT
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS application_files (
        id TEXT PRIMARY KEY,
        application_id TEXT NOT NULL,
        kind TEXT NOT NULL,
        file_name TEXT NOT NULL,
        content_type TEXT NOT NULL,
        file_size INTEGER NOT NULL DEFAULT 0,
        r2_key TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
      )
    `),
    db.prepare(
      "CREATE INDEX IF NOT EXISTS application_files_application_id_idx ON application_files (application_id)"
    ),
    db.prepare(
      "CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at)"
    ),
  ]);
}

export function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table")) {
    return "The application database is not ready yet. Please try again shortly.";
  }

  return message;
}

export function getDb() {
  return drizzle(getD1(), { schema });
}
