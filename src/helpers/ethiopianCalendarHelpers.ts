/**
 * Ethiopian Calendar Helper Functions
 * The Ethiopian calendar is approximately 7-8 years behind the Gregorian calendar
 * and has 13 months (12 months of 30 days each + 1 month of 5 or 6 days)
 */
import { toEthiopian, toGregorian } from 'ethiopian-date';
import { getToday } from './dateHelpers';
import {
    CalendarActiveDateRange,
    CalendarDayMetadata
} from '@marceloterreiro/flash-calendar';
import { getStateFields } from './calendarHelper';

export interface EthiopianDate {
    year: number;
    month: number;
    day: number;
}

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

// Ethiopian weekday names
export const ETHIOPIAN_WEEKDAYS = [
    { nameAm: 'ሰኞ' }, // Monday
    { nameAm: 'ማክሰኞ' }, // Tuesday
    { nameAm: 'ረቡዕ' }, // Wednesday
    { nameAm: 'ሐሙስ' }, // Thursday
    { nameAm: 'አርብ' }, // Friday
    { nameAm: 'ቅዳሜ' }, // Saturday
    { nameAm: 'እሑድ' } // Sunday
];

/**
 * Check if an Ethiopian year is a leap year
 */
export function isEthiopianLeapYear(year: number): boolean {
    return (year + 1) % 4 === 0;
}

/**
 * Get the number of days in Pagumen (13th month)
 */
export function getPagumenDays(year: number): number {
    return isEthiopianLeapYear(year) ? 6 : 5;
}

/**
 * Convert Gregorian date to Ethiopian date (approximate conversion)
 */
export function gregorianToEthiopian(gregorianDate: Date): EthiopianDate {
    try {
        if (
            !gregorianDate ||
            !(gregorianDate instanceof Date) ||
            isNaN(gregorianDate.getTime())
        ) {
            console.warn(
                'gregorianToEthiopian: Invalid date received',
                gregorianDate
            );
            return { year: 2017, month: 1, day: 1 }; // Fallback
        }
        const input = [
            gregorianDate.getFullYear(),
            gregorianDate.getMonth() + 1,
            gregorianDate.getDate()
        ];
        const [year, month, day] = toEthiopian(input);
        return { year, month, day };
    } catch (e) {
        console.error(`gregorianToEthiopian Error: ${(e as Error).message}`, {
            input: gregorianDate
        });
        return { year: 2017, month: 1, day: 1 }; // Fallback
    }
}

/**
 * Convert Ethiopian date to Gregorian date (approximate conversion)
 */
export function ethiopianToGregorian(ethDate: EthiopianDate): Date {
    // Validate Ethiopian date components before conversion
    if (
        !ethDate ||
        ethDate.month < 1 ||
        ethDate.month > 13 ||
        ethDate.day < 1 ||
        ethDate.day > 30
    ) {
        console.error(
            'ethiopianToGregorian Error: Invalid Ethiopian date input.',
            { input: ethDate }
        );
        return new Date(); // Return a fallback date
    }

    try {
        const [year, month, day] = toGregorian(
            ethDate.year,
            ethDate.month,
            ethDate.day
        );
        // The library is off by a month, so we subtract 1
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    } catch (error) {
        console.error(
            "ethiopianToGregorian Error: Malformed input can't be converted.",
            { input: ethDate }
        );
        console.error(error);
        return new Date(); // Return a fallback date
    }
}

/**
 * Get the Ethiopian month name in Amharic
 */
export function getEthiopianMonthName(month: number): string {
    const monthData = ETHIOPIAN_MONTHS.find((m) => m.id === month);
    if (!monthData) return '';
    return monthData.nameAm;
}

export function getMonthStart(ethDate: EthiopianDate): Date {
    const date = ethiopianToGregorian(getFirstDayOfMonth(ethDate));
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
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
    ethDate: EthiopianDate
): CalendarDayMetadata[][] {
    const emptyCells = getNumberOfEmptyCellsForMonthStart(
        getMonthStart(ethDate)
    );
    const monthDays = getEthiopianMonthDays(ethDate);
    let weekList: CalendarDayMetadata[][] = [];

    const testRange: CalendarActiveDateRange[] = [
        {
            startId: toEthiopianDateId({
                day: 3,
                month: ethDate.month,
                year: ethDate.year
            }),
            endId: toEthiopianDateId({
                day: 10,
                month: ethDate.month,
                year: ethDate.year
            })
        }
    ];

    let week: CalendarDayMetadata[] = [];
    for (let i = 1; i < emptyCells + 1; i++) {
        let firstDay = getFirstDayOfMonth(ethDate);
        let prevMonthDay = subEthiopianDays(firstDay, i);
        week.push(generateDayMetadata(true, prevMonthDay));
    }

    const monthCopy = [...monthDays];

    while (monthCopy.length >= 0) {
        let currDate = monthCopy.shift();
        if (currDate === undefined) {
            let remainingDays = 7 - week.length;
            for (let i = 1; i <= remainingDays; i++) {
                const lastDay = getLastDayOfMonth(ethDate);
                const newDay = addEthiopianDays(lastDay, i);
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

        const currEthDay = copyEthDate(ethDate);
        currEthDay.day = currDate;

        let currMetadata = generateDayMetadata(false, currEthDay, testRange);
        week.push(currMetadata);
    }

    return weekList;
}

function generateDayMetadata(
    isEmpty: boolean,
    ethDate: EthiopianDate,
    range?: CalendarActiveDateRange[]
): CalendarDayMetadata {
    const today = getCurrentEthiopianDate();
    const gregDay = ethiopianToGregorian(ethDate);

    return {
        id: toEthiopianDateId(ethDate),
        date: gregDay,
        displayLabel: isEmpty ? '' : ethDate.day.toString(),
        isDifferentMonth: isEmpty,
        isEndOfMonth: false,
        isEndOfWeek: false,
        isStartOfMonth: false,
        isStartOfWeek: false,
        isWeekend: false,
        ...getStateFields({
            id: toEthiopianDateId(ethDate),
            todayId: toEthiopianDateId(today),
            calendarActiveDateRanges: range
        })
    };
}

/**
 * Format Ethiopian date as string
 */
export function formatEthiopianDate(ethDate: EthiopianDate): string {
    const monthName = getEthiopianMonthName(ethDate.month);
    return `${ethDate.day} ${monthName} ${ethDate.year}`;
}

/**
 * Get current Ethiopian date
 */
export function getCurrentEthiopianDate(): EthiopianDate {
    return gregorianToEthiopian(getToday());
}

/**
 * Generate calendar days for a given Ethiopian month
 */
export function getEthiopianMonthDays(ethDate: EthiopianDate): number[] {
    let daysInMonth = 30;

    if (ethDate.month === 13) {
        daysInMonth = getPagumenDays(ethDate.year);
    }

    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

export function getLastDayOfMonth(ethDate: EthiopianDate): EthiopianDate {
    let daysInMonth = 30;

    if (ethDate.month === 13) {
        daysInMonth = getPagumenDays(ethDate.year);
    }

    let lastDay = copyEthDate(ethDate);
    lastDay.day = daysInMonth;

    return lastDay;
}

export function getFirstDayOfMonth(ethDate: EthiopianDate): EthiopianDate {
    let firstDay = copyEthDate(ethDate);
    firstDay.day = 1;
    return firstDay;
}

/**
 * Check if two Ethiopian dates are the same
 */
export function isSameEthiopianDate(
    date1: EthiopianDate,
    date2: EthiopianDate
): boolean {
    return (
        date1.year === date2.year &&
        date1.month === date2.month &&
        date1.day === date2.day
    );
}

// Borrowed from flash calendar repo
export function getNumberOfEmptyCellsForMonthStart(date: Date) {
    const startDayOfMonth = date.getDay();
    return startDayOfMonth === 0 ? 6 : startDayOfMonth - 1;
}

export function copyEthDate(ethDate: EthiopianDate): EthiopianDate {
    return {
        day: ethDate.day,
        month: ethDate.month,
        year: ethDate.year
    };
}

export function toEthiopianDateId(ethDate: EthiopianDate): string {
    const year = ethDate.year;
    const month = ethDate.month;
    const day = ethDate.day;

    // Pad single digit month and day with leading zeros
    const monthFormatted = month < 10 ? `0${month}` : month;
    const dayFormatted = day < 10 ? `0${day}` : day;

    return `${year}-${monthFormatted}-${dayFormatted}`;
}

function adjustEthiopianDate(
    ethDate: EthiopianDate,
    days: number
): EthiopianDate {
    let newDate = copyEthDate(ethDate);
    const increment = days > 0;
    const absoluteDays = Math.abs(days);

    for (let i = 0; i < absoluteDays; i++) {
        if (increment) {
            // Adding a day
            const daysInCurrentMonth =
                newDate.month === 13 ? getPagumenDays(newDate.year) : 30;

            if (newDate.day < daysInCurrentMonth) {
                // Simple case: add one day within the same month
                newDate.day++;
            } else {
                // Need to go to next month
                if (newDate.month < 13) {
                    newDate.month++;
                    newDate.day = 1;
                } else {
                    // Go to next year, month 1
                    newDate.year++;
                    newDate.month = 1;
                    newDate.day = 1;
                }
            }
        } else {
            // Subtracting a day
            if (newDate.day > 1) {
                // Simple case: subtract one day within the same month
                newDate.day--;
            } else {
                // Need to go to previous month
                if (newDate.month > 1) {
                    newDate.month--;
                    // Set to last day of previous month
                    if (newDate.month === 13) {
                        newDate.day = getPagumenDays(newDate.year);
                    } else {
                        newDate.day = 30;
                    }
                } else {
                    // Go to previous year, month 13 (Pagumen)
                    newDate.year--;
                    newDate.month = 13;
                    newDate.day = getPagumenDays(newDate.year);
                }
            }
        }
    }

    return newDate;
}

export function addEthiopianDays(
    ethDate: EthiopianDate,
    days: number = 1
): EthiopianDate {
    return adjustEthiopianDate(ethDate, days);
}

export function subEthiopianDays(
    ethDate: EthiopianDate,
    days: number = 1
): EthiopianDate {
    return adjustEthiopianDate(ethDate, -days);
}
