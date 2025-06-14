import { eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../..';
import { books, chapters, NewBook } from '../db/schema';
import { BookData } from '../types';

export async function insertBook(book: NewBook) {
    return await db.transaction(async (tx) => {
        return await tx.insert(books).values(book);
    });
}

export async function insertManyBooks(booksData: NewBook[]) {
    return await db.transaction(async (tx) => {
        return await tx
            .insert(books)
            .values(booksData)
            .returning({ id: books.id });
    });
}

export async function getBookWithId(bookId: number) {
    return await db.transaction(async (tx) => {
        return await tx.query.books.findFirst({
            where: eq(books.id, bookId)
        });
    });
}

export async function getAllBooks(): Promise<BookData[]> {
    return await db.transaction(async (tx) => {
        return await tx
            .select({
                ...getTableColumns(books),
                chapters: sql<number>`cast(count(${chapters.id}) as int)`,
                readChapters: sql<number>`cast(count(case when ${chapters.isRead} = 1 then 1 end) as int)`
            })
            .from(books)
            .leftJoin(chapters, eq(books.id, chapters.bookId))
            .groupBy(books.id)
            .orderBy(books.bookNumber);
    });
}
