import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { BookOpen } from "~/lib/icons/Book";
import { CircleCheck } from "~/lib/icons/CircleCheck";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { useTheme } from "@react-navigation/native";
import useDbQuery from "~/hooks/useDbQuery";
import { getChaptersForBook } from "~/src/queries/queries";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/ui/text";
export default function Index() {
  const { book } = useLocalSearchParams();
  const { t } = useTranslation();
  let book_id = Array.isArray(book) ? book[0] : book;

  const theme = useTheme();
  const chapters =
    useDbQuery(getChaptersForBook, [Number.parseInt(book_id)]) || [];
  const router = useRouter();
  return (
    <View className="flex-1 p-5 pb-0 pt-0 ">
      <FlatList
        className="pt-5"
        data={chapters}
        keyExtractor={(item) => item.chapter_number.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        ListHeaderComponent={() => (
          <View className="w-1 h-2 bg-primary/40 self-center" />
        )}
        ItemSeparatorComponent={() => {
          return <View className="w-1 h-6 bg-primary/40 self-center" />;
        }}
        renderItem={({ item, index }) => {
          const direction = index % 2 ? "flex-end" : "flex-start";
          return (
            <TouchableOpacity
              onPress={() => router.navigate(`/bible/${book_id}/${item.id}`)}
            >
              <Card style={{ width: "85%", alignSelf: direction }}>
                <CardContent className="flex-row items-center gap-4 p-4">
                  {item.is_read ? (
                    <CircleCheck
                      size={30}
                      stroke={theme.colors.background}
                      fill={theme.colors.primary}
                      className="color-foreground"
                    />
                  ) : (
                    <BookOpen className="color-foreground" />
                  )}
                  <View>
                    <Text className="text-xl text-foreground">
                      {t("bible.chapter")} {item.chapter_number}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {item.verses} {t("bible.verses")}{" "}
                    </Text>
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
