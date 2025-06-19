import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar, toDateId } from '@marceloterreiro/flash-calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTheme } from '@react-navigation/native';
import { cn } from '~/lib/utils';
import {
    EthiopianDate,
    getCurrentEthiopianDate,
    getEthiopianMonthName,
    getEthiopianWeekdayName,
    getEthiopianMonthDays,
    isSameEthiopianDate,
    getNumberOfEmptyCellsForMonthStart,
    getMonthStart
} from '~/src/helpers/ethiopianCalendarHelpers';
import { LeftArrow, RightArrow } from '~/lib/icons/Navigation';
import Day from './calendar/Day';

interface EthiopianCalendarProps {
    onDateSelect?: (date: EthiopianDate) => void;
    selectedDate?: EthiopianDate;
}

export default function EthiopianCalendar({
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

    //   TODO: move to its own file
    const EthiopianCalendarView = ({
        currentDate
    }: {
        currentDate: EthiopianDate;
    }) => {
        const monthDays = getEthiopianMonthDays(currentEthDate);
        const today = getCurrentEthiopianDate();
        const monthStart = getMonthStart(currentDate);
        const emptyCells = getNumberOfEmptyCellsForMonthStart(monthStart);

        return (
            <Card className="w-full">
                <CardHeader className="pb-4">
                    <View className="flex-row items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => navigateMonth('prev')}
                            className="h-8 w-8 p-0"
                        >
                            <LeftArrow color={theme.colors.text} size={16} />
                        </Button>

                        <CardTitle className="text-lg font-semibold text-center">
                            {getEthiopianMonthName(currentEthDate.month)}{' '}
                            {currentEthDate.year}
                        </CardTitle>

                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => navigateMonth('next')}
                            className="h-8 w-8 p-0"
                        >
                            <RightArrow color={theme.colors.text} size={16} />
                        </Button>
                    </View>
                </CardHeader>

                <CardContent className="p-0">
                    {/* Weekday headers */}
                    <View className="flex-row border-b border-border">
                        {Array.from({ length: 7 }, (_, i) => (
                            <View key={i} className="flex-1 p-2 items-center">
                                <Text className="text-m font-medium text-muted-foreground">
                                    {getEthiopianWeekdayName(i).slice(0, 1)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendar grid */}
                    <View className="flex-row flex-wrap">
                        {Array.from({ length: emptyCells }, (_, i) => {
                            return <Day key={i} emptyDay={true} />;
                        })}
                        {monthDays.map((day) => {
                            const isToday = isSameEthiopianDate(
                                {
                                    year: currentEthDate.year,
                                    month: currentEthDate.month,
                                    day
                                },
                                today
                            );
                            const isSelected =
                                selectedDate &&
                                isSameEthiopianDate(
                                    {
                                        year: currentEthDate.year,
                                        month: currentEthDate.month,
                                        day
                                    },
                                    selectedDate
                                );

                            return (
                                <Day
                                    key={day}
                                    date={day}
                                    isToday={isToday}
                                    isSelected={isSelected}
                                />
                            );
                        })}
                    </View>
                </CardContent>
            </Card>
        );
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
                {viewMode === 'ethiopian' ? (
                    <EthiopianCalendarView currentDate={currentEthDate} />
                ) : (
                    <Card className="w-full">
                        <CardContent className="p-4">
                            <Calendar
                                calendarMonthId={toDateId(new Date())}
                                onCalendarDayPress={() => {}}
                                calendarFirstDayOfWeek="monday"
                            />
                        </CardContent>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
}
