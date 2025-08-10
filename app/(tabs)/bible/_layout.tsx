import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function BibleLayout() {
    const { t } = useTranslation();
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: t('bible.headerTitle')
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="[book]" options={{ headerShown: false }} />
        </Stack>
    );
}
