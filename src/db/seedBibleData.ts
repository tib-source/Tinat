import { db } from '~/index';
import bibleData from './amharic-bible.json';
import { books, chapters, logs, NewVerse, verses } from './schema';
import { sql } from 'drizzle-orm';

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
        const DB_VERSION = 2;
        const result = await db.transaction(async (tx) => {
            return await tx.get(sql`PRAGMA user_version`);
        });
        const currentVersion = result ? (result as any).user_version : 0;

        if (currentVersion === DB_VERSION) {
            console.log('Database already seeded with version', currentVersion);
            return {
                success: true
            };
        }

        console.log(
            'Current DB version:',
            currentVersion,
            'Target version:',
            DB_VERSION
        );

        // Actually clear the tables completely
        try {
            await db.transaction(async (tx) => {
                await tx.delete(verses);
                await tx.delete(chapters);
                await tx.delete(books);
                await tx.delete(logs);
            });
            console.log('Tables cleared successfully');
        } catch (err) {
            console.log(
                'Tables might not exist yet, continuing with seeding...',
                err
            );
        }

        console.log('🌱 Starting bible data seeding...');

        const bibleJson = bibleData as BibleData;

        const booksData = bibleJson.books.map((book, index) => {
            return {
                titleAm: book.title,
                titleEn: '',
                bookNumber: index + 1,
                testament: book.testament === 'old' ? 'old' : 'new'
            };
        });

        // Do all the seeding in a single transaction to avoid nested transaction issues
        await db.transaction(async (tx) => {
            // Insert books
            const insertedBookResult = await tx
                .insert(books)
                .values(booksData)
                .returning({ id: books.id });

            for (
                let bookIndex = 0;
                bookIndex < bibleJson.books.length;
                bookIndex++
            ) {
                const book = bibleJson.books[bookIndex];
                const bookId = insertedBookResult[bookIndex];

                const chaptersToInsert = book.chapters.map(
                    (chapter, index) => ({
                        bookId: bookId.id,
                        chapterNumber: index + 1
                    })
                );

                const insertedChaptersResult = await tx
                    .insert(chapters)
                    .values(chaptersToInsert)
                    .returning({ id: chapters.id });

                // Use for...of instead of forEach to properly handle async operations
                for (
                    let chapterIndex = 0;
                    chapterIndex < book.chapters.length;
                    chapterIndex++
                ) {
                    const chapter = book.chapters[chapterIndex];
                    const chapterInserted =
                        insertedChaptersResult[chapterIndex];

                    const versesToInsert: NewVerse[] = chapter.verses.map(
                        (verse, verseIndex) => {
                            return {
                                chapterId: chapterInserted.id,
                                verseNumber: verseIndex + 1,
                                textAm: verse,
                                textEn: ''
                            };
                        }
                    );

                    await tx.insert(verses).values(versesToInsert);
                }
            }
        });

        // // Seed logs 
        // await db.transaction(async (tx) => {
        //   const daysInWeek = getAllDaysInCurrentWeek()
        //   console.log(daysInWeek)
        //   for (let day of daysInWeek){
        //     const currentIndex = daysInWeek.indexOf(day)
        //     if (currentIndex < 3){
        //       await tx
        //         .insert(logs)
        //         .values({
        //           date: day,
        //           chaptersRead: [1]
        //         })
        //     }
        //   }
        // })

        console.log('🎉 Database seeding completed successfully!');

        // set the db version to the latest
        await db.run(`PRAGMA user_version = ${DB_VERSION}`);

        return {
            success: true
        };
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred'
        };
    }
}
