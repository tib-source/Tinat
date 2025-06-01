import { eq } from "drizzle-orm";
import { db } from "../..";
import { NewVerse, Verse, verses } from "../db/schema";


export async function insertVerse(verse: NewVerse){
    return await db
    .insert(verses)
    .values(verse)
}

export async function insertManyVerses(versesData: NewVerse[]){
    return await db
    .insert(verses)
    .values(versesData)
}

export async function getVersesForChapter(chapterId: number): Promise<Verse[]>{
    return await db
    .select()
    .from(verses)
    .where(eq(verses.chapterId, chapterId))
}

