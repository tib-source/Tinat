import { Stack } from 'expo-router';
import { View } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/src/components/ui/text';

export default function BibleLayout() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: (props) => (
                    <Text
                        className="text-2xl text-foreground"
                        {...props}
                        style={{
                            paddingTop: insets.top
                            // marginTop: insets.top,
                            // height: 70
                        }}
                    >
                        {' '}
                        {t('bible.headerTitle')}
                    </Text>
                ),
                headerTitleStyle: {}
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="[book]" options={{ headerShown: false }} />
        </Stack>
    );
}
