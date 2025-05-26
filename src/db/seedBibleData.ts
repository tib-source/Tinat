import { getAllBooks, insertBook, insertManyBooks } from '../queries/bookQueries';
import { insertChapter, insertManyChapters } from '../queries/chapterQueries';
import { insertManyVerses, insertVerse } from '../queries/verseQueries';
import bibleData from './amharic-bible.json';
import { NewVerse, Verse } from './schema';

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
  stats?: {
    books: number;
    chapters: number;
    verses: number;
  };
}> {
  try {
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
        chapterNumber: index,
    }));

    const insertedChaptersResult = await insertManyChapters(chaptersToInsert)
    
    book.chapters.forEach( async (chapter, chapterIndex) => {
        const chapterInserted = insertedChaptersResult[chapterIndex]

        const versesToInsert: NewVerse[] = chapter.verses.map((verse, verseIndex) => {
                    return {
                        chapterId: chapterInserted.id,
                        verseNumber: verseIndex,
                        textAm: verse,
                        textEn: ""
                    };
                });
        await insertManyVerses(versesToInsert);
      })
      
    }
    
    console.log('🎉 Database seeding completed successfully!');
    
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