import { Tabs, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '~/src/components/ThemeToggle';
import { CalendarDays, HomeIcon } from '~/lib/icons/Navigation';
import { BookOpen } from '~/lib/icons/Book';
import CalendarToggle from '~/src/components/calendar/CalendarToggle';
import '~/translation';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
    const { t } = useTranslation();
    const theme = useTheme();
    const path = usePathname();

    // Check if current path is a Bible chapter view (verse reading screen)
    const isReadingScreen = path.match(/\/bible\/[^\/]+\/\d+$/);

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 70,
                    borderColor: theme.colors.background,
                    display: isReadingScreen ? 'none' : 'flex'
                },
                tabBarItemStyle: {
                    paddingTop: 12
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
                name="calendar/index"
                options={{
                    title: t('calendar.title', 'Calendar'),
                    headerTitle: t(
                        'calendar.headerTitle',
                        'Ethiopian Calendar'
                    ),
                    headerShown: true,
                    headerShadowVisible: false,
                    headerRight: () => <CalendarToggle />,
                    tabBarIcon: ({ color }) => <CalendarDays color={color} />
                }}
            />
        </Tabs>
    );
}
