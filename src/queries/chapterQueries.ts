import { db } from "../..";
import { Chapter, chapters, NewChapter, verses } from "../db/schema";
import { eq, getTableColumns, sql } from "drizzle-orm";


export async function insertChapter(chapter: NewChapter){
    return await db
    .insert(chapters)
    .values(chapter)
}

// Add batch insert function
export async function insertManyChapters(chaptersData: NewChapter[]){
    return await db
    .insert(chapters)
    .values(chaptersData)
    .returning({id: chapters.id})
}

export async function getChapterWithId(chapterId : number){
    return (await db
    .select({
      ...getTableColumns(chapters),
      verses: sql<number>`cast(count(${verses.id}) as int)`
    })
    .from(chapters)
    .leftJoin(verses, eq(chapters.id, verses.chapterId))
    .where(eq(chapters.id, chapterId))
    .groupBy(chapters.id)
    .limit(1))[0]
}

export async function getChaptersForBook(bookId: number){
    return await db
    .select({
      ...getTableColumns(chapters),
      verses: sql<number>`cast(count(${verses.id}) as int)`
    })
    .from(chapters)
    .leftJoin(verses, eq(chapters.id, verses.chapterId))
    .groupBy(chapters.id)
    .where(eq(chapters.bookId, bookId))
    .orderBy(chapters.chapterNumber)
}

export async function toggleChapterRead ({ chapterId, isRead }: { chapterId: number; isRead: boolean }) {
      return await db
        .update(chapters)
        .set({ 
          isRead, 
        })
        .where(eq(chapters.id, chapterId));
}