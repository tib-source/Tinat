// taken from flash-calendar. Had to copy these since they are not exported by default
import { CalendarActiveDateRange, UseCalendarParams } from '@marceloterreiro/flash-calendar';
import { GeneratedEvent } from '../generateEvents';
import { act } from 'react';

export type DayState = 'idle' | 'active' | 'today' | 'disabled';

type GetStateFields = {
    calendarActiveDateRanges?: GeneratedEvent[];
    todayId?: string;
    id: string;
    calendarType: 'gregorian' | 'ethiopian',
};

interface CalendarDayStateFields {
    isDisabled: boolean;
    isToday: boolean;
    isStartOfRange: boolean;
    isEndOfRange: boolean;
    state: DayState;
    isRangeValid: boolean;
    eventMetadata: Partial<GeneratedEvent>
}

export const getStateFields = ({
    todayId,
    id,
    calendarActiveDateRanges,
    calendarType
}: GetStateFields): CalendarDayStateFields => {
    const activeRange = calendarActiveDateRanges?.find((range) => {
        const startId = calendarType === 'gregorian' ? range.startDate : range.ethStartDate;
        const endId = calendarType === 'gregorian' ? range.endDate : range.ethEndDate;
        
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
    
    const getStartId = (range: any) => calendarType === 'gregorian' ? range?.startDate : range?.ethStartDate;
    const getEndId = (range: any) => calendarType === 'gregorian' ? range?.endDate : range?.ethEndDate;
    
    const isRangeValid =
        (activeRange && getStartId(activeRange) !== undefined && getEndId(activeRange) !== undefined) ||  false;

    const isDisabled = false

    const isToday = todayId === id;

    const state: DayState = activeRange
        ? ('active' as const)
        : isDisabled
          ? 'disabled'
          : isToday
            ? 'today'
            : 'idle';

    return {
        isStartOfRange: id === getStartId(activeRange),
        isEndOfRange: id === getEndId(activeRange),
        isRangeValid,
        state,
        isDisabled,
        isToday,
        eventMetadata: {
            type: activeRange?.type,
            color: activeRange?.color
        }
    };
};
