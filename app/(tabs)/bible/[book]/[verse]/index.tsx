import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { BookOpen } from "~/lib/icons/Book"
import { CircleCheck } from "~/lib/icons/CircleCheck"
import { View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { useTheme } from "@react-navigation/native";

export default function Index() {

    const { book } = useLocalSearchParams();
    console.log("params", book);
    const theme = useTheme()
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
        <View className="flex-1 p-5 pb-0 pt-0 ">
            <FlatList
                className="pt-5 "
                data={chapters}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {

                    const read = index < 5
                    const direction = index % 2 ? "start" : "end"
                    return (
                        <TouchableOpacity
                            onPress={() => console.log(`onPress: Chapter ${item}`)}
                        >
                            <Card className={`self-${direction}`} style={{ width: "85%" }}>
                                <CardContent className="flex-row items-center gap-4 p-4" >
                                    {
                                        read ?
                                            <CircleCheck size={30} stroke={theme.colors.background} fill={theme.colors.primary} className="color-foreground" /> :
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