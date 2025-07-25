// taken from flash-calendar. Had to copy these since they are not exported by default
import { UseCalendarParams } from '@marceloterreiro/flash-calendar';
import { GeneratedEvent } from '../generateEvents';

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
