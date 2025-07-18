
import React from 'react';
import { View, Text } from 'react-native';
import { GeneratedEvent } from '~/src/generateEvents';
import { formatCalendarDate, formatGregCalendarDate, gregorianToEthiopian } from '~/src/helpers/ethiopianCalendarHelpers';
import { CalendarDate, DateFormatter, endOfMonth, EthiopicCalendar, GregorianCalendar, startOfMonth } from '@internationalized/date';
import i18n from '~/translation';
import { useTheme } from '@react-navigation/native';

interface MonthlyEventListProps {
  currentDate: Date;
  events: GeneratedEvent[];
  viewMode: 'ethiopian' | 'gregorian';
}

function isEventInMonth(event: GeneratedEvent, date: Date, viewMode: 'ethiopian' | 'gregorian') {
  // Helper to parse YYYY-MM-DD or YYYY-MM
  function parseYMD(str?: string): { year: number, month: number, day?: number } | null {
    if (!str) return null;
    const parts = str.split('-').map(Number);
    if (parts.length < 2) return null;
    return { year: parts[0], month: parts[1], day: parts[2] };
  }

  if (viewMode === 'ethiopian') {
    const eth = gregorianToEthiopian(date);
    const monthStart = startOfMonth(eth)
    const monthEnd = endOfMonth(eth)
    const start = parseYMD(event.ethStartDate);
    const end = parseYMD(event.ethEndDate);
    if (!start || !end) return false;
    // Check for overlap: eventStart <= monthEnd && eventEnd >= monthStart
    const eventStartsBeforeMonthEnd = (start.year < monthEnd.year) || (start.year === monthEnd.year && start.month < monthEnd.month) || (start.year === monthEnd.year && start.month === monthEnd.month && (start.day ?? 1) <= monthEnd.day);
    const eventEndsAfterMonthStart = (end.year > monthStart.year) || (end.year === monthStart.year && end.month > monthStart.month) || (end.year === monthStart.year && end.month === monthStart.month && (end.day ?? 1) >= monthStart.day);
    return eventStartsBeforeMonthEnd && eventEndsAfterMonthStart;
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthStart = { year, month, day: 1 };
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthEnd = { year, month, day: daysInMonth };
    const start = parseYMD(event.startDate);
    const end = parseYMD(event.endDate);
    if (!start || !end) return false;
    // Check for overlap: eventStart <= monthEnd && eventEnd >= monthStart
    const eventStartsBeforeMonthEnd = (start.year < monthEnd.year) || (start.year === monthEnd.year && start.month < monthEnd.month) || (start.year === monthEnd.year && start.month === monthEnd.month && (start.day ?? 1) <= monthEnd.day);
    const eventEndsAfterMonthStart = (end.year > monthStart.year) || (end.year === monthStart.year && end.month > monthStart.month) || (end.year === monthStart.year && end.month === monthStart.month && (end.day ?? 1) >= monthStart.day);
    return eventStartsBeforeMonthEnd && eventEndsAfterMonthStart;
  }
}



export const MonthlyEventList: React.FC<MonthlyEventListProps> = ({ currentDate, events, viewMode }) => {
  const filtered = events.filter(ev => isEventInMonth(ev, currentDate, viewMode));
  let locale = i18n.language || 'en';
  // For Amharic, use 'am-ET', otherwise fallback to 'en-US'
  const isAmharic = locale.startsWith('am');
  if (isAmharic){
    locale = "am-ET"
  }

  // Helper to get event name (fallback to ID)
  function getEventName(ev: any) {
    if (ev.name) {
      if (typeof ev.name === 'string') return ev.name;
      if (typeof ev.name === 'object') return ev.name.am || Object.values(ev.name)[0] || ev.id;
    }
    return ev.id;
  }


  // Helper to format date range for the current month, with month/year, localized
  function formatEventRange(ev: GeneratedEvent) {
    function parseYMD(str?: string): { year: number, month: number, day: number } | null {
      if (!str) return null;
      const parts = str.split('-').map(Number);
      if (parts.length < 2) return null;
      return { year: parts[0], month: parts[1], day: parts[2] ?? 1 };
    }
    let start, end;
    let startDate, endDate
    let format
    if (viewMode === 'ethiopian') {
      start = parseYMD(ev.ethStartDate);
      end = parseYMD(ev.ethEndDate);
          if (!start || !end) return '';

      startDate = new CalendarDate(new EthiopicCalendar(), start.year, start.month, start.day)
      endDate = new CalendarDate(new EthiopicCalendar(), end.year, end.month, end.day)
      format = formatCalendarDate
    } else {
      start = parseYMD(ev.startDate);
      end = parseYMD(ev.endDate);
      if (!start || !end) return '';
      startDate = new CalendarDate(new GregorianCalendar(), start.year, start.month, start.day)
      endDate = new CalendarDate(new GregorianCalendar(), end.year, end.month, end.day)
      format = formatGregCalendarDate
    }

    if (start.year === end.year && start.month === end.month && start.day === end.day) {
      return format(startDate);
    }
    // If event spans months/years
    return `${format(startDate)} – ${format(endDate)}`;
  }

  if (filtered.length === 0) {
    return (
      <View className="mt-4">
        <Text className="text-muted-foreground text-center">No events this month.</Text>
      </View>
    );
  }
  const theme = useTheme()
  return (
    <View className="mt-4 space-y-3">
      {filtered.map(ev => (
        <View
          key={ev.id}
          className="bg-white rounded-2xl p-5 w-full flex-row items-center mb-2"
            style={{
                borderLeftWidth: 5,
                borderLeftColor: ev.color,
                borderRightWidth: 1,
                borderRightColor: theme.colors.border,
                borderTopWidth: 1,
                borderTopColor: theme.colors.border,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
                borderRadius: 8,
                padding: 12,
                width: '100%',
                flexDirection: 'row'
            }}
        >
          <View className="flex-1 justify-center">
            <Text className="font-bold text-base text-slate-800 mb-0.5">{getEventName(ev)}</Text>
            <Text className="text-xs text-slate-600 mt-0.5 italic tracking-[0.1px]">
              {formatEventRange(ev)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
