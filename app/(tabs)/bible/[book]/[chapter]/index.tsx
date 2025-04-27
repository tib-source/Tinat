import { useLocalSearchParams, usePathname, useRouter } from "expo-router/build/hooks";

import { View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LeftArrow, RightArrow } from "~/lib/icons/Navigation";
import { FontPopover } from "~/components/FontPopover";
import { useSharedValue } from "react-native-reanimated";

export default function Index() {

    const { chapter, book } = useLocalSearchParams();
    const chapterStr = Array.isArray(chapter) ? chapter[0] : chapter;
    const bookStr = Array.isArray(book) ? book[0] : book;
    const theme = useTheme()
    const [fontSize, setFontSize ] = useState(25)
    const progress = useSharedValue(fontSize)
    const minFont = useSharedValue(12)
    const maxFont = useSharedValue(32)

    const verses = [
        "እባብም እግዚአብሔር አምላክ ከፈጠረው ከምድር አውሬ ሁሉ ይልቅ ተንኰለኛ ነበረ። ሴቲቱንም። በውኑ እግዚአብሔር ከገነት ዛፍ ሁሉ እንዳትበሉ አዝዞአልን? አላት።",
        "ሴቲቱም ለእባቡ አለችው። በገነት ካለው ከዛፍ ፍሬ እንበላለን፤",
        "ነገር ግን በገነት መካከል ካለው ከዛፉ ፍሬ፥ እግዚአብሔር አለ። እንዳትሞቱ ከእርሱ አትብሉ አትንኩትም።",
        "እባብም ለሴቲቱ አላት። ሞትን አትሞቱም፤",
        "ከእርስዋ በበላችሁ ቀን ዓይኖቻችሁ እንዲከፈቱ እንደ እግዚአብሔርም መልካምንና ክፉን የምታውቁ እንድትሆኑ እግዚአብሔር ስለሚያውቅ ነው እንጂ።",
        "ሴቲቱም ዛፉ ለመብላት ያማረ እንደ ሆነ፥ ለዓይንም እንደሚያስጎመጅ፥ ለጥበብም መልካም እንደ ሆነ አየች፤ ከፍሬውም ወሰደችና በላች፤ ለባልዋም ደግሞ ሰጠችው እርሱም ከእርስዋ ጋር በላ።",
        "የሁለቱም ዓይኖች ተከፈቱ፥ እነርሱም ዕራቁታቸውን እንደ ሆኑ አወቁ፤ የበለስንም ቅጠሎች ሰፍተው ለእነርሱ ለራሳቸው ግልድም አደረጉ።",
        "እነርሱም ቀኑ በመሸ ጊዜ የእግዚአብሔርን የአምላክን ድምፅ ከገነት ውስጥ ሲመላለስ ሰሙ፤ አዳምና ሚስቱም ከእግዚአብሔር ከአምላክ ፊት በገነት ዛፎች መካከል ተሸሸጉ።",
        "እግዚአብሔር አምላክም አዳምን ጠርቶ። ወዴት ነህ? አለው።",
        "እርሱም አለ። በገነት ድምፅህን ሰማሁ፤ ዕራቁቴንም ስለ ሆንሁ ፈራሁ፥ ተሸሸግሁም።",
        "እግዚአብሔርም አለው። ዕራቁትህን እንደ ሆንህ ማን ነገረህ? ከእርሱ እንዳትበላ ካዘዝሁህ ዛፍ በውኑ በላህን?",
        "አዳምም አለ። ከእኔ ጋር እንድትሆን የሰጠኸኝ ሴት እርስዋ ከዛፉ ሰጠችኝና በላሁ።",
        "እግዚአብሔር አምላክም ሴቲቱን። ይህ ያደረግሽው ምንድር ነው? አላት። ሴቲቱም አለች። እባብ አሳተኝና በላሁ።",
        "እግዚአብሔር አምላክም እባቡን አለው። ይህን ስላደረግህ ከእንስሳት ከምድር አራዊትም ሁሉ ተለይተህ አንተ የተረገምህ ትሆናለህ፤ በሆድህም ትሄዳለህ፥ አፈርንም በሕይወትህ ዘመን ሁሉ ትበላለህ።",
        "በአንተና በሴቲቱ መካከል፥ በዘርህና በዘርዋም መካከል ጠላትነትን አደርጋለሁ፤ እርሱ ራስህን ይቀጠቅጣል፥ አንተም ሰኰናውን ትቀጠቅጣለህ።",
        "ለሴቲቱም አለ። በፀነስሽ ጊዜ ጭንቅሽን እጅግ አበዛለሁ፤ በጭንቅ ትወልጃለሽ፤ ፈቃድሽም ወደ ባልሽ ይሆናል፥ እርሱም ገዥሽ ይሆናል።",
        "አዳምንም አለው። የሚስትህን ቃል ሰምተሃልና፥ ከእርሱ እንዳትበላ ካዘዝሁህ ዛፍም በልተሃልና ምድር ከአንተ የተነሣ የተረገመች ትሁን፤ በሕይወት ዘመንህም ሁሉ በድካም ከእርስዋ ትበላለህ፤",
        "እሾህንና አሜከላን ታበቅልብሃለች፤ የምድርንም ቡቃያ ትበላለህ።",
        "ወደ ወጣህበት መሬት እስክትመለስ ድረስ በፊትህ ወዝ እንጀራን ትበላለህ፤ አፈር ነህና፥ ወደ አፈርም ትመለሳለህና።",
        "አዳምም ለሚስቱ ሔዋን ብሎ ስም አወጣ፥ የሕያዋን ሁሉ እናት ናትና።",
        "እግዚአብሔር አምላክም ለአዳምና ለሚስቱ የቁርበትን ልብስ አደረገላቸው፥ አለበሳቸውም።",
        "እግዚአብሔር አምላክም አለ። እነሆ አዳም መልካምንና ክፉን ለማወቅ ከእኛ እንደ አንዱ ሆነ፤ አሁንም እጁን እንዳይዘረጋ፥ ደግሞም ከሕይወት ዛፍ ወስዶ እንዳይበላ፥ ለዘላለምም ሕያው ሆኖ እንዳይኖር፤",
        "ስለዚህ እግዚአብሔር አምላክ ከዔድን ገነት አስወጣው፥ የተገኘባትን መሬት ያርስ ዘንድ።",
        "አዳምንም አስወጣው፥ ወደ ሕይወት ዛፍ የሚወስደውንም መንገድ ለመጠበቅ ኪሩቤልንና የምትገለባበጥ የነበልባል ሰይፍን በዔድን ገነት ምሥራቅ አስቀመጠ።"
    ]
    const router = useRouter()
    return (
        <View className="flex-1 p-2 pb-0 pt-0 items-center">
            <FlatList
                className="pt-5 "
                data={verses}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 45 }}
                renderItem={({ item, index }) => {

                    return (

                        <View className="m-3 flex-row items-center text-clip">
                            <CardContent >
                                <Text className="color-foreground " style={{ fontSize: fontSize ?? 20 }}>
                                <Text className="color-muted-foreground" style={{ fontSize: fontSize - 3 }}> {index + 1} </Text>
                                    {item} </Text>

                            </CardContent>
                        </View>

                    )
                }
                }

            />
        {/* TODO: create the shelf here for adjusting font, brightness, hisotry and highlighting text */}
            <View className="absolute w-80 bottom-px bg-background flex-row justify-between w-full h-15 rounded-md border border-foreground/10">
                <Button variant={"ghost"} onPress={() => router.navigate(`/bible/${bookStr}/${Number.parseInt(chapterStr ?? "1") - 1}`)}>
                    <LeftArrow color={theme.colors.text}/>
                </Button>
                 {/* <Button variant={"ghost"}> 
                    <FontIcon color={theme.colors.text}/> */}
                <Button variant={"ghost"}>
                    <FontPopover min={minFont} max={maxFont} progress={progress} fontSize={fontSize} setFontSize={setFontSize}/>
                </Button>
                <Button variant={"ghost"} onPress={() => router.navigate(`/bible/${bookStr}/${Number.parseInt(chapterStr ?? "1") + 1}`)}>
                    <RightArrow color={theme.colors.text}/>
                </Button>
            </View>
        </View>
    );


}