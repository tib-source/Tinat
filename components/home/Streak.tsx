import * as React from 'react';
import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardFooter,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';
import { CircleCheck } from '~/lib/icons/CircleCheck';
import { Flame } from '~/lib/icons/Flame';
import { useTheme } from '@react-navigation/native';

export default function Streak() {
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
      <Card className='w-full p-6 bg-background rounded-2xl'>
        <CardContent className='flex-col gap-3 pb-0'>
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
          <View />
          <View className='flex-row justify-around gap-4'>
            {days.map((day, index) => {
              return <View key={index} className='items-center'>
                <CircleCheck stroke={Math.random() > 0.7 ? theme.colors.border : theme.colors.primary}  size={30} className=' mb-1' />
                <Text className='text-lg font-light text-muted-foreground'>{t(`home.days.${day}`)}</Text>
              </View>
            })}
          </View>
          </CardContent>
      </Card>
  );
}
