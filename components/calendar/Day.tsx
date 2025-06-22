import { TouchableOpacity } from 'react-native';
import { Text } from '../ui/text';
import { cn } from '~/lib/utils';

export interface DayProps {
    isSelected?: boolean;
    isRangeStart?: boolean;
    isRangeMiddle?: boolean;
    isRangeEnd?: boolean;
    isToday?: boolean;
    date?: number;
    emptyDay?: boolean;
}

export default function Day({
    isSelected = false,
    isRangeMiddle = false,
    isRangeEnd = false,
    isRangeStart = false,
    isToday = true,
    emptyDay = false,
    date
}: DayProps) {
    const isTodayStyle = 'border-border border-2';
    if (emptyDay) {
        return (
            <TouchableOpacity
                className={cn(
                    'w-[calc(100%/7.02)] items-center justify-center'
                )}
            >
                <Text className={cn('text-m px-2.5 rounded-full')}></Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity
            className={cn(
                'w-[calc(100%/7.01)] p-0 items-center justify-center'
            )}
        >
            <Text
                className={cn(
                    'text-m text-foreground p-2.5 rounded-full',
                    isToday && isTodayStyle
                )}
            >
                {date}
            </Text>
        </TouchableOpacity>
    );
}