import React, { useState } from 'react';
import { addYears, addMonths } from "date-fns"
import { View, Text, ScrollView } from 'react-native';
import { Calendar, CalendarActiveDateRange, CalendarProps, toDateId, useCalendar } from '@marceloterreiro/flash-calendar';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTheme } from '@react-navigation/native';
import { cn } from '~/lib/utils';
import {
    EthiopianDate,
    ethiopianToGregorian,
    getCurrentEthiopianDate,
} from '~/src/helpers/ethiopianCalendarHelpers';
import { getToday } from '~/src/helpers/dateHelpers';
import EthiopianCalendar from './calendar/EthiopianCalendar';
import { GregorianCalendar } from './calendar/GregorianCalendar';

interface EthiopianCalendarProps {
    onDateSelect?: (date: EthiopianDate) => void;
    selectedDate?: EthiopianDate;
}

export default function CalendarView(props: EthiopianCalendarProps) {
    const theme = useTheme();
    const [currentDate, setCurrentDate] = useState<Date>(
        getToday()
    );
    const [viewMode, setViewMode] = useState<'gregorian' | 'ethiopian'>(
        'ethiopian'
    );

    // // Get current Gregorian date for flash-calendar
    // const currentGregorianDate = useMemo(() => {
    //     return ethiopianToGregorian(currentEthDate);
    // }, [currentEthDate]);

    // // Selected Gregorian date for flash-calendar
    // const selectedGregorianDate = useMemo(() => {
    //     return selectedDate ? ethiopianToGregorian(selectedDate) : undefined;
    // }, [selectedDate]);

    // const handleDateSelect = (date: string) => {
    //     const gregorianDate = new Date(date);
    //     const ethiopianDate = gregorianToEthiopian(gregorianDate);
    //     onDateSelect?.(ethiopianDate);
    // };


    const testRange: CalendarActiveDateRange[] = [{
        startId: toDateId(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)),
        endId: toDateId(new Date(currentDate.getFullYear(), currentDate.getMonth(), 5)),
    },{
        startId: toDateId(new Date(currentDate.getFullYear(), currentDate.getMonth(), 10)),
        endId: toDateId(new Date(currentDate.getFullYear(), currentDate.getMonth(), 25)),
    }]

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            if (direction === 'next') {
                return addMonths(prev, 1)
            } else {
                return addMonths(prev, -1)
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
                            <GregorianCalendar
                                currDate={currentDate}
                                calendarMonthId={toDateId(currentDate)}
                                onCalendarDayPress={() => { }}
                                calendarActiveDateRanges={testRange}
                                calendarFirstDayOfWeek="monday"
                                navigateMonth={navigateMonth}
                                viewMode={viewMode}

                            />
                    </CardContent>
                </Card>

            </ScrollView>
        </View>
    );
}
