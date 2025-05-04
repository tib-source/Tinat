import { Stack, useLocalSearchParams } from "expo-router";
import useDbQuery from "~/hooks/useDbQuery";
import { getBookWithId, getChapterWithId } from "~/src/queries/queries";

export default function VerseLayout() {
    const params = useLocalSearchParams()

    const bookID = Array.isArray(params?.book) ? params.book[0] : params?.book;
    const chapterID = Array.isArray(params?.chapter) ? params.chapter[0] : params?.chapter;

    const book = useDbQuery(getBookWithId, [Number.parseInt(bookID)])
    const chapter = useDbQuery(getChapterWithId, [Number.parseInt(chapterID)])
    console.log(chapter)
    const title =`${book?.title_am ?? ""} - ${chapter?.chapter_number ?? ""} : ${chapter?.verses ?? ""}`;

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerTitle: title , headerShadowVisible: false}} />
        </Stack>
    );
}