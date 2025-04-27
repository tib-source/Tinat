import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Link, useRouter } from "expo-router";
import { getBooks } from "~/src/queries/queries";
import { Book } from "~/src/types";
import useDbQuery from "~/hooks/useDbQuery";



export default function Index() {
    const { t } = useTranslation();
    const books = useDbQuery<Book[]>(getBooks) || [];
    console.log(books[0])
    // const [search, setSearch] = useState(books);

    // const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        
    //     const result = books.filter(
    //         (book) =>  book.book_am.includes(e.nativeEvent.text)
    //     )
        

    //     setSearch(
    //         result
    //     )
    // };

    const router = useRouter();

    return (
        <View className="flex-1 p-2">
            <Input className="rounded-2xl mb-5" placeholder="Search Books..." onChange={()=>{}} />
            <View className="">
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.book_number.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>router.navigate(`/bible/${item.title_am}`)} className="p-1 pl-4 pr-4">
                            <Card className="p-4 mb-2 bg-background rounded-2xl">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-lg font-bold text-foreground">{item.title_am}</Text>
                                    <Text className="text-sm text-muted-foreground">{item.chapters} chapters</Text>
                                </View>
                                <View className="flex-row items-center justify-between mt-2">
                                    <Text className="text-sm text-muted-foreground">Progress</Text>
                                    <Text className="text-sm text-muted-foreground">{Math.floor((item.read_chapters / item.chapters ) * 100) }%</Text>
                                </View>
                                <Progress value={Math.floor((item.read_chapters / item.chapters) * 100)} className="h-2 mt-1" indicatorClassName="bg-primary" />
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
                            <Text className="text-sm text-muted-foreground">{books.length} books</Text>
                        </View>
                    }
                    />
            </View>
        </View>
    );
}
