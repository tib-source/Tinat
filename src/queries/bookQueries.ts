import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { Book, books, chapters, NewBook } from "../db/schema";
import { BookData } from "../types";


export async function insertBook( book: NewBook){
    return await db
    .insert(books)
    .values(book)
}

export async function getBookWithId(bookId: number){ 
    return await db.query.books.findFirst({
        where: eq(books.id, bookId)
    })
}

export async function getAllBooks(): Promise<BookData[]> {
    return await db
    .select({
        id: books.id,
        titleAm: books.titleAm,
        titleEn: books.titleEn,
        bookNumber: books.bookNumber,
        testament: books.testament,
        chapters: sql<number>`cast(count(${chapters.id})) as int`,
        readChapters: sql<number>`cast(count(case when ${chapters.isRead} = 1 then 1 end) as int)`
    })
    .from(books)
    .leftJoin(chapters, eq(chapters.bookId, books.id))
    .groupBy(books.id)
    .orderBy(books.bookNumber)
}