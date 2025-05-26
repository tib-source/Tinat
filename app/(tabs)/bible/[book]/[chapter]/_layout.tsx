import { Stack, useLocalSearchParams } from "expo-router";
import useDbQuery from "~/hooks/useDbQuery";
import { useBook, useChapter } from "~/src/hooks/useDatabase";
import { getBookWithId, getChapterWithId } from "~/src/queries/queries";

export default function VerseLayout() {
  const params = useLocalSearchParams();

  const bookId = Number.parseInt(Array.isArray(params?.book) ? params.book[0] : params?.book);
  const chapterId = Number.parseInt(Array.isArray(params?.chapter)
    ? params.chapter[0]
    : params?.chapter);

  const { data: book} = useBook(bookId);
  const { data: chapter } = useChapter(chapterId)
  console.log(chapter);
  const title = `${book?.titleAm ?? ""} - ${chapter?.chapterNumber ?? ""} : ${chapter?.verses ?? ""}`;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: title, headerShadowVisible: false }}
      />
    </Stack>
  );
}
