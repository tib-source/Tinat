import { eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../..';
import { books, chapters, NewVerse, Verse, verses } from '../db/schema';
import { toDateId } from '@marceloterreiro/flash-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToday } from '../helpers/dateHelpers';
import { DailyVerse } from '../types';

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

export async function getDailyVerse() {
    return await db.transaction(async (tx) => {
        return (
            await tx
                .select({
                    ...getTableColumns(verses),
                    chapterNumber: chapters.chapterNumber,
                    bookTitleAm: books.titleAm,
                    bookTitleEn: books.titleEn
                })
                .from(verses)
                .leftJoin(chapters, eq(chapters.id, verses.chapterId))
                .leftJoin(books, eq(chapters.bookId, books.id))
                .orderBy(sql`RANDOM()`)
                .limit(1)
        )[0];
    });
}

export async function getDailyVerseCached(): Promise<DailyVerse> {
    const key = `dailyVerse-${toDateId(getToday())}`;

    const cached = await AsyncStorage.getItem(key);
    if (cached) {
        return JSON.parse(cached);
    }

    const verse = await getDailyVerse();
    await AsyncStorage.setItem(key, JSON.stringify(verse));

    return verse;
}
