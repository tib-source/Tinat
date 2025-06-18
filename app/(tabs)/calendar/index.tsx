import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import EthiopianCalendar from '~/components/EthiopianCalendar';
import { EthiopianDate } from '~/src/helpers/ethiopianCalendarHelpers';

export default function Index() {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState<EthiopianDate | undefined>();

    const handleDateSelect = (date: EthiopianDate) => {
        setSelectedDate(date);
        // You can add additional logic here, such as showing events for the selected date
        console.log('Selected Ethiopian date:', date);
    };

    return (
        <View className="flex-1 bg-background">
            <EthiopianCalendar 
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
            />
        </View>
    );
}
