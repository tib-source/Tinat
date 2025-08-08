import { useEffect } from 'react';
import { Chapter, NewLog } from '~/src/db/schema';
import { getToday } from '~/src/helpers/dateHelpers';
import {
    useAddLog,
    useLogsForToday,
    useToggleChapterRead,
    useUpdateLog
} from './useDatabase';

export function useReadingTracker(
    chapter: Chapter | undefined,
    delayMs: number = 5000
) {
    const {
        data: todayLog,
        isSuccess: todaySuccess,
        error
    } = useLogsForToday();

    const { mutate: updateLog } = useUpdateLog();
    const { mutate: addLog } = useAddLog();
    const { mutate: updateChapter } = useToggleChapterRead();

    useEffect(() => {
        if (!chapter) return;

        const activeTimer = setTimeout(() => {
            if (todaySuccess) {
                if (todayLog === undefined || todayLog.length === 0) {
                    const newLog: NewLog = {
                        date: getToday(),
                        chaptersRead: [chapter.id]
                    };
                    console.log('Adding entry : ', newLog);
                    addLog(newLog);
                } else {
                    const current = todayLog[0];
                    if (!current.chaptersRead.includes(chapter.id)) {
                        console.log(
                            'Updating entry with chapter: ',
                            chapter.id
                        );
                        updateLog([...current.chaptersRead, chapter.id]);
                    }
                }

                if (!chapter.isRead) {
                    console.log(`Marking chapter ${chapter.id} as read`);
                    updateChapter({
                        chapterId: chapter.id,
                        isRead: true
                    });
                }
            } else {
                console.log('error?');
                console.log(error?.message, error?.cause, error?.stack);
            }
        }, delayMs);

        return () => clearTimeout(activeTimer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
