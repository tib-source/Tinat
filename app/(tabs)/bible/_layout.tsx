import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BibleLayout() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                contentStyle: {
                    paddingTop: insets.top
                }
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: t('bible.headerTitle')
                }}
            />
            <Stack.Screen name="[book]" options={{ headerShown: false }} />
        </Stack>
    );
}
