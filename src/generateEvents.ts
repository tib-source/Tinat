import { addDays } from 'date-fns';
import { julianComputus as determineEaster } from './determineEaster';
import religiousEvents from './religiousEvents';
import {
    gregorianToEthiopian,
    toCalendarDateId
} from './helpers/ethiopianCalendarHelpers';
import { toDateId } from '@marceloterreiro/flash-calendar';
import { EthiopicCalendar } from '@internationalized/date';

export interface GeneratedEvent {
    id: string;
    name?: {
        am: string;
        en: string;
    };
    type: 'fast' | 'feast' | 'weekly';
    startDate?: string;
    endDate?: string;
    ethStartDate?: string;
    ethEndDate?: string;
    days?: number[];
    color: string;
}

export function generateReligiousEventsForYear(year: number): GeneratedEvent[] {
    const easter = determineEaster(year);
    const easterSunday = easter.toDate('UTC');

    const eventsForYear: GeneratedEvent[] = [];

    for (let event of religiousEvents) {
        let start = new Date();
        let end = new Date();

        if (event.dateType == 'fixed') {
            if (event.day != undefined && event.month != undefined) {
                start = new Date(year, event?.month - 1, event?.day);
                end = addDays(start, event.duration || 0);
            } else {
                throw Error(
                    'Fixed event without specified day and month : ' + event.id
                );
            }
        } else if (event.dateType == 'variable') {
            if (event.fromEaster != undefined) {
                start = addDays(easterSunday, event.fromEaster);
                end = addDays(start, event.duration || 0);
            } else {
                throw Error(
                    'Variable event without fromEaster day : ' + event.id
                );
            }
        } else if (event.dateType == 'weekly') {
            let weeklyEvent: GeneratedEvent = {
                id: event.id,
                type: event.dateType,
                days: event.weekDays,
                color: event.color
            };
            eventsForYear.push(weeklyEvent);
            continue;
        }
        const generated: GeneratedEvent = {
            id: event.id,
            name: event.name,
            type: event.eventType,
            startDate: toDateId(start),
            endDate: toDateId(end),
            ethStartDate: toCalendarDateId(gregorianToEthiopian(start)),
            ethEndDate: toCalendarDateId(gregorianToEthiopian(end)),
            color: event.color
        };
        eventsForYear.push(generated);
    }

    return eventsForYear;
}
