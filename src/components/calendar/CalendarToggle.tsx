import { View } from 'react-native';
import { Button } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { cn } from '~/lib/utils';
import { useCalendarStore } from '~/src/state/store';

export default function CalendarToggle() {
    const { viewMode, setViewMode } = useCalendarStore();

    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row rounded-lg bg-muted p-1">
                <Button
                    variant={viewMode === 'ethiopian' ? 'default' : 'ghost'}
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
                    variant={viewMode === 'gregorian' ? 'default' : 'ghost'}
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
    );
}
