import { SQLiteDatabase } from "expo-sqlite";
import bibleData from "./bibleData";
export default async function migrateDbIfNeeded(db: SQLiteDatabase){ 

  const DATABASE_VERSION = 1

  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentDbVersion = result ? result.user_version : 0;

  if (currentDbVersion >= DATABASE_VERSION){ 
    return
  }

  if (currentDbVersion === 0){ 
    // Drop and create tables
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS chapters;
      DROP TABLE IF EXISTS verses;

      CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title_am TEXT,
        title_en TEXT,
        order_index INTEGER
      );

      CREATE TABLE chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        chapter_number INTEGER,
        FOREIGN KEY(book_id) REFERENCES books(id)
      );

      CREATE TABLE verses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chapter_id INTEGER,
        verse_number INTEGER,
        text_am TEXT,
        text_en TEXT,
        FOREIGN KEY(chapter_id) REFERENCES chapters(id)
      );
    `);


    const insertBook = await db.prepareAsync('INSERT INTO books (title_am, title_en, order_index) VALUES ($title_am, $title_en, $order_index)');
    const insertChapter = await db.prepareAsync('INSERT INTO chapters (book_id, chapter_number) VALUES ($book_id, $chapter_number)');
    const insertVerse = await db.prepareAsync('INSERT INTO verses (chapter_id, verse_number, text_am, text_en) VALUES ($chapter_id, $verse_number, $text_am, $text_en)');
    try {
      for (const [bookIndex, book] of bibleData.books.entries()) {
      const bookResult = await insertBook.executeAsync({
        $title_am: book.title,
        $title_en: "",
        $order_index: bookIndex,
      });
      const bookId = bookResult.lastInsertRowId;

      for (const [chapterIndex, chapter] of book.chapters.entries()) {
        const chapterResult = await insertChapter.executeAsync({
        $book_id: bookId,
        $chapter_number: chapterIndex + 1,
        });
        const chapterId = chapterResult.lastInsertRowId;

        for (const [verseIndex, verseText] of chapter.verses.entries()) {
        await insertVerse.executeAsync({
          $chapter_id: chapterId,
          $verse_number: verseIndex + 1,
          $text_am: verseText,
          $text_en: "",
        });
        }
      }
      }
    } finally {
      await insertBook.finalizeAsync();
      await insertChapter.finalizeAsync();
      await insertVerse.finalizeAsync();
    }

  }

}


