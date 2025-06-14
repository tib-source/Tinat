// Modern query hooks using TanStack Query + Drizzle
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getChaptersForBook,
    getChapterWithId,
    toggleChapterRead
} from '../queries/chapterQueries';
import { getVersesForChapter } from '../queries/verseQueries';
import { getAllBooks, getBookWithId } from '../queries/bookQueries';
import {
    addChaptersRead,
    getLogsForWeekStarting,
    getTodaysLog,
    insertLog
} from '../queries/logQueries';
import { NewLog } from '../db/schema';

// Book queries
export function useBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: getAllBooks
    });
}

export function useBook(bookId: number) {
    return useQuery({
        queryKey: ['books', bookId],
        queryFn: () => getBookWithId(bookId),
        enabled: !!bookId
    });
}

// Chapter queries
export function useChapter(chapterId: number) {
    return useQuery({
        queryKey: ['chapters', chapterId],
        queryFn: () => getChapterWithId(chapterId)
    });
}
export function useChaptersForBook(bookId: number) {
    return useQuery({
        queryKey: ['chapters', 'book', bookId],
        queryFn: () => getChaptersForBook(bookId),
        enabled: !!bookId
    });
}

export function useVersesForChapter(chapterId: number) {
    return useQuery({
        queryKey: ['verses', 'chapter', chapterId],
        queryFn: () => getVersesForChapter(chapterId),
        enabled: !!chapterId
    });
}

// Mutations
export function useToggleChapterRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleChapterRead,
        onSuccess: (_, { chapterId }) => {
            // Invalidate affected queries
            queryClient.invalidateQueries({
                queryKey: ['chapters', chapterId]
            });
            queryClient.invalidateQueries({ queryKey: ['books'] });
        }
    });
}

export function useAddLog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (log: NewLog) => insertLog(log),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        }
    });
}

export function useWeeklyLog(date: Date) {
    return useQuery({
        queryKey: ['logs', 'weekly'],
        queryFn: () => getLogsForWeekStarting(date)
    });
}

export function useLogsForToday() {
    return useQuery({
        queryKey: ['logs', 'today'],
        queryFn: getTodaysLog
    });
}

export function useUpdateLog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (chapters: number[]) => addChaptersRead(chapters),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        }
    });
}
