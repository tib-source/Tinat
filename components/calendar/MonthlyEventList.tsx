import React from 'react';
import { View, Text } from 'react-native';
import { GeneratedEvent } from '~/src/generateEvents';
import i18n from '~/translation';
import { useTheme } from '@react-navigation/native';
import {
    formatEventRange,
    getEventName,
    isEventInMonth
} from '~/src/helpers/calendarHelper';

interface MonthlyEventListProps {
    currentDate: Date;
    events: GeneratedEvent[];
    viewMode: 'ethiopian' | 'gregorian';
}

export const MonthlyEventList: React.FC<MonthlyEventListProps> = ({
    currentDate,
    events,
    viewMode
}) => {
    const theme = useTheme();

    const filtered = events.filter((ev) =>
        isEventInMonth(ev, currentDate, viewMode)
    );
    let locale = i18n.language || 'en';

    if (filtered.length === 0) {
        return (
            <View className="mt-4">
                <Text className="text-muted-foreground text-center">
                    No events this month.
                </Text>
            </View>
        );
    }
    return (
        <View className="mt-4 space-y-3">
            {filtered.map((ev) => (
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
                        <Text className="font-bold text-base text-slate-800 mb-0.5">
                            {getEventName(ev, locale)}
                        </Text>
                        <Text className="text-xs text-slate-600 mt-0.5 italic tracking-[0.1px]">
                            {formatEventRange(ev, viewMode)}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};
