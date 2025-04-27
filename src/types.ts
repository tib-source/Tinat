export interface Book {
    book_number: number;
    title_am: string;
    title_en: string;
    chapters: number;
    read_chapters: number;
}

export interface BookList {
    books: Book[];
}