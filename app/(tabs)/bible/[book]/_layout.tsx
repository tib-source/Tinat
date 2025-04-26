import { Stack, useLocalSearchParams } from "expo-router";

export default function ChapterLayout() {
    const params = useLocalSearchParams()

    const bookParam = params?.book;
    const bookName = Array.isArray(bookParam) ? bookParam[0] : bookParam;

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerTitle: bookName }} />
        </Stack>
    );
}