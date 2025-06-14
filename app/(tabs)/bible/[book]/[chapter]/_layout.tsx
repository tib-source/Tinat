import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { NewLog } from "~/src/db/schema";
import { getToday } from "~/src/helpers/dateHelpers";
import { useAddLog, useBook, useChapter, useLogsForToday, useUpdateLog } from "~/src/hooks/useDatabase";
import { useReadingTracker } from "~/src/hooks/useReadingTracker";
import { addChaptersRead, insertLog } from "~/src/queries/logQueries";

export default function VerseLayout() {
  const params = useLocalSearchParams();
  const bookId = Number.parseInt(Array.isArray(params?.book) ? params.book[0] : params?.book);
  const chapterId = Number.parseInt(Array.isArray(params?.chapter)
    ? params.chapter[0]
    : params?.chapter);

  const { data: book} = useBook(bookId);
  const { data: chapter } = useChapter(chapterId)
  const title = `${book?.titleAm ?? ""} - ${chapter?.chapterNumber ?? ""} : ${chapter?.verses ?? ""}`;

  const logTime = 5 * 1000 // after the user is on the page for this many seconds, a log will be made
  useReadingTracker(chapterId, logTime);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: title, headerShadowVisible: false }}
      />
    </Stack>
  );
}
