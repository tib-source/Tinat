import { eq } from 'drizzle-orm';
import { db } from '../..';
import { NewVerse, Verse, verses } from '../db/schema';

export async function insertVerse(verse: NewVerse) {
    return await db.transaction(async (tx) => {
        return await tx.insert(verses).values(verse);
    });
}

export async function insertManyVerses(versesData: NewVerse[]) {
    return await db.transaction(async (tx) => {
        return await tx.insert(verses).values(versesData);
    });
}

export async function getVersesForChapter(chapterId: number): Promise<Verse[]> {
    return await db.transaction(async (tx) => {
        return await tx
            .select()
            .from(verses)
            .where(eq(verses.chapterId, chapterId));
    });
}
