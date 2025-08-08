import { View } from 'react-native';
import CalendarView from '~/src/components/CalendarView';

export default function Index() {
    return (
        <View className="flex-1 bg-background">
            <CalendarView />
        </View>
    );
}
