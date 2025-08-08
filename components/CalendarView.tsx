import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { toDateId } from '@marceloterreiro/flash-calendar';
import { Card, CardContent } from '~/components/ui/card';
import DualCalendar from './calendar/DualCalendar';
import { MonthlyEventList } from './calendar/MonthlyEventList';
import { generateReligiousEventsForYear } from '~/src/generateEvents';
import { useCalendarStore } from '~/src/state/store';
import { CalendarDate } from '@internationalized/date';
import {
    ethiopianToGregorian,
    getCurrentEthiopianDate
} from '~/src/helpers/ethiopianCalendarHelpers';

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState<CalendarDate>(
        getCurrentEthiopianDate()
    );
    const gregCurrDate = ethiopianToGregorian(currentDate);
    const year = gregCurrDate.getFullYear();
    // Generate events for previous, current, and next year, merge, and deduplicate by id+startDate+endDate
    const religiousEvents = useMemo(() => {
        const prevYear = generateReligiousEventsForYear(year - 1);
        const thisYear = generateReligiousEventsForYear(year);
        const nextYear = generateReligiousEventsForYear(year + 1);
        // Merge and deduplicate (in case of overlap)
        const all = [...prevYear, ...thisYear, ...nextYear];
        const seen = new Set();
        return all.filter((ev) => {
            const key =
                ev.id +
                (ev.startDate || '') +
                (ev.endDate || '') +
                (ev.ethStartDate || '') +
                (ev.ethEndDate || '');
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [year]);
    const { viewMode } = useCalendarStore();

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            if (direction === 'next') {
                return prev.add({ months: 1 });
            } else {
                return prev.subtract({ months: 1 });
            }
        });
    };

    return (
        <View className="flex-1 p-4">
            {/* Calendar view */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card className="w-full">
                    <CardContent className="p-4">
                        <DualCalendar
                            currDate={gregCurrDate}
                            calendarMonthId={toDateId(gregCurrDate)}
                            onCalendarDayPress={() => {}}
                            religiousEvents={religiousEvents}
                            calendarFirstDayOfWeek="monday"
                            navigateMonth={navigateMonth}
                            viewMode={viewMode}
                        />
                    </CardContent>
                </Card>
                <MonthlyEventList
                    currentDate={gregCurrDate}
                    events={religiousEvents}
                    viewMode={viewMode}
                />
            </ScrollView>
        </View>
    );
}
