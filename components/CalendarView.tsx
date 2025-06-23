import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar, toDateId } from '@marceloterreiro/flash-calendar';
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

export default function CalendarView({
    onDateSelect,
    selectedDate
}: EthiopianCalendarProps) {
    const theme = useTheme();

    const [currentEthDate, setCurrentEthDate] = useState<EthiopianDate>(
        getCurrentEthiopianDate()
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

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentEthDate((prev) => {
            let newMonth = prev.month;
            let newYear = prev.year;

            if (direction === 'next') {
                newMonth += 1;
                if (newMonth > 13) {
                    newMonth = 1;
                    newYear += 1;
                }
            } else {
                newMonth -= 1;
                if (newMonth < 1) {
                    newMonth = 13;
                    newYear -= 1;
                }
            }

            return { ...prev, year: newYear, month: newMonth };
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
                        {viewMode === 'ethiopian' ? (
                            <EthiopianCalendar currentEthDate={currentEthDate} navigateMonth={navigateMonth} selectedDate={selectedDate} />
                        ) : (
                            <GregorianCalendar
                                calendarMonthId={toDateId(ethiopianToGregorian(currentEthDate))}
                                onCalendarDayPress={() => { }}
                                calendarFirstDayOfWeek="monday"
                                navigateMonth={navigateMonth}
                            />
                        )}
                    </CardContent>
                </Card>

            </ScrollView>
        </View>
    );
}
