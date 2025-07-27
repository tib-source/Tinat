import { View } from 'react-native';
import CalendarView from '~/components/CalendarView';

export default function Index() {
    return (
        <View className="flex-1 bg-background">
            <CalendarView />
        </View>
    );
}
