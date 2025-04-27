import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { BookOpen } from "~/lib/icons/Book"
import { CircleCheck } from "~/lib/icons/CircleCheck"
import { View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { useTheme } from "@react-navigation/native";
import { dir } from "i18next";

export default function Index() {

    const { book } = useLocalSearchParams();
    console.log("params", book);
    const theme = useTheme()
    const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const router = useRouter()
    return (
        <View className="flex-1 p-5 pb-0 pt-0 ">
            
            <FlatList
                className="pt-5 "
                data={chapters}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    {
                        paddingBottom: 60
                    }
                }
                ListHeaderComponent={
                () =>             <View className="w-1 h-2 bg-primary/40 self-center" />

                }
                ItemSeparatorComponent={() => {
                    return <View className="w-1 h-6 bg-primary/40 self-center" />
                }}
                renderItem={({ item, index }) => {

                    const read = index < 5
                    const direction = index % 2 ? "flex-end" : "flex-start"
                    return (
                        <TouchableOpacity
                            onPress={() => router.navigate(`/bible/${book}/${item}`)}
                        >
                            <Card style={{ width: "85%", alignSelf: direction }}>
                                <CardContent className="flex-row items-center gap-4 p-4" >
                                    {
                                        read ?
                                            <CircleCheck size={30} stroke={theme.colors.background} fill={theme.colors.primary}  className="color-foreground" /> :
                                            <BookOpen className="color-foreground" />
                                    }
                                    <View>
                                        <Text className="text-xl text-foreground">Chapter {index + 1}</Text>
                                        <Text className="text-sm text-muted-foreground">24 Verses </Text>
                                    </View>
                                </CardContent>
                            </Card>
                        </TouchableOpacity>)
                }
                }
            />
        </View>
    );
}