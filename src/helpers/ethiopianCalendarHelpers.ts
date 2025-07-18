/**
 * Ethiopian Calendar Helper Functions
 * The Ethiopian calendar is approximately 7-8 years behind the Gregorian calendar
 * and has 13 months (12 months of 30 days each + 1 month of 5 or 6 days)
 */
import { toEthiopian, toGregorian } from 'ethiopian-date';
import { getToday } from './dateHelpers';

import { getStateFields } from './calendarHelper';
import { GeneratedEvent } from '../generateEvents';
import { EnhancedCalendarDayMetadata } from '~/components/calendar/types';
import { CalendarDate, DateFormatter, endOfMonth, EthiopicCalendar, getDayOfWeek, getLocalTimeZone, GregorianCalendar, startOfMonth, toCalendar } from '@internationalized/date';
import { eachHourOfInterval, endOfDay, lastDayOfMonth } from 'date-fns';
import { startMapper } from 'react-native-reanimated';
import { toDateId } from '@marceloterreiro/flash-calendar';

export interface EthiopianMonth {
    id: number;
    nameAm: string;
    days: number;
}

// Ethiopian month names
export const ETHIOPIAN_MONTHS: EthiopianMonth[] = [
    { id: 1, nameAm: 'መስከረም', days: 30 },
    { id: 2, nameAm: 'ጥቅምት', days: 30 },
    { id: 3, nameAm: 'ህዳር', days: 30 },
    { id: 4, nameAm: 'ታህሳስ', days: 30 },
    { id: 5, nameAm: 'ጥር', days: 30 },
    { id: 6, nameAm: 'የካቲት', days: 30 },
    { id: 7, nameAm: 'መጋቢት', days: 30 },
    { id: 8, nameAm: 'ሚያዝያ', days: 30 },
    { id: 9, nameAm: 'ግንቦት', days: 30 },
    { id: 10, nameAm: 'ሰኔ', days: 30 },
    { id: 11, nameAm: 'ሃምሌ', days: 30 },
    { id: 12, nameAm: 'ነሃሴ', days: 30 },
    { id: 13, nameAm: 'ጳጉሜን', days: 5 } // 6 days in leap year
];

export const ETHIOPIAN_WEEKDAYS = [
    { nameAm: 'ሰኞ' }, // Monday
    { nameAm: 'ማክሰኞ' }, // Tuesday
    { nameAm: 'ረቡዕ' }, // Wednesday
    { nameAm: 'ሐሙስ' }, // Thursday
    { nameAm: 'አርብ' }, // Friday
    { nameAm: 'ቅዳሜ' }, // Saturday
    { nameAm: 'እሑድ' } // Sunday
];

export function isEthiopianLeapYear(year: number): boolean {
    return (year + 1) % 4 === 0;
}


export function getPagumenDays(year: number): number {
    return isEthiopianLeapYear(year) ? 6 : 5;
}

export function gregorianToEthiopian(gregorianDate: Date): CalendarDate {
    const curr = new CalendarDate(new GregorianCalendar(), gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate())
    const ethiopian = toCalendar(curr, new EthiopicCalendar())
    return ethiopian
}

export function ethiopianToGregorian(ethDate: CalendarDate): Date {
    const curr = new CalendarDate(new EthiopicCalendar(), ethDate.year, ethDate.month, ethDate.day)
    return toCalendar(curr, new GregorianCalendar()).toDate("UTC")
}

export function getEthiopianMonthName(month: number): string {
    const monthData = ETHIOPIAN_MONTHS.find((m) => m.id === month);
    if (!monthData) return '';
    return monthData.nameAm;
}


export function getEthiopianWeekdayName(dayIndex: number): string {
    if (dayIndex < 0 || dayIndex >= ETHIOPIAN_WEEKDAYS.length) return '';
    return ETHIOPIAN_WEEKDAYS[dayIndex].nameAm;
}

export function getEthiopianWeekDaysList(): string[] {
    return Array.from({ length: 7 }, (_, i) =>
        getEthiopianWeekdayName(i).slice(0, 1)
    );
}

export function getEthiopianWeeksList(
    ethDate: CalendarDate,
    range?: GeneratedEvent[]
): EnhancedCalendarDayMetadata[][] {
    const emptyCells = getNumberOfEmptyCellsForMonthStart(
        startOfMonth(ethDate)
    );
    const monthDays = getEthiopianMonthDays(ethDate);
    let weekList: EnhancedCalendarDayMetadata[][] = [];

    let week: EnhancedCalendarDayMetadata[] = [];
    for (let i = 1; i < emptyCells + 1; i++) {
        let firstDay = startOfMonth(ethDate);
        let prevMonthDay = firstDay.subtract({days: i})
        week.push(generateDayMetadata(true, prevMonthDay));
    }

    const monthCopy = [...monthDays];

    while (monthCopy.length >= 0) {
        let currDate = monthCopy.shift();
        if (currDate === undefined) {
            let remainingDays = 7 - week.length;
            for (let i = 1; i <= remainingDays; i++) {
                const lastDay = endOfMonth(ethDate)
                const newDay = lastDay.add({days: i})
                let newMetadata = generateDayMetadata(true, newDay);

                week.push(newMetadata);
            }
            weekList.push(week);
            break;
        }
        if (week.length === 7) {
            weekList.push(week);
            week = [];
        }

        let currEthDay = ethDate.set({day: currDate})
        let currMetadata = generateDayMetadata(false, currEthDay, range);
        week.push(currMetadata);
    }

    return weekList;
}

function generateDayMetadata(
    isEmpty: boolean,
    ethDate: CalendarDate,
    range?: GeneratedEvent[]
): EnhancedCalendarDayMetadata {
    const today = getCurrentEthiopianDate();
    const gregDay = ethiopianToGregorian(ethDate);
    return {
        id: toCalendarDateId(ethDate),
        date: gregDay,
        displayLabel: isEmpty ? '' : ethDate.day.toString(),
        isDifferentMonth: isEmpty,
        isEndOfMonth: false,
        isEndOfWeek: false,
        isStartOfMonth: false,
        isStartOfWeek: false,
        isWeekend: false,
        ...getStateFields({
            id: toCalendarDateId(ethDate),
            todayId: toCalendarDateId(today),
            calendarActiveDateRanges: range,
            calendarType: "ethiopian"
        })
    };
}

/**
 * Format Ethiopian date as string
 */
export function formatCalendarDate(ethDate: CalendarDate): string {
    const monthName = getEthiopianMonthName(ethDate.month);
    return `${ethDate.day} ${monthName} ${ethDate.year}`;
}

export function formatGregCalendarDate(gregDate: CalendarDate): string {
    const greg = gregDate.toDate(getLocalTimeZone())
    const formatter = new DateFormatter('en', {year: "numeric", month: "long", day: "2-digit"})
    return formatter.format(greg)
}


/**
 * Get current Ethiopian date
 */
export function getCurrentEthiopianDate(): CalendarDate {
    return gregorianToEthiopian(getToday());
}

/**
 * Generate calendar days for a given Ethiopian month
 */
export function getEthiopianMonthDays(ethDate: CalendarDate): number[] {
    let daysInMonth = 30;

    if (ethDate.month === 13) {
        daysInMonth = getPagumenDays(ethDate.year);
    }

    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}


/**
 * Check if twos dates are the same
 */
export function isSameCalendarDate(
    date1: CalendarDate,
    date2: CalendarDate
): boolean {
    return date1.compare(date2) == 0
}

// Borrowed from flash calendar repo
export function getNumberOfEmptyCellsForMonthStart(date: CalendarDate) {
    const startDayOfMonth = getDayOfWeek(date, "fr-FR", "mon")
    return startDayOfMonth === 0 ? 6 : startDayOfMonth ;
}


export function toCalendarDateId(ethDate: CalendarDate): string {
    const year = ethDate.year;
    const month = ethDate.month;
    const day = ethDate.day;

    // Pad single digit month and day with leading zeros
    const monthFormatted = month < 10 ? `0${month}` : month;
    const dayFormatted = day < 10 ? `0${day}` : day;

    return `${year}-${monthFormatted}-${dayFormatted}`;
}