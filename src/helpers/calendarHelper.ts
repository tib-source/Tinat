// taken from flash-calendar. Had to copy these since they are not exported by default
import { UseCalendarParams } from '@marceloterreiro/flash-calendar';
import { GeneratedEvent } from '../generateEvents';
import {
    gregorianToEthiopian,
    formatCalendarDate,
    formatGregCalendarDate
} from '~/src/helpers/ethiopianCalendarHelpers';

import {
    CalendarDate,
    endOfMonth,
    GregorianCalendar,
    startOfMonth
} from '@internationalized/date';

import {
    startOfMonth as startOfMonthDateFns,
    endOfMonth as endOfMonthDateFns
} from 'date-fns';

export type DayState = 'idle' | 'active' | 'today' | 'disabled';

type GetStateFields = Pick<
    UseCalendarParams,
    'calendarMinDateId' | 'calendarMaxDateId' | 'calendarDisabledDateIds'
> & {
    calendarActiveDateRanges?: GeneratedEvent[];
    todayId?: string;
    id: string;
    calendarType: 'gregorian' | 'ethiopian';
};

interface CalendarDayStateFields {
    isDisabled: boolean;
    isToday: boolean;
    isStartOfRange: boolean;
    isEndOfRange: boolean;
    state: DayState;
    isRangeValid: boolean;
    eventMetadata: Partial<GeneratedEvent>;
}

export const getStateFields = ({
    todayId,
    id,
    calendarActiveDateRanges,
    calendarType,
    calendarMinDateId,
    calendarMaxDateId
}: GetStateFields): CalendarDayStateFields & {
    allEvents: Partial<GeneratedEvent>[];
} => {
    // Find all events that overlap this day
    const allEvents = (calendarActiveDateRanges || []).filter((range) => {
        const startId =
            calendarType === 'gregorian' ? range.startDate : range.ethStartDate;
        const endId =
            calendarType === 'gregorian' ? range.endDate : range.ethEndDate;
        if (startId && endId) {
            return id >= startId && id <= endId;
        } else if (startId) {
            return id === startId;
        } else if (endId) {
            return id === endId;
        }
        return false;
    });

    const getStartId = (range: any) =>
        calendarType === 'gregorian' ? range?.startDate : range?.ethStartDate;
    const getEndId = (range: any) =>
        calendarType === 'gregorian' ? range?.endDate : range?.ethEndDate;

    const isRangeValid =
        (allEvents.length > 0 &&
            getStartId(allEvents[0]) !== undefined &&
            getEndId(allEvents[0]) !== undefined) ||
        false;

    const isDisabled =
        ((calendarMinDateId && id < calendarMinDateId) ||
            (calendarMaxDateId && id > calendarMaxDateId)) === true;

    const isToday = todayId === id;

    const state: DayState =
        allEvents.length > 0
            ? ('active' as const)
            : isDisabled
              ? 'disabled'
              : isToday
                ? 'today'
                : 'idle';

    return {
        isStartOfRange:
            allEvents.length > 0 ? id === getStartId(allEvents[0]) : false,
        isEndOfRange:
            allEvents.length > 0 ? id === getEndId(allEvents[0]) : false,
        isRangeValid,
        state,
        isDisabled,
        isToday,
        eventMetadata: {
            type: allEvents[0]?.type,
            color: allEvents[0]?.color
        },
        allEvents: allEvents.map((ev) => ({
            type: ev.type,
            color: ev.color,
            id: ev.id
        }))
    };
};

export function parseYMD(
    str?: string
): { year: number; month: number; day?: number } | null {
    if (!str) return null;
    const parts = str.split('-').map(Number);
    if (parts.length < 2) return null;
    return { year: parts[0], month: parts[1], day: parts[2] };
}

export function isEventInMonth(
    event: GeneratedEvent,
    date: Date,
    viewMode: 'ethiopian' | 'gregorian'
) {
    if (viewMode === 'ethiopian') {
        const eth = gregorianToEthiopian(date);
        const monthStart = startOfMonth(eth);
        const monthEnd = endOfMonth(eth);

        const eventStart = event.ethStartDateObject;
        const eventEnd = event.ethEndDateObject;

        if (!eventStart || !eventEnd) return false;

        return (
            eventStart.compare(monthEnd) <= 0 &&
            eventEnd.compare(monthStart) >= 0
        );
    } else {
        const eventStart = event.startDateObject;
        const eventEnd = event.endDateObject;

        if (!eventStart || !eventEnd) return false;

        const monthStart = startOfMonthDateFns(date);
        const monthEnd = endOfMonthDateFns(date);
        return eventStart <= monthEnd && eventEnd >= monthStart;
    }
}

export function formatEventRange(ev: GeneratedEvent, viewMode: string) {
    let startDate, endDate;
    let format;

    if (viewMode === 'ethiopian') {
        // Use native Ethiopian date objects
        startDate = ev.ethStartDateObject;
        endDate = ev.ethEndDateObject;
        if (!startDate || !endDate) return '';
        format = formatCalendarDate;
    } else {
        // Use native Date objects and convert to CalendarDate for formatting
        const startDateObj = ev.startDateObject;
        const endDateObj = ev.endDateObject;
        if (!startDateObj || !endDateObj) return '';

        startDate = new CalendarDate(
            new GregorianCalendar(),
            startDateObj.getFullYear(),
            startDateObj.getMonth() + 1,
            startDateObj.getDate()
        );
        endDate = new CalendarDate(
            new GregorianCalendar(),
            endDateObj.getFullYear(),
            endDateObj.getMonth() + 1,
            endDateObj.getDate()
        );
        format = formatGregCalendarDate;
    }

    // Check if it's a single day event
    if (startDate.compare(endDate) === 0) {
        return format(startDate);
    }
    // If event spans multiple days
    return `${format(startDate)} – ${format(endDate)}`;
}

export function getEventName(ev: GeneratedEvent, locale: string) {
    if (ev.name) {
        if (locale === 'am' || locale === 'en') {
            return ev.name[locale];
        }
    }
    return ev.id;
}
