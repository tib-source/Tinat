// taken from flash-calendar. Had to copy these since they are not exported by default
import { UseCalendarParams } from '@marceloterreiro/flash-calendar';

export type DayState = 'idle' | 'active' | 'today' | 'disabled';

type GetStateFields = Pick<
    UseCalendarParams,
    | 'calendarActiveDateRanges'
    | 'calendarMinDateId'
    | 'calendarMaxDateId'
    | 'calendarDisabledDateIds'
> & {
    todayId?: string;
    id: string;
};

/** All fields that affects the day's state. */
interface CalendarDayStateFields {
    /** Is this day disabled? */
    isDisabled: boolean;
    /** Is this the current day? */
    isToday: boolean;
    /** Is this the start of a range? */
    isStartOfRange: boolean;
    /**  Is this the end of a range? */
    isEndOfRange: boolean;
    /** The state of the day */
    state: DayState;
    /** Is the range valid (has both start and end dates set)? */
    isRangeValid: boolean;
}

export const getStateFields = ({
    todayId,
    id,
    calendarActiveDateRanges,
    calendarMinDateId,
    calendarMaxDateId,
    calendarDisabledDateIds
}: GetStateFields): CalendarDayStateFields => {
    const activeRange = calendarActiveDateRanges?.find(({ startId, endId }) => {
        // Regular range
        if (startId && endId) {
            return id >= startId && id <= endId;
        } else if (startId) {
            return id === startId;
        } else if (endId) {
            return id === endId;
        }
        return false;
    });
    const isRangeValid =
        activeRange?.startId !== undefined && activeRange.endId !== undefined;

    const isDisabled =
        (calendarDisabledDateIds?.includes(id) ||
            (calendarMinDateId && id < calendarMinDateId) ||
            (calendarMaxDateId && id > calendarMaxDateId)) === true;

    const isToday = todayId === id;

    const state: DayState = activeRange
        ? ('active' as const)
        : isDisabled
          ? 'disabled'
          : isToday
            ? 'today'
            : 'idle';

    return {
        isStartOfRange: id === activeRange?.startId,
        isEndOfRange: id === activeRange?.endId,
        isRangeValid,
        state,
        isDisabled,
        isToday
    };
};
