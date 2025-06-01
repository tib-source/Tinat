import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import { getBooks } from "~/src/queries/queries";
import useDbQuery from "~/hooks/useDbQuery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import BibleBookList from "~/components/BibleBookList";
import { Text } from "~/components/ui/text";
import { View } from "react-native";
import { Book } from "~/src/db/schema";
import { useBooks } from "~/src/hooks/useDatabase";
import { Loader } from "lucide-react-native";

export default function Index() {
  const { t } = useTranslation();
  const {isLoading, data: books} = useBooks()
  // const [search, setSearch] = useState(books);

  // const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {

  //     const result = books.filter(
  //         (book) =>  book.book_am.includes(e.nativeEvent.text)
  //     )

  //     setSearch(
  //         result
  //     )
  // };
  const [testament, setTestament] = useState("old");
  return (
    <View className="flex-1 p-2">
      <Input
        className="rounded-2xl mb-5"
        placeholder="Search Books..."
        onChange={() => {}}
      />
      {isLoading ? <Loader /> : 
            <Tabs
        value={testament}
        onValueChange={setTestament}
        className="w-full mx-auto flex-col "
      >
        <TabsList className="flex-row mx-auto w-[95%]">
          <TabsTrigger value="old" className="flex-1">
            <Text className="">{t("bible.testament.old")}</Text>
          </TabsTrigger>
          <TabsTrigger value="new" className="flex-1">
            <Text>{t("bible.testament.new")}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="old">
          <BibleBookList
            books={books?.filter((book) => book.testament === "old")}
          />
        </TabsContent>
        <TabsContent value="new">
          <BibleBookList
            books={books?.filter((book) => book.testament === "new")}
          />
        </TabsContent>
      </Tabs>}
    </View>
  );
}
