import { db } from '~/index';
import { getAllBooks, insertBook, insertManyBooks } from '../queries/bookQueries';
import { insertChapter, insertManyChapters } from '../queries/chapterQueries';
import { insertManyVerses, insertVerse } from '../queries/verseQueries';
import bibleData from './amharic-bible.json';
import { books, chapters, NewVerse, Verse, verses } from './schema';
import { sql } from 'drizzle-orm';
import { getAllDaysInCurrentWeek } from '../helpers/dateHelpers';
import { insertLog } from '../queries/logQueries';

interface BibleChapter {
  chapter: string;
  title: string;
  verses: string[];
}

interface BibleBook {
  title: string;
  abbv: string;
  chapters: BibleChapter[];
  testament: string;
}

interface BibleData {
  title: string;
  books: BibleBook[];
}

export async function seedBibleData(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const DB_VERSION = 2
    const result = await db.get(sql`PRAGMA user_version`);
    const currentVersion = result ? (result as any).user_version : 0;

    if (currentVersion === DB_VERSION){
      console.log('Database already seeded with version', currentVersion);
      return {
        success: true
      }
    }

    console.log('Current DB version:', currentVersion, 'Target version:', DB_VERSION);

    // Actually clear the tables completely
    try {
      await db.delete(books)
      await db.delete(chapters)
      await db.delete(verses)
      console.log('Tables cleared successfully');
    } catch (clearError) {
      console.log('Tables might not exist yet, continuing with seeding...');
    }  

    console.log('🌱 Starting bible data seeding...');
    
    const bibleJson = bibleData as BibleData;
    
    let totalBooks = 0;
    let totalChapters = 0;
    let totalVerses = 0;
    
    const booksData = bibleJson.books.map((book, index) => {
      return {
        titleAm: book.title,
        titleEn: "",
        bookNumber: index + 1,
        testament: book.testament === 'old' ? 'old' : 'new'
      }
    })

    const insertedBookResult = await insertManyBooks(booksData)


    for (let bookIndex = 0; bookIndex < bibleJson.books.length; bookIndex++) {
      const book = bibleJson.books[bookIndex];
      const bookId = insertedBookResult[bookIndex]

    const chaptersToInsert = book.chapters.map((chapter, index) => ({
        bookId: bookId.id,
        chapterNumber: index + 1,
    }));

    const insertedChaptersResult = await insertManyChapters(chaptersToInsert)
    
    book.chapters.forEach( async (chapter, chapterIndex) => {
        const chapterInserted = insertedChaptersResult[chapterIndex]

        const versesToInsert: NewVerse[] = chapter.verses.map((verse, verseIndex) => {
                    return {
                        chapterId: chapterInserted.id,
                        verseNumber: verseIndex + 1,
                        textAm: verse,
                        textEn: ""
                    };
                });
        await insertManyVerses(versesToInsert);
      })
      
    }
    
    const daysInWeek = getAllDaysInCurrentWeek()

    for (let day of daysInWeek){
      const currentIndex = daysInWeek.indexOf(day)
      if (currentIndex < 3){ 
        insertLog({
          date: day, 
          chaptersRead: [1]
        })
      }
    }


    console.log('🎉 Database seeding completed successfully!');
    
    
    // set the db version to the latest 
    await db.run(`PRAGMA user_version = ${DB_VERSION}`);
    
    return {
      success: true,
    };
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}