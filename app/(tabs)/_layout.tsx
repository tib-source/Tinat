import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/translation"

export default function TabLayout() {
    const { t } = useTranslation();

    return <Tabs>
        <Tabs.Screen name="index" options={{title: t("home.greeting", {name: 'Tibebe' }),
                    headerRight: () => <ThemeToggle />,}} />
        {/* <Tabs.Screen name="bible" options={{ headerTitle: "Home" }} />
        <Tabs.Screen name="calendar" options={{ title: "Bible" }} /> */}
    </Tabs>
}