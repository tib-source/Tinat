import type {
    CalendarDayMetadata,
    CalendarItemDayContainerProps,
    CalendarItemEmptyProps,
    CalendarItemWeekNameProps,
    CalendarProps,
    CalendarRowMonthProps,
    CalendarRowWeekProps,
} from '@marceloterreiro/flash-calendar';
import { ReactNode } from 'react';
import { TextProps, TextStyle, ViewStyle } from 'react-native';
import { GeneratedEvent } from '~/src/generateEvents';
import { DayState } from '~/src/helpers/calendarHelper';

// Enhanced calendar types
export interface EnhancedCalendarDayMetadata extends CalendarDayMetadata {
    eventMetadata: Partial<GeneratedEvent>;
}

export interface CalendarMetadata {
    calendarRowMonth: string;
    weekDaysList: string[];
    weeksList: EnhancedCalendarDayMetadata[][];
}

// Theme types
export interface DayTheme {
    container: Omit<ViewStyle, "borderRadius">;
    content: TextStyle;
}

export interface CalendarTheme {
    rowMonth?: CalendarRowMonthProps["theme"];
    rowWeek?: CalendarRowWeekProps["theme"];
    itemWeekName?: CalendarItemWeekNameProps["theme"];
    itemEmpty?: CalendarItemEmptyProps["theme"];
    itemDayContainer?: CalendarItemDayContainerProps["theme"];
    /**
     * The theme for the day. `base` is applied before any state, allowing you to
     * set a base value once and use it for all states.
     */
    itemDay?: CalendarItemDayProps["theme"];
}

// Component prop types
export interface CalendarItemDayProps {
    children: ReactNode;
    onPress: (id: string) => void;
    metadata: EnhancedCalendarDayMetadata;
    theme?: Partial<Record<DayState | "base", (params: EnhancedCalendarDayMetadata & {
        isPressed: boolean;
        isHovered?: boolean;
        isFocused?: boolean;
    }) => Partial<DayTheme>>>;
    /** The cell's height */
    height: number;
    /** Optional TextProps to spread to the <Text> component. */
    textProps?: Omit<TextProps, "children" | "onPress">;
}

export interface GregorianCalendarProps extends CalendarProps {
    navigateMonth: (direction: 'prev' | 'next') => void;
    viewMode: string;
    currDate: Date;
    religiousEvents: GeneratedEvent[];
}
