import { Stack, useLocalSearchParams } from 'expo-router';
import { useBook } from '~/src/hooks/useDatabase';

export default function ChapterLayout() {
    const params = useLocalSearchParams();

    const bookParam = params?.book;
    const bookId = Number.parseInt(
        Array.isArray(bookParam) ? bookParam[0] : bookParam
    );

    let { data: book } = useBook(bookId);
    let bookName = book?.titleAm || '';
    return (
        <Stack
            screenOptions={{
                headerTitle: bookName,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="[chapter]" options={{ headerShown: false }} />
        </Stack>
    );
}
