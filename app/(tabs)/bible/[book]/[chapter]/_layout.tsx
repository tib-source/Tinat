import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { NewLog } from "~/src/db/schema";
import { getToday } from "~/src/helpers/dateHelpers";
import { useAddLog, useBook, useChapter, useLogsForToday, useUpdateLog } from "~/src/hooks/useDatabase";
import { addChaptersRead, insertLog } from "~/src/queries/logQueries";

export default function VerseLayout() {
  const streakCheck = 10 * 1000 // 30 seconds
  const params = useLocalSearchParams();
  const { data: todayLog, isSuccess: todaySuccess, error } = useLogsForToday()

  const bookId = Number.parseInt(Array.isArray(params?.book) ? params.book[0] : params?.book);
  const chapterId = Number.parseInt(Array.isArray(params?.chapter)
    ? params.chapter[0]
    : params?.chapter);

  const { data: book} = useBook(bookId);
  const { data: chapter } = useChapter(chapterId)
  const { mutate: updateLog } = useUpdateLog()
  const { mutate: addLog } = useAddLog()
  const title = `${book?.titleAm ?? ""} - ${chapter?.chapterNumber ?? ""} : ${chapter?.verses ?? ""}`;


  useEffect(()=>{
    const activeTimer = setTimeout( ()=>{
      if (todaySuccess){
          if (todayLog === undefined || todayLog.length === 0){
              const newLog: NewLog = {
                  date: getToday(),
                  chaptersRead: [chapterId]
              }
              console.log("Adding entry : ", newLog)
              addLog(newLog)
          }else{
              const current = todayLog[0]
              if (current.chaptersRead.includes(chapterId)){
                  console.log("doing nothing...")
                  return
              }
              console.log("Updating entry with chapter: ", chapterId)
              updateLog([...current.chaptersRead, chapterId])
          }
      }else{
        console.log("error?")
        console.log(error?.message, error?.cause, error?.stack)
      }

    }, streakCheck)

    return () => clearTimeout(activeTimer)
  }, [])

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: title, headerShadowVisible: false }}
      />
    </Stack>
  );
}
