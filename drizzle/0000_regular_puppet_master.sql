CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`age` integer NOT NULL,
	`country_city` text NOT NULL,
	`email` text NOT NULL,
	`messenger` text NOT NULL,
	`timezone` text NOT NULL,
	`language` text DEFAULT 'en' NOT NULL,
	`motivation` text DEFAULT '' NOT NULL,
	`experience` text DEFAULT '' NOT NULL,
	`hours_per_week` text DEFAULT '' NOT NULL,
	`preferred_schedule` text DEFAULT '' NOT NULL,
	`content_comfort` text DEFAULT '' NOT NULL,
	`strongest_features` text DEFAULT '' NOT NULL,
	`equipment` text DEFAULT '' NOT NULL,
	`english_level` text DEFAULT '' NOT NULL,
	`relocation_open` text DEFAULT '' NOT NULL,
	`additional_info` text DEFAULT '' NOT NULL,
	`legal_age_confirmed` integer DEFAULT 0 NOT NULL,
	`privacy_accepted` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`submitted_at` text
);
--> statement-breakpoint
CREATE TABLE `application_files` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`kind` text NOT NULL,
	`file_name` text NOT NULL,
	`content_type` text NOT NULL,
	`file_size` integer DEFAULT 0 NOT NULL,
	`r2_key` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `application_files_application_id_idx` ON `application_files` (`application_id`);
--> statement-breakpoint
CREATE INDEX `applications_created_at_idx` ON `applications` (`created_at`);
