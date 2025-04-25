import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig} from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { CircleCheck } from '~/lib/icons/CircleCheck';
import { Flame } from '~/lib/icons/Flame';
import { useTheme } from '@react-navigation/native';
import Streak from '~/components/home/Streak';
import DailyVerse from '~/components/home/DailyVerse';
const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const verseGoal = 10;
  const verseCount = 1;
  const progressValue = Math.floor((verseCount / verseGoal) * 100);
  const [progress, setProgress] = React.useState(progressValue);

  // function updateProgressValue() {
  //   setProgress(Math.floor(verseCount/verseGoal * 100));
  // }
  return (
    <View className='w-full flex-1 items-center gap-5 p-6'>
      <Streak />
      {/* Create a daily verse section */}
      <DailyVerse />
    </View>
  );
}
