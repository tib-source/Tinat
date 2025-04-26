import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/translation"

export default function TabLayout() {
    const { t } = useTranslation();

    return <Tabs>
        <Tabs.Screen name="index" options={{title: "Home", headerTitle: t("home.greeting", {"name": "Tibebe"}), headerRight: () => <ThemeToggle />,}} />
        <Tabs.Screen name='bible' options={{ title: "Bible", headerShown: false }} />
        <Tabs.Screen name="calendar" options={{ title: "Calendar", headerShown: false}} />


    </Tabs>
}