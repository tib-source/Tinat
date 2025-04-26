import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "~/components/ThemeToggle";
import { CalendarDays, HomeIcon } from "~/lib/icons/Navigation"
import { BookOpen } from "~/lib/icons/Book"
import "~/translation"

export default function TabLayout() {
    const { t } = useTranslation();

    return <Tabs>
        <Tabs.Screen name="index" options={{title: "Home", headerTitle: t("home.greeting", {"name": "Tibebe"}), headerRight: () => <ThemeToggle />, tabBarIcon : ({ color }) => <HomeIcon color={color}/>}} />
        <Tabs.Screen name='bible' options={{ title: "Bible", headerShown: false, tabBarIcon : ({ color }) => <BookOpen color={color}/> }} />
        <Tabs.Screen name="calendar" options={{ title: "Calendar", headerShown: false, tabBarIcon : ({ color }) => <CalendarDays color={color}/>}} />
    </Tabs>
}