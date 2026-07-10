import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  age: integer("age").notNull(),
  countryCity: text("country_city").notNull(),
  email: text("email").notNull(),
  messenger: text("messenger").notNull(),
  timezone: text("timezone").notNull(),
  language: text("language").notNull().default("en"),
  motivation: text("motivation").notNull().default(""),
  experience: text("experience").notNull().default(""),
  hoursPerWeek: text("hours_per_week").notNull().default(""),
  preferredSchedule: text("preferred_schedule").notNull().default(""),
  contentComfort: text("content_comfort").notNull().default(""),
  strongestFeatures: text("strongest_features").notNull().default(""),
  equipment: text("equipment").notNull().default(""),
  englishLevel: text("english_level").notNull().default(""),
  relocationOpen: text("relocation_open").notNull().default(""),
  additionalInfo: text("additional_info").notNull().default(""),
  legalAgeConfirmed: integer("legal_age_confirmed", {
    mode: "boolean",
  }).notNull().default(false),
  privacyAccepted: integer("privacy_accepted", {
    mode: "boolean",
  }).notNull().default(false),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  submittedAt: text("submitted_at"),
});

export const applicationFiles = sqliteTable("application_files", {
  id: text("id").primaryKey(),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(),
  fileName: text("file_name").notNull(),
  contentType: text("content_type").notNull(),
  fileSize: integer("file_size").notNull().default(0),
  r2Key: text("r2_key").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
