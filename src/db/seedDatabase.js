const fs = require('fs');
const Database = require('better-sqlite3');

// Load your JSON file
const bibleData = JSON.parse(fs.readFileSync('./amharic_bible.json', 'utf-8'));

// Create or overwrite the SQLite DB
const db = new Database('bible.sqlite');

// Drop and create tables
db.exec(`
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

const insertBook = db.prepare(`INSERT INTO books (title_am, title_en, order_index) VALUES (?, ?, ?)`);
const insertChapter = db.prepare(`INSERT INTO chapters (book_id, chapter_number) VALUES (?, ?)`);
const insertVerse = db.prepare(`INSERT INTO verses (chapter_id, verse_number, text_am, text_en) VALUES (?, ?, ?, ?)`);

bibleData.books.forEach((book, bookIndex) => {
    const bookResult = insertBook.run(book.title, "", bookIndex);
    const bookId = bookResult.lastInsertRowid;
  
    book.chapters.forEach((chapter, chapterIndex) => {
      const chapterResult = insertChapter.run(bookId, chapterIndex + 1);
      const chapterId = chapterResult.lastInsertRowid;
  
      chapter.verses.forEach((verseText, verseIndex) => {
        insertVerse.run(chapterId, verseIndex + 1, verseText, ""); // leave English empty if not available
      });
    });
  });
  
  console.log("✅ Bible database created with chapters: bible.sqlite");