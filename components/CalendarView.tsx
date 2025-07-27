import React, { useMemo, useState } from 'react';
import { addMonths } from 'date-fns';
import { View, ScrollView } from 'react-native';
import { toDateId } from '@marceloterreiro/flash-calendar';
import { Card, CardContent } from '~/components/ui/card';

import { getMiddleOfMonth } from '~/src/helpers/dateHelpers';
import DualCalendar from './calendar/DualCalendar';
import { MonthlyEventList } from './calendar/MonthlyEventList';
import { generateReligiousEventsForYear } from '~/src/generateEvents';
import { useCalendarStore } from '~/src/state/store';

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState<Date>(getMiddleOfMonth());
    const year = currentDate.getFullYear();
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
                return addMonths(prev, 1);
            } else {
                return addMonths(prev, -1);
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
                            currDate={currentDate}
                            calendarMonthId={toDateId(currentDate)}
                            onCalendarDayPress={() => {}}
                            religiousEvents={religiousEvents}
                            calendarFirstDayOfWeek="monday"
                            navigateMonth={navigateMonth}
                            viewMode={viewMode}
                        />
                    </CardContent>
                </Card>
                <MonthlyEventList
                    currentDate={currentDate}
                    events={religiousEvents}
                    viewMode={viewMode}
                />
            </ScrollView>
        </View>
    );
}
