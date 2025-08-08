import { Stack, useLocalSearchParams } from 'expo-router';
import { useBook, useChapter } from '~/src/hooks/useDatabase';
import { useReadingTracker } from '~/src/hooks/useReadingTracker';

export default function VerseLayout() {
    const params = useLocalSearchParams();
    const bookId = Number.parseInt(
        Array.isArray(params?.book) ? params.book[0] : params?.book
    );
    const chapterId = Number.parseInt(
        Array.isArray(params?.chapter) ? params.chapter[0] : params?.chapter
    );

    const { data: book } = useBook(bookId);
    const { data: chapterData } = useChapter(chapterId);
    const title = `${book?.titleAm ?? ''} - ${chapterData?.chapterNumber ?? ''} : ${chapterData?.verses ?? ''}`;

    const logTime = 5 * 1000; // mark chapter as read after this time passes
    useReadingTracker(chapterData, logTime);

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: title, headerShadowVisible: false }}
            />
        </Stack>
    );
}
