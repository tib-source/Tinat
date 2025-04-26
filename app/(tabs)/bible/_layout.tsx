import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function BibleLayout() {
    const { t } = useTranslation();
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle: t('bible.headerTitle')}} />
        </Stack>
    );
}