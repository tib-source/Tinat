import { db } from "../.."
import { logs, NewLog } from "../db/schema"
import { eq, gte } from "drizzle-orm"


export async function insertLog(log: NewLog){
  return await db
  .insert(logs)
  .values(log)
}
export async function getLogsForWeekStarting( weekStart: Date){
  return await db
  .select()
  .from(logs)
  .where(gte(logs.date, weekStart))
}


export async function getTodaysLog(){
  const today = new Date()
  return await db
  .select()
  .from(logs)
  .where(eq(logs.date, today))
}


export async function addChaptersRead(chapters: number[]){
  return await db
  .update(logs)
  .set(
    {
      chaptersRead: chapters
    }
  )
}