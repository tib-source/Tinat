import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Books table
export const books = sqliteTable('books', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  testament: text('testament').notNull(), // 'Old' or 'New'
  bookNumber: integer('bookNumber').notNull(),
  titleAm: text('titleAm'),
  titleEn: text('titleEn'),
});

// Chapters table
export const chapters = sqliteTable('chapters', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  bookId: integer('book_id').notNull().references(() => books.id),
  chapterNumber: integer('chapter_number').notNull(),
  titleAm: text('titleAm'),
  titleEn: text('titleEn'),
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
});

// Verses table
export const verses = sqliteTable('verses', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  chapterId: integer('chapter_id').notNull().references(() => chapters.id),
  verseNumber: integer('verse_number').notNull(),
  textAm: text('textAm').notNull(),
  textEn: text('textEn').notNull(),
});

export const logs = sqliteTable('logs', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    date: integer({ mode: 'timestamp' }).notNull(), // Use text for dates in SQLite
    chaptersRead: text('chapters_read', { mode: 'json' }).notNull(), // Use text with JSON mode
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});


// // Bookmarks table
// export const bookmarks = sqliteTable('bookmarks', {
//   id: integer('id').primaryKey(),
//   bookId: integer('book_id').notNull().references(() => books.id),
//   chapterNumber: integer('chapter_number').notNull(),
//   verseNumber: integer('verse_number'),
//   note: text('note'),
//   createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
// });

// // Reading plans table
// export const readingPlans = sqliteTable('reading_plans', {
//   id: integer('id').primaryKey(),
//   name: text('name').notNull(),
//   description: text('description'),
//   duration: integer('duration').notNull(), // days
//   isActive: integer('is_active', { mode: 'boolean' }).default(false),
//   startDate: text('start_date'),
//   createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
// });

// // Reading plan schedule table
// export const readingPlanSchedule = sqliteTable('reading_plan_schedule', {
//   id: integer('id').primaryKey(),
//   planId: integer('plan_id').notNull().references(() => readingPlans.id),
//   day: integer('day').notNull(),
//   bookId: integer('book_id').notNull().references(() => books.id),
//   startChapter: integer('start_chapter').notNull(),
//   endChapter: integer('end_chapter').notNull(),
//   isCompleted: integer('is_completed', { mode: 'boolean' }).default(false),
// });

// User settings table
export const userSettings = sqliteTable('user_settings', {
  id: integer('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});



export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

export type Chapter = typeof chapters.$inferSelect;
export type NewChapter = typeof chapters.$inferInsert;

export type Verse = typeof verses.$inferSelect;
export type NewVerse = typeof verses.$inferInsert;

export type Log = typeof logs.$inferSelect;
export type NewLog = typeof logs.$inferInsert;

// export type ReadingProgress = typeof readingProgress.$inferSelect;
// export type NewReadingProgress = typeof readingProgress.$inferInsert;

// export type Bookmark = typeof bookmarks.$inferSelect;
// export type NewBookmark = typeof bookmarks.$inferInsert;

// export type ReadingPlan = typeof readingPlans.$inferSelect;
// export type NewReadingPlan = typeof readingPlans.$inferInsert;

// export type ReadingPlanSchedule = typeof readingPlanSchedule.$inferSelect;
// export type NewReadingPlanSchedule = typeof readingPlanSchedule.$inferInsert;

export type UserSetting = typeof userSettings.$inferSelect;
export type NewUserSetting = typeof userSettings.$inferInsert;