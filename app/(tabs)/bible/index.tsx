import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

function BibleContent() {

  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl font-bold text-foreground">{t('home.greeting', {"name": "Bible"})}</Text>
    </View>
  );
}

export default function Index() {
  return (
    <SQLiteProvider 
      databaseName="bible.sqlite"
    >
      <BibleContent />
    </SQLiteProvider>
  );
}