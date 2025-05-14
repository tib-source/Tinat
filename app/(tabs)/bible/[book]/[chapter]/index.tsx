import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";

import { View, Text, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LeftArrow, RightArrow } from "~/lib/icons/Navigation";
import { FontPopover } from "~/components/FontPopover";
import { useSharedValue } from "react-native-reanimated";
import useDbQuery from "~/hooks/useDbQuery";
import { getVersesForChapter } from "~/src/queries/queries";

export default function Index() {
  const { chapter, book } = useLocalSearchParams();
  const chapter_id = Number.parseInt(
    Array.isArray(chapter) ? chapter[0] : chapter,
  );
  const bookStr = Array.isArray(book) ? book[0] : book;
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(25);
  const progress = useSharedValue(fontSize);
  const minFont = useSharedValue(16);
  const maxFont = useSharedValue(32);
  const verses = useDbQuery(getVersesForChapter, [chapter_id]);
  const router = useRouter();
  return (
    <View className="flex-1 p-2 pb-0 pt-0 items-center">
      <FlatList
        className="pt-5 "
        data={verses}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 45 }}
        renderItem={({ item, index }) => {
          return (
            <View className="m-3 flex-row items-center text-clip">
              <CardContent>
                <Text
                  className="color-foreground "
                  style={{ fontSize: fontSize ?? 20 }}
                >
                  <Text
                    className="color-muted-foreground"
                    style={{ fontSize: fontSize - 3 }}
                  >
                    {" "}
                    {index + 1}{" "}
                  </Text>
                  {item.text_am}{" "}
                </Text>
              </CardContent>
            </View>
          );
        }}
      />
      {/* TODO: create the shelf here for adjusting font, brightness, hisotry and highlighting text */}
      <View className="absolute w-80 bottom-px bg-background flex-row justify-between w-full h-15 rounded-md border border-foreground/10">
        <Button
          variant={"ghost"}
          onPress={() => router.navigate(`/bible/${bookStr}/${chapter_id - 1}`)}
        >
          <LeftArrow color={theme.colors.text} />
        </Button>
        {/* <Button variant={"ghost"}> 
                    <FontIcon color={theme.colors.text}/> */}
        <Button variant={"ghost"}>
          <FontPopover
            min={minFont}
            max={maxFont}
            progress={progress}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </Button>
        <Button
          variant={"ghost"}
          onPress={() => router.navigate(`/bible/${bookStr}/${chapter_id + 1}`)}
        >
          <RightArrow color={theme.colors.text} />
        </Button>
      </View>
    </View>
  );
}
