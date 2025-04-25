import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function DailyVerse() {
    const theme = useTheme();
    const { t } = useTranslation();
  // function updateProgressValue() {
  //   setProgress(Math.floor(verseCount/verseGoal * 100));
  // }
  return (
    <View
    className='bg-background'
    style={{
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.primary,
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      borderRadius: 16,
      padding: 12,
      width: '100%',
      flexDirection: 'row',
    }}
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className='text-xl font-bold text-foreground'>{t('home.daily_verse')}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flex: 1, margin: 12 }}>
          <Text className="text-base italic text-muted-foreground">
            "እኔ ስለ እናንተ የማሰብውን አሳብ አውቄአለሁ፥ የሰላም አሳብ እንጂ የክፉ አይደለም፤ እርስዋም የሚተማመኑትን ፈጽሞ ለመስጠት ነው።"
          </Text>
          <Text className="mt-2 text-xs text-muted-foreground">
            — ኤርምያስ 29፥11
          </Text>
        </View>
      </View>
    </View>
  </View>
  );
}
