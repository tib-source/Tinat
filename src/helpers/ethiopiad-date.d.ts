declare module 'ethiopian-date' {
    export interface EthiopianDateArray extends Array<number> {
        0: number; // year
        1: number; // month
        2: number; // day
    }

    export function toEthiopian(gregorianDate: Date): EthiopianDateArray;
    export function toEthiopian(
        year: number,
        month: number,
        day: number
    ): EthiopianDateArray;

    export function toGregorian(
        ethiopianYear: number,
        ethiopianMonth: number,
        ethiopianDay: number
    ): number[];
    export function toGregorian(ethiopianDate: EthiopianDateArray): number[];
}
