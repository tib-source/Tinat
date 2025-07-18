import React, { useMemo, useState } from 'react';
import { addMonths } from 'date-fns';
import { View, Text, ScrollView } from 'react-native';
import {
    CalendarActiveDateRange,
    toDateId
} from '@marceloterreiro/flash-calendar';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { getMiddleOfMonth, getToday } from '~/src/helpers/dateHelpers';
import DualCalendar from './calendar/DualCalendar';
import { MonthlyEventList } from './calendar/MonthlyEventList';
import { generateReligiousEventsForYear } from '~/src/generateEvents';
import { CalendarDate } from '@internationalized/date';

interface EthiopianCalendarProps {
    onDateSelect?: (date: CalendarDate) => void;
    selectedDate?: CalendarDate;
}

export default function CalendarView(props: EthiopianCalendarProps) {
    const [currentDate, setCurrentDate] = useState<Date>(getMiddleOfMonth());
    // Generate events for previous, current, and next year, merge, and deduplicate by id+startDate+endDate
    const religiousEvents = useMemo(() => {
        const year = currentDate.getFullYear();
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
    }, [currentDate.getFullYear()]);
    const [viewMode, setViewMode] = useState<'gregorian' | 'ethiopian'>(
        'ethiopian'
    );

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
            {/* Header with view toggle */}
            <Card className="mb-4">
                <CardContent className="p-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row rounded-lg bg-muted p-1">
                            <Button
                                variant={
                                    viewMode === 'ethiopian'
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                onPress={() => setViewMode('ethiopian')}
                                className="px-3"
                            >
                                <Text
                                    className={cn(
                                        'text-xs',
                                        viewMode === 'ethiopian'
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    የኢትዮጵያ
                                </Text>
                            </Button>
                            <Button
                                variant={
                                    viewMode === 'gregorian'
                                        ? 'default'
                                        : 'ghost'
                                }
                                size="sm"
                                onPress={() => setViewMode('gregorian')}
                                className="px-3"
                            >
                                <Text
                                    className={cn(
                                        'text-xs',
                                        viewMode === 'gregorian'
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    Gregorian
                                </Text>
                            </Button>
                        </View>
                    </View>
                </CardContent>
            </Card>

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
