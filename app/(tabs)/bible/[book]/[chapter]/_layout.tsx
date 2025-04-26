import { Stack, useLocalSearchParams } from "expo-router";

export default function VerseLayout() {
    const params = useLocalSearchParams()

    const bookParam = Array.isArray(params?.book) ? params.book[0] : params?.book;
    const chapterParam = Array.isArray(params?.chapter) ? params.chapter[0] : params?.chapter;
    
    console.log(params)
    const title = (bookParam ?? "") + " - " +  (chapterParam ?? "");

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerTitle: title }} />
        </Stack>
    );
}