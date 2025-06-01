import { View } from 'react-native';
import { Card, CardContent } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';
import { CircleCheck } from '~/lib/icons/CircleCheck';
import { Flame } from '~/lib/icons/Flame';
import { useTheme } from '@react-navigation/native';
import useDbQuery from '~/hooks/useDbQuery';
import { getAllDaysInCurrentWeek } from '~/src/helpers/dateHelpers';
import { getLogsForWeekStarting, getTodaysLog } from '~/src/queries/logQueries';
import { useEffect, useState } from 'react';
import { useLogsForToday, useWeeklyLog } from '~/src/hooks/useDatabase';
import { Log } from '~/src/db/schema';


export default function StreakCard() {
    const theme = useTheme();
    const { t } = useTranslation();

    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];
    const verseGoal = 10;
    const verseCount = 1;
    const progressValue = Math.floor((verseCount / verseGoal) * 100);
    const [progress, setProgress] = useState(progressValue);

    const weekDays = getAllDaysInCurrentWeek()
    const {data : weekLogs} = useWeeklyLog(weekDays[0])
    const {data: todayLog} = useLogsForToday()
    
    const streakObject: Record<string, Log | null> = {};
    const getWeekStreak = () => { 
      // Create array with indices 0-6 for iteration
      for(let index = 0; index < 7; index++) {
        const current_day = weekDays[index]; // Get current day from weekDays array
        
        if (current_day && weekLogs) {
          const date_streak = weekLogs.filter((log) => {
              const streak_date = new Date(log.date);
              return streak_date.getDate() === current_day.getDate()
          })[0];
          

          streakObject[`${days[index]}`] = date_streak || null;
        }
      }
    }

    getWeekStreak();

    


    return (
        <Card className="w-full p-6 bg-background rounded-2xl">
            <CardContent className="flex-col items-center  gap-3 pb-0">
                <View className="flex-row items-center justify-center gap-2">
                    <Flame
                        size={50}
                        fill={theme.colors.primary}
                        className="color-primary m-0 p-0"
                    />

                    <View className="flex-grow">
                        <View className="flex-row items-center overflow-hidden">
                            <Text className="text-2xl font-bold">
                                {verseCount}/
                            </Text>
                            <Text className="text-lg text-muted-foreground">
                                {verseGoal}{' '}
                            </Text>
                            <Text className="text-lg font-light text-muted-foreground">
                                {t('home.progress')}
                            </Text>
                        </View>
                        <Progress
                            value={progress}
                            className="h-5"
                            indicatorClassName="bg-primary"
                        />
                    </View>
                </View>
                <View />
                <View className="flex-row justify-around gap-4">
                    {days.map((day, index) => {
                        const current_streak = streakObject[day]
                        const active = current_streak !== null
                        return (
                            <View key={index} className="items-center">
                                <CircleCheck
                                    stroke={
                                        active
                                            ? theme.colors.primary
                                            : theme.colors.border
                                    }
                                    size={30}
                                    className=" mb-1"
                                />
                                <Text className="text-lg font-light text-muted-foreground">
                                    {t(`home.days.${day}`)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </CardContent>
        </Card>
    );
}
