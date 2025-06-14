import { Book } from './db/schema';

export interface BookData extends Book {
    chapters: number;
    readChapters: number;
}
