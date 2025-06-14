import { db } from '../..';
import { logs, NewLog } from '../db/schema';
import { eq, gte } from 'drizzle-orm';
import { getToday } from '../helpers/dateHelpers';

export async function insertLog(log: NewLog) {
    return await db.transaction(async (tx) => {
        return await tx.insert(logs).values(log);
    });
}

// Internal function without transaction wrapper for use within other transactions
export async function insertLogInternal(log: NewLog, tx: any) {
    return await tx.insert(logs).values(log);
}

export async function getLogsForWeekStarting(weekStart: Date) {
    return await db.select().from(logs).where(gte(logs.date, weekStart));
}

export async function getTodaysLog() {
    const today = getToday();
    return await db.select().from(logs).where(eq(logs.date, today)).limit(1);
}

export async function addChaptersRead(chapters: number[]) {
    const today = getToday();
    return await db.transaction(async (tx) => {
        return await tx
            .update(logs)
            .set({
                chaptersRead: chapters
            })
            .where(eq(logs.date, today));
    });
}
