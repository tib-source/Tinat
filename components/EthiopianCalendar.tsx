import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, toDateId } from '@marceloterreiro/flash-calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { cn } from '~/lib/utils';
import { 
  EthiopianDate, 
  getCurrentEthiopianDate, 
  getEthiopianMonthName, 
  getEthiopianWeekdayName,
  formatEthiopianDate,
  gregorianToEthiopian,
  ethiopianToGregorian,
  ETHIOPIAN_MONTHS,
  getEthiopianMonthDays,
  isSameEthiopianDate
} from '~/src/helpers/ethiopianCalendarHelpers';
import { LeftArrow, RightArrow } from '~/lib/icons/Navigation';

interface EthiopianCalendarProps {
  onDateSelect?: (date: EthiopianDate) => void;
  selectedDate?: EthiopianDate;
}

export default function EthiopianCalendar({ onDateSelect, selectedDate }: EthiopianCalendarProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [currentEthDate, setCurrentEthDate] = useState<EthiopianDate>(getCurrentEthiopianDate());
  const [viewMode, setViewMode] = useState<'gregorian' | 'ethiopian'>('ethiopian');
  
  // Get current Gregorian date for flash-calendar
  const currentGregorianDate = useMemo(() => {
    return ethiopianToGregorian(currentEthDate);
  }, [currentEthDate]);

  // Selected Gregorian date for flash-calendar
  const selectedGregorianDate = useMemo(() => {
    return selectedDate ? ethiopianToGregorian(selectedDate) : undefined;
  }, [selectedDate]);

  const handleDateSelect = (date: string) => {
    const gregorianDate = new Date(date);
    const ethiopianDate = gregorianToEthiopian(gregorianDate);
    onDateSelect?.(ethiopianDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') =>  {
    setCurrentEthDate(prev => {
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
  const EthiopianCalendarView = () => {
    const monthDays = getEthiopianMonthDays(currentEthDate);
    const today = getCurrentEthiopianDate();
    
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
              {getEthiopianMonthName(currentEthDate.month)} {currentEthDate.year}
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
                <Text className="text-xs font-medium text-muted-foreground">
                  {getEthiopianWeekdayName(i).slice(0, 2)}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Calendar grid */}
          <View className="p-2">
            <View className="flex-row flex-wrap">
              {monthDays.map((day) => {
                const isToday = isSameEthiopianDate(
                  { year: currentEthDate.year, month: currentEthDate.month, day },
                  today
                );
                const isSelected = selectedDate && isSameEthiopianDate(
                  { year: currentEthDate.year, month: currentEthDate.month, day },
                  selectedDate
                );
                
                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => onDateSelect?.({ 
                      year: currentEthDate.year, 
                      month: currentEthDate.month, 
                      day 
                    })}
                    className={cn(
                      "w-[14.285%] aspect-square items-center justify-center rounded-md",
                      isSelected && "bg-primary",
                      isToday && !isSelected && "bg-accent"
                    )}
                  >
                    <Text className={cn(
                      "text-sm",
                      isSelected ? "text-primary-foreground font-medium" : "text-foreground",
                      isToday && !isSelected && "font-medium"
                    )}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
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
                variant={viewMode === 'ethiopian' ? 'default' : 'ghost'}
                size="sm"
                onPress={() => setViewMode('ethiopian')}
                className="px-3"
              >
                <Text className={cn(
                  "text-xs",
                  viewMode === 'ethiopian' ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  የኢትዮጵያ
                </Text>
              </Button>
              <Button
                variant={viewMode === 'gregorian' ? 'default' : 'ghost'}
                size="sm"
                onPress={() => setViewMode('gregorian')}
                className="px-3"
              >
                <Text className={cn(
                  "text-xs",
                  viewMode === 'gregorian' ? "text-primary-foreground" : "text-muted-foreground"
                )}>
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
          <EthiopianCalendarView />
        ) : (
          <Card className="w-full">
            <CardContent className="p-4">
                <Calendar
                        calendarMonthId={toDateId(new Date())}
                        onCalendarDayPress={()=>{}}
                    />
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
