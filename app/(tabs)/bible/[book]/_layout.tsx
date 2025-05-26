import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import useDbQuery from "~/hooks/useDbQuery";
import { useBook } from "~/src/hooks/useDatabase";
import { getBookWithId } from "~/src/queries/queries";

export default function ChapterLayout() {
  const params = useLocalSearchParams();

  const bookParam = params?.book;
  const bookId = Number.parseInt(Array.isArray(bookParam) ? bookParam[0] : bookParam);
  const { t } = useTranslation();

  let { data: book} = useBook(bookId);
  let bookName =  book?.titleAm || "";
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: bookName , headerShadowVisible: false }}
      />
      <Stack.Screen name="[chapter]" options={{ headerShown: false }} />
    </Stack>
  );
}
