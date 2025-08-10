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
                headerShadowVisible: false
            }}
        >
            <Stack.Screen name="index" options={{ headerTitle: bookName }} />
            <Stack.Screen name="[chapter]" options={{ headerShown: false }} />
        </Stack>
    );
}
