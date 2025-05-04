export interface Book {
    id: number
    testament: string
    book_number: number;
    title_am: string;
    title_en: string;
    chapters: number;
    read_chapters: number;
}


export interface Chapter {
    id: number;
    book_id: number;
    chapter_number: number;
    verses: number;
    is_read: number; 
}


export interface Verse {
    id: number;
    chapter_id: number;
    text_am: string; 
    text_en: string;
}