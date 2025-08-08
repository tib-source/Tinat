CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`testament` text NOT NULL,
	`bookNumber` integer NOT NULL,
	`titleAm` text,
	`titleEn` text
);
--> statement-breakpoint
CREATE TABLE `chapters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookId` integer NOT NULL,
	`chapterNumber` integer NOT NULL,
	`titleAm` text,
	`titleEn` text,
	`isRead` integer DEFAULT false,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`chaptersRead` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_settings_key_unique` ON `user_settings` (`key`);--> statement-breakpoint
CREATE TABLE `verses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chapterId` integer NOT NULL,
	`verseNumber` integer NOT NULL,
	`textAm` text NOT NULL,
	`textEn` text NOT NULL,
	FOREIGN KEY (`chapterId`) REFERENCES `chapters`(`id`) ON UPDATE no action ON DELETE no action
);
