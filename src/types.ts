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
    // For variable dates (relative to Easter)
    fromEaster?: number;
    // For weekly events
    weekDays?: number[];
    // For fasts only
    duration?: number;
    // Color for the event (light and transparent, works in both light and dark modes)
    color: string;
}
