import { SQLiteDatabase } from "expo-sqlite";
import { Book, Chapter, Verse } from "../types";


export const getBooks = async (db: SQLiteDatabase): Promise<Book[]> => {

    return await db.getAllAsync<Book>(`
        SELECT 
          b.id,
          b.title_am,
          b.title_en,
          b.book_number,
          b.testament,
          COUNT(c.id) AS chapters,
          SUM(CASE WHEN c.is_read = 1 THEN 1 ELSE 0 END) AS read_chapters
        FROM 
          books b
        LEFT JOIN 
          chapters c ON b.id = c.book_id
        GROUP BY 
          b.id
        ORDER BY
          b.book_number
      `);

}

export const getBookWithId =  async (db: SQLiteDatabase, book_id: number): Promise<Book|null> => {
  return db.getFirstAsync<Book>(`
      SELECT *
      FROM books
      WHERE id = ${book_id}
    `)
}

export const getChapterWithId =  async (db: SQLiteDatabase, chapter_id: number): Promise<Chapter|null> => {
  return db.getFirstAsync<Chapter>(`
      SELECT *
      FROM chapters
      WHERE id = ${chapter_id}
    `)
}


export const getChaptersForBook = async (db: SQLiteDatabase, book_id: number): Promise<Chapter[]> => {

    return await db.getAllAsync<Chapter>(`
        SELECT 
            c.*,
            COUNT(v.id) as verses
        FROM 
          chapters c
        LEFT JOIN
          verses v ON c.id = v.chapter_id
        WHERE
          c.book_id = ${book_id}
        GROUP BY
          c.id
        ORDER BY
          c.chapter_number
      `);

}


export const getVersesForChapter = async (db: SQLiteDatabase, chapter_id: number): Promise<Verse[]> => {

    return await db.getAllAsync<Verse>(`
        SELECT 
            *
        FROM 
          verses
        WHERE
          chapter_id = ${chapter_id}
      `);

}






export const toggleChapterRead = async (
    db: SQLiteDatabase,
    chapterId: number,
    isRead: boolean
) => {
    return await db.runAsync(
        `UPDATE chapters SET is_read = ? WHERE id = ?`,
        [isRead ? 1 : 0, chapterId]
    );
};