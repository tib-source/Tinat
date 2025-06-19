import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function CalendarLayout() {
    const { t } = useTranslation();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: t(
                        'calendar.headerTitle',
                        'Ethiopian Calendar'
                    ),
                    headerShadowVisible: false
                }}
            />
        </Stack>
    );
}
