import { View } from "react-native";
import { LeftArrow, RightArrow } from "~/lib/icons/Navigation";
import { EthiopianDate, getCurrentEthiopianDate, getEthiopianMonthDays, getEthiopianMonthName, getEthiopianWeekdayName, getMonthStart, getNumberOfEmptyCellsForMonthStart, isSameEthiopianDate } from "~/src/helpers/ethiopianCalendarHelpers";
import { CardHeader, CardTitle } from "../ui/card";
import Day from "./Day";
import { Button } from "../ui/button";
import { useTheme } from "@react-navigation/native";
import { Calendar, CalendarTheme } from "@marceloterreiro/flash-calendar";
import MonthHeader from "./MonthHeader";

const MONTH_HEADER_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 40;


//   TODO: move to its own file
export default function  EthiopianCalendar ({
        currentEthDate,
        navigateMonth,
        selectedDate
    }: {
        currentEthDate: EthiopianDate;
        selectedDate: EthiopianDate | undefined;
        navigateMonth: (direction: 'prev' | 'next')=> void
    }) {
        const theme = useTheme()
        const monthDays = getEthiopianMonthDays(currentEthDate);
        const today = getCurrentEthiopianDate();
        const monthStart = getMonthStart(currentEthDate);
        const emptyCells = getNumberOfEmptyCellsForMonthStart(monthStart);


        const calendarTheme : CalendarTheme = {
            itemWeekName : {
                content : {
                    fontSize: 16
                }
            }
        }
        return (
                <Calendar.VStack spacing={8}>
                <MonthHeader month={`${getEthiopianMonthName(currentEthDate.month)} ${currentEthDate.year}`} navigateMonth={navigateMonth}/>
                <Calendar.Row.Week spacing={4}>
                    {Array.from({ length: 7 }, (_, i) => (
                        <Calendar.Item.WeekName height={WEEK_DAYS_HEIGHT} key={i} theme={calendarTheme.itemWeekName} >
                            {getEthiopianWeekdayName(i).slice(0, 1)}
                        </Calendar.Item.WeekName>
                    ))}
                </Calendar.Row.Week>
                <View className="flex-row flex-wrap">
                    {Array.from({ length: emptyCells }, (_, i) => {
                        return <Day key={i} emptyDay={true} />;
                    })}
                    {monthDays.map((day, i) => {
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
            </Calendar.VStack>
        );
    };
