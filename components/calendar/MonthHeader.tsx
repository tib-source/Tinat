import { Calendar, CalendarTheme } from "@marceloterreiro/flash-calendar"
import React from "react";
import { Button } from "../ui/button";
import { LeftArrow, RightArrow } from "~/lib/icons/Navigation";
import { useTheme } from "@react-navigation/native";
import { Text } from "../ui/text";
import { CardTitle } from "../ui/card";

interface MonthHeaderProps {
    calendarTheme?: CalendarTheme;
    navigateMonth: (direction: "prev" | "next") => void;
    month: string;
}

export default function MonthHeader({
    calendarTheme, 
    navigateMonth,
    month
}: MonthHeaderProps){

    const theme = useTheme()

    return <Calendar.HStack
          alignItems="center"
          justifyContent="space-around"
          style={calendarTheme?.rowMonth?.container}
          width="100%"
        >
        <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateMonth('prev')}
            className="h-8 w-8 p-0"
        >
            <LeftArrow color={theme.colors.text} size={16} />
        </Button>
        <Text className="text-lg font-semibold text-center">
            {month}
        </Text>
        <Button
            variant="ghost"
            size="sm"
            onPress={() => navigateMonth('next')}
            className="h-8 w-8 p-0"
        >
            <RightArrow color={theme.colors.text} size={16} />
        </Button>
        </Calendar.HStack>
}