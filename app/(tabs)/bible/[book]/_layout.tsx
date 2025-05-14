import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import useDbQuery from "~/hooks/useDbQuery";
import { getBookWithId } from "~/src/queries/queries";

export default function ChapterLayout() {
  const params = useLocalSearchParams();

  const bookParam = params?.book;
  const bookId = Array.isArray(bookParam) ? bookParam[0] : bookParam;
  const { t } = useTranslation();

  let book = useDbQuery(getBookWithId, [Number.parseInt(bookId)]);
  let bookName = book?.title_am || t("bible.chapters");
  console.log(bookName);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: bookName, headerShadowVisible: false }}
      />
      <Stack.Screen name="[chapter]" options={{ headerShown: false }} />
    </Stack>
  );
}
