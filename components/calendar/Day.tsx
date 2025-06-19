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
                    'w-[calc(100%/7.02)] py-1 px-0 items-center justify-center'
                )}
            >
                <Text className={cn('text-l p-1.5 px-2.5 rounded-full')}></Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity
            className={cn(
                'w-[calc(100%/7.02)] py-1 px-0 items-center justify-center'
            )}
        >
            <Text
                className={cn(
                    'text-l p-1.5 px-2.5 rounded-full',
                    isToday && isTodayStyle
                )}
            >
                {date}
            </Text>
        </TouchableOpacity>
    );
}

//   <TouchableOpacity
//     key={day}
//     onPress={() => onDateSelect?.({
//       year: currentEthDate.year,
//       month: currentEthDate.month,
//       day
//     })}
//     className={cn(
//       "w-[14.285%] aspect-square items-center justify-center rounded-md",
//       isSelected && "bg-primary",
//       isToday && !isSelected && "bg-accent"
//     )}
//   >
//     <Text className={cn(
//       "text-sm",
//       isSelected ? "text-primary-foreground font-medium" : "text-foreground",
//       isToday && !isSelected && "font-medium"
//     )}>
//       {day}
//     </Text>
//   </TouchableOpacity>
