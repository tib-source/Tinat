/**
 * Ethiopian Calendar Helper Functions
 * The Ethiopian calendar is approximately 7-8 years behind the Gregorian calendar
 * and has 13 months (12 months of 30 days each + 1 month of 5 or 6 days)
 */
import { toEthiopian, toGregorian } from 'ethiopian-date';
import { getToday } from './dateHelpers';
import { CalendarDayMetadata } from '@marceloterreiro/flash-calendar';

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

    const input = [
        gregorianDate.getFullYear(),
        gregorianDate.getMonth() + 1,
        gregorianDate.getDate() - 1
    ]
    try{

        // Validate input
        if (!gregorianDate || !(gregorianDate instanceof Date) || isNaN(gregorianDate.getTime())) {
            console.error('Invalid date passed to gregorianToEthiopian:', gregorianDate);
            throw Error("Invalid date passed to gregorianToEthiopian")
        }
    
        const [ethiopianYear, ethiopianMonth, ethiopianDate] = toEthiopian(
            input
        );
        return { year: ethiopianYear, month: ethiopianMonth , day: ethiopianDate + 1};
    }catch(e){
        console.log(input)
        throw e;
    }
}



/**
 * Convert Ethiopian date to Gregorian date (approximate conversion)
 */
export function ethiopianToGregorian(ethDate: EthiopianDate): Date {
    let [year, month, day] = toGregorian(
        ethDate.year,
        ethDate.month ,
        ethDate.day
    );
    // Temporary hack to not have to reimplement this 
    // currently the converter is off by a month :) 
    return new Date(year,month-1, day,0,0,0,0);
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
    const date = ethiopianToGregorian(ethDate);
    return new Date(date.getFullYear(), date.getMonth(), 1, 0,0,0,0);
    
}

export function getEthiopianWeekdayName(dayIndex: number): string {
    if (dayIndex < 0 || dayIndex >= ETHIOPIAN_WEEKDAYS.length) return '';
    return ETHIOPIAN_WEEKDAYS[dayIndex].nameAm;
}

export function getEthiopianWeekDaysList(): string[] {
    return Array.from({ length: 7 }, (_, i) => (
            getEthiopianWeekdayName(i).slice(0, 1)
    ))
}

export function getEthiopianWeeksList(ethDate: EthiopianDate) : CalendarDayMetadata[][]{
    const emptyCells = getNumberOfEmptyCellsForMonthStart(getMonthStart(ethDate))
    console.log(getMonthStart(ethDate), ethDate, emptyCells)
    const monthDays = getEthiopianMonthDays(ethDate)
    let weekList: CalendarDayMetadata[][] = []

    let week: CalendarDayMetadata[] = []
    for (let i = 0; i < emptyCells; i++) {
        let prevMonthDate = {
            day: 31-i,
            month: ethDate.month - 1,
            year: ethDate.year
        }
        week.push(generateDayMetadata(true, prevMonthDate))
    }

    const monthCopy = [...monthDays]

    while (monthCopy.length >= 0){
        let currDate = monthCopy.shift()
        if (currDate === undefined){
            for(let i = week.length; i < 7; i++){
                let newDay = {
                    day: i,
                    month: ethDate.month + 1,
                    year: ethDate.year
                }

                let newMetadata = generateDayMetadata(true, newDay)

                week.push(newMetadata)
            }
            weekList.push(week)
            break;
        }
        if (week.length == 7){
            weekList.push(week)
            week = []
        }

        const currEthDay = copyEthDate(ethDate)
        currEthDay.day = currDate

        let currMetadata = generateDayMetadata(false, currEthDay)
        week.push(currMetadata)

    }



    return weekList
}


function generateDayMetadata(isEmpty: boolean, ethDate: EthiopianDate, range?: any): CalendarDayMetadata{
    const today = getCurrentEthiopianDate()
    const gregDay = ethiopianToGregorian(ethDate)
    const isToday = isSameEthiopianDate(
        ethDate,
        today
    )

    return {
            date: gregDay,
            displayLabel: isEmpty ? "" : ethDate.day.toString(),
            isDifferentMonth: isEmpty,
            isEndOfMonth: false,
            isDisabled: isEmpty,
            isEndOfWeek: false,
            id: isEmpty ? Math.random().toString() : formatEthiopianDate(ethDate),
            isStartOfMonth: false, 
            isStartOfRange: false, 
            isStartOfWeek: false,
            isWeekend: false,
            isToday: isToday,
            isEndOfRange: false,
            state: isToday ? "today" : isEmpty ? 'disabled' : "idle",
            isRangeValid: true,
        }
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


export function copyEthDate(ethDate: EthiopianDate): EthiopianDate{
    return {
        day: ethDate.day,
        month: ethDate.month,
        year: ethDate.year
    }
}