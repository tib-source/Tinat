import { toDateId, useCalendar } from '@marceloterreiro/flash-calendar';
import { useMemo } from 'react';
import { GeneratedEvent } from '~/src/generateEvents';
import { getStateFields } from '../helpers/calendarHelper';
import { getToday } from '../helpers/dateHelpers';
import { endOfMonth, startOfMonth } from 'date-fns';

interface EnhancedCalendarProps {
    calendarMonthId: string;
    calendarFirstDayOfWeek?: 'monday' | 'sunday';
    religiousEvents: GeneratedEvent[];
}

export const useEnhancedCalendar = ({
    calendarMonthId,
    calendarFirstDayOfWeek = 'monday',
    religiousEvents
}: EnhancedCalendarProps) => {
    const calendarResult = useCalendar({
        calendarMonthId,
        calendarFirstDayOfWeek
    });

    const enhancedWeekList = useMemo(() => {
        return calendarResult.weeksList.map((week) =>
            week.map((day) => {
                return {
                    id: day.id,
                    date: day.date,
                    displayLabel: day.displayLabel,
                    isDifferentMonth: day.isDifferentMonth,
                    isEndOfMonth: day.isEndOfMonth,
                    isEndOfWeek: day.isEndOfWeek,
                    isStartOfMonth: day.isStartOfMonth,
                    isStartOfWeek: day.isStartOfWeek,
                    isWeekend: day.isWeekend,
                    ...getStateFields({
                        id: day.id,
                        todayId: toDateId(getToday()),
                        calendarActiveDateRanges: religiousEvents,
                        calendarType: 'gregorian',
                        calendarMaxDateId: toDateId(endOfMonth(day.date)),
                        calendarMinDateId: toDateId(startOfMonth(day.date))
                    })
                };
            })
        );
    }, [religiousEvents, calendarResult.weeksList]);

    return {
        weeksList: enhancedWeekList,
        calendarRowMonth: calendarResult.calendarRowMonth,
        weekDaysList: calendarResult.weekDaysList
    };
};
