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
    <View className='w-full flex-1  items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full p-6 rounded-2xl'>
        <CardHeader className='items-center'>
          <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View className='p-3' />
          <CardTitle className='pb-2 text-center'>Rick Sanchez</CardTitle>
          <View className='flex-row'>
            <CardDescription className='text-base font-semibold'>Scientist</CardDescription>
            <Tooltip delayDuration={150}>
              <TooltipTrigger className='px-2 pb-0.5 active:opacity-50'>
                <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-foreground/70' />
              </TooltipTrigger>
              <TooltipContent className='py-2 px-4 shadow'>
                <Text className='native:text-lg'>Freelance</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </CardHeader>
        <CardContent className='flex-col'>
            <View className='flex-row items-center justify-center gap-2'>
            
            <Flame size={50} fill={theme.colors.primary} className='color-primary m-0 p-0' />

            <View className='flex-grow'>
              <View className='flex-row items-center overflow-hidden'>
                <Text className='text-2xl font-bold'>{verseCount}/</Text>
                <Text className='text-lg text-muted-foreground'>{verseGoal}{" "}</Text>
              <Text className='text-lg font-light text-muted-foreground'>{t('home.progress')}</Text>
              </View>
              <Progress value={progress} className='h-5' indicatorClassName='bg-primary' />
            </View>
            </View>
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <View />
          <View className='flex-row justify-around gap-3'>
            {days.map((day, index) => {
              return <View key={index} className='items-center'>
                <CircleCheck stroke={Math.random() > 0.7 ? theme.colors.border : theme.colors.primary}  size={30} className=' mb-1' />
                <Text className='text-lg font-light text-muted-foreground'>{t(`home.days.${day}`)}</Text>
              </View>
            })}

          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
