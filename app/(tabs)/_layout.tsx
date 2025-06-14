import { Tabs, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '~/components/ThemeToggle';
import { CalendarDays, HomeIcon } from '~/lib/icons/Navigation';
import { BookOpen } from '~/lib/icons/Book';
import '~/translation';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
    const { t } = useTranslation();
    const theme = useTheme();
    const path = usePathname();

    // Check if current path is a Bible chapter view
    const isReadingScreen = path.match(/\/bible\/[^\/]+\/[^\/]+$/);

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderColor: theme.colors.background,
                    display: isReadingScreen ? 'none' : 'flex'
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: t('home.greeting', { name: 'Tibebe' }),
                    headerShadowVisible: false,
                    headerRight: () => <ThemeToggle />,
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />
                }}
            />
            <Tabs.Screen
                name="bible"
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarIcon: ({ color }) => <BookOpen color={color} />
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarIcon: ({ color }) => <CalendarDays color={color} />
                }}
            />
        </Tabs>
    );
}
