import { Book } from './db/schema';

export interface BookData extends Book {
    chapters: number;
    readChapters: number;
}

export interface ReligiousEvent {
    id: string;
    name: {
        am: string;
        en: string;
    };
    eventType: 'fast' | 'feast';
    dateType: 'fixed' | 'variable' | 'weekly';
    // For fixed dates
    month?: number;
    day?: number;
    fromEaster?: number;
    weekDays?: number[];
    duration?: number;
    // Some fasts have a set end day but variable start
    until?: {
        month: number;
        day: number;
    };
    color: string;
}

export interface DailyVerse {
    chapterNumber: number | null;
    bookTitleAm: string | null;
    bookTitleEn: string | null;
    id: number;
    chapterId: number;
    verseNumber: number;
    textAm: string;
    textEn: string;
}
