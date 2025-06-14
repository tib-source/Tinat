import * as React from "react";
import { View } from "react-native";
import Streak from "~/components/home/Streak";
import DailyVerse from "~/components/home/DailyVerse";

export default function Screen() {

  return (
    <View className="w-full flex-1 items-center gap-5 p-6">
      <Streak />
      <DailyVerse />
    </View>
  );
}
