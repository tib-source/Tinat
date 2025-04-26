import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "~/components/ThemeToggle";
import { CalendarDays, HomeIcon } from "~/lib/icons/Navigation"
import { BookOpen } from "~/lib/icons/Book"
import "~/translation"
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
    const { t } = useTranslation();
    const theme = useTheme()
    return <Tabs screenOptions={
        {
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 40,
                borderColor: theme.colors.background
            },
        }
    }>
        <Tabs.Screen name="index" options={{ headerTitle: t("home.greeting", { "name": "Tibebe" }), headerRight: () => <ThemeToggle />, tabBarIcon: ({ color }) => <HomeIcon color={color} /> }} />
        <Tabs.Screen name='bible' options={{ headerShown: false, tabBarIcon: ({ color }) => <BookOpen color={color} /> }} />
        <Tabs.Screen name="calendar" options={{ headerShown: false, tabBarIcon: ({ color }) => <CalendarDays color={color} /> }} />
    </Tabs>
}