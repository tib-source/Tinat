import { useEffect } from 'react';
import { NewLog } from '~/src/db/schema';
import { getToday } from '~/src/helpers/dateHelpers';
import { useAddLog, useLogsForToday, useUpdateLog } from './useDatabase';

export function useReadingTracker(chapterId: number, delayMs: number = 5000) {
    const {
        data: todayLog,
        isSuccess: todaySuccess,
        error
    } = useLogsForToday();
    const { mutate: updateLog } = useUpdateLog();
    const { mutate: addLog } = useAddLog();

    useEffect(() => {
        const activeTimer = setTimeout(() => {
            if (todaySuccess) {
                if (todayLog === undefined || todayLog.length === 0) {
                    const newLog: NewLog = {
                        date: getToday(),
                        chaptersRead: [chapterId]
                    };
                    console.log('Adding entry : ', newLog);
                    addLog(newLog);
                } else {
                    const current = todayLog[0];
                    if (current.chaptersRead.includes(chapterId)) {
                        console.log('doing nothing...');
                        return;
                    }
                    console.log('Updating entry with chapter: ', chapterId);
                    updateLog([...current.chaptersRead, chapterId]);
                }
            } else {
                console.log('error?');
                console.log(error?.message, error?.cause, error?.stack);
            }
        }, delayMs);

        return () => clearTimeout(activeTimer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
