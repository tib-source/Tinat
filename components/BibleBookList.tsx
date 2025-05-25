import { FlatList, TouchableOpacity, View } from "react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { useRouter } from "expo-router";
import { Progress } from "./ui/progress";
import { useTranslation } from "react-i18next";
import { BookData } from "~/src/types";
export default function BibleBookList({ books }: { books?: BookData[] }) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.bookNumber.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.navigate(`/bible/${item.id}`)}
          className="p-1 pl-2 pr-2"
        >
          <Card className="p-4 mb-2 bg-background rounded-2xl">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-foreground">
                {item.titleAm}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {item.chapters} {t("bible.chapters")}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-sm text-muted-foreground">
                {t("bible.progress")}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {Math.floor((item.readChapters / item.chapters) * 100)}%
              </Text>
            </View>
            <Progress
              value={Math.floor((item.readChapters / item.chapters) * 100)}
              className="h-2 mt-1"
              indicatorClassName="bg-primary"
            />
          </Card>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200 }}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-muted-foreground">
            {t("bible.no_results")}
          </Text>
        </View>
      }
      ListHeaderComponent={
        <View className="flex-row items-center justify-end mb-2 pr-5">
          <Text className="text-sm text-muted-foreground">
            {books?.length} {t("bible.books")}
          </Text>
        </View>
      }
    />
  );
}
