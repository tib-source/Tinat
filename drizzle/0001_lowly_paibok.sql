ALTER TABLE `user_settings` RENAME TO `userSettings`;--> statement-breakpoint
ALTER TABLE `userSettings` RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
DROP INDEX `user_settings_key_unique`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_userSettings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`settings` text NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_userSettings`("id", "settings", "updatedAt") SELECT "id", "settings", "updatedAt" FROM `userSettings`;--> statement-breakpoint
DROP TABLE `userSettings`;--> statement-breakpoint
ALTER TABLE `__new_userSettings` RENAME TO `userSettings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;