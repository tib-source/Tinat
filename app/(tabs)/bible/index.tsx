import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { Input } from "~/components/ui/input";
import bibleListData from "~/assets/data/bible_books.json";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
interface Book {
    bookNumber: number;
    book_en: string;
    book_am: string;
    chapters: number;
    chapters_read: number;
}

interface BibleList {
    books: Book[];
}

export default function Index() {

    const [search, setSearch] = useState("");
    const { t } = useTranslation();
    const bibleList = useMemo<BibleList>(() => {
        return bibleListData as BibleList;
    }, []);

    const [searchResults, setSearchResults] = useState<Book[]>(bibleList.books);
    const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        console.log(e.nativeEvent.text);
    };


    return (
        <View className="flex-1 p-2">
            <Input className="rounded-2xl mb-5" placeholder="Search Books..." onChange={handleSearch} />
            <View className="">
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.bookNumber.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="flex-0.65" onPress={() => console.log(item)}>
                            <Card className="w-50 p-4 mb-2 bg-background rounded-2xl">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-lg font-bold">{item.book_am}</Text>
                                    <Text className="text-sm text-muted-foreground">{item.chapters} chapters</Text>
                                </View>
                                <View className="flex-row items-center justify-between mt-2">
                                    <Text className="text-sm text-muted-foreground">Progress</Text>
                                    <Text className="text-sm text-muted-foreground">{Math.floor((item.chapters_read / item.chapters ) * 100) }%</Text>
                                </View>
                                <Progress value={Math.floor((item.chapters_read / item.chapters) * 100)} className="h-2 mt-1" indicatorClassName="bg-primary" />
                            </Card>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-lg text-muted-foreground">{t("bible.no_results")}</Text>
                        </View>
                    }
                    ListHeaderComponent={
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-lg font-bold">Chapters</Text>
                            <Text className="text-sm text-muted-foreground">{bibleList.books.length} books</Text>
                        </View>
                    }
                    />
            </View>
        </View>
    );
}
