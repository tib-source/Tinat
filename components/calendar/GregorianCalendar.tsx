import type {
    CalendarDayMetadata,
  CalendarProps,
  CalendarTheme,
} from "@marceloterreiro/flash-calendar";
import { Calendar, useCalendar } from "@marceloterreiro/flash-calendar";
import { useTheme } from "@react-navigation/native";
import { memo, useEffect, useMemo, useState } from "react";
import {View } from "react-native";
import MonthHeader from "./MonthHeader";
import { EthiopianDate, getEthiopianMonthName, getEthiopianWeekDaysList, getEthiopianWeeksList, gregorianToEthiopian } from "~/src/helpers/ethiopianCalendarHelpers";


const DAY_HEIGHT = 40;
const MONTH_HEADER_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 40;

interface GregorianCalendarProps extends CalendarProps { 
    navigateMonth: (direction: "prev" | "next") => void;
    viewMode: string;
    currDate: Date;
}

interface CalendarMetadata { 
    calendarRowMonth: string;
    weekDaysList: string[];
    weeksList: CalendarDayMetadata[][]
}

export const GregorianCalendar = memo((props: GregorianCalendarProps) => {
const currentEthDate = gregorianToEthiopian(props?.currDate)

const theme = useTheme()

const calendarTheme: CalendarTheme = {
  rowMonth: {
    container: {
      backgroundColor: theme.colors.background,
      height: MONTH_HEADER_HEIGHT,
    },
    content: {
      color: theme.colors.text,
      fontSize: 17,
      width: 200,
      textAlign: "center",
    },
  },
  itemWeekName: { content: { color: theme.colors.text } },
  itemDay: {
    base: () => ({
      container: {
        padding: 0,
        borderRadius: 50,
      },
    }),
    today: () => ({
      container: {
        borderWidth: 2,
        borderColor: theme.colors.border,
      },
    }),
    idle: ({ isDifferentMonth }) => ({
      content: isDifferentMonth
        ? {
            color: theme.colors.background,
          }
        : undefined,
    }),
    active: () => ({
      container: {
        backgroundColor: theme.colors.primary,
      },
      content: {
        color: theme.colors.text,
      },
    }),
  },
};

    const gregorianMetadata = useCalendar(props)
    const [calendarMetadata, setCalendarMetadata] = useState<CalendarMetadata>(gregorianMetadata)

    useEffect(()=>{

        const ethiopianMetadata: CalendarMetadata = {
            calendarRowMonth: `${getEthiopianMonthName(currentEthDate.month)} ${currentEthDate.year}`,
            weekDaysList: getEthiopianWeekDaysList(),
            weeksList: getEthiopianWeeksList(currentEthDate)
        }

        if (props.viewMode == "ethiopian"){
            setCalendarMetadata(ethiopianMetadata)
        }else{
            setCalendarMetadata(gregorianMetadata)
        }

    }, [props])

    calendarMetadata
  return (
    <View>
      <Calendar.VStack spacing={props.calendarRowVerticalSpacing}>
        <MonthHeader month={calendarMetadata.calendarRowMonth} calendarTheme={calendarTheme} navigateMonth={props.navigateMonth}/>

        <Calendar.Row.Week spacing={4}>
          {calendarMetadata.weekDaysList.map((day, i) => (
            <Calendar.Item.WeekName
              height={WEEK_DAYS_HEIGHT}
              key={i}
              theme={calendarTheme.itemWeekName}
            >
              {day}
            </Calendar.Item.WeekName>
          ))}
        </Calendar.Row.Week>

        {calendarMetadata.weeksList.map((week, i) => (
          <Calendar.Row.Week key={i}>
            {week.map((day) => (
              <Calendar.Item.Day.Container
                dayHeight={DAY_HEIGHT}
                daySpacing={4}
                isStartOfWeek={day.isStartOfWeek}
                key={day.id}
              >
                <Calendar.Item.Day
                  height={DAY_HEIGHT}
                  metadata={day}
                  onPress={props.onCalendarDayPress}
                  theme={calendarTheme.itemDay}
                >
                  {day.displayLabel}
                </Calendar.Item.Day>
              </Calendar.Item.Day.Container>
            ))}
          </Calendar.Row.Week>
        ))}
      </Calendar.VStack>
    </View>
  );
});