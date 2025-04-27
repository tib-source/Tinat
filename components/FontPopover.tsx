import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Text } from '~/components/ui/text';
import { FontIcon } from '~/lib/icons/Font';
import { Slider } from 'react-native-awesome-slider';
import { SharedValue } from 'react-native-reanimated';

interface FontPopoverProps {
  progress: SharedValue<number>;
  min:  SharedValue<number>;
  max:  SharedValue<number>;
  fontSize: number;
  setFontSize: (value: number) => void;
}

export function FontPopover({ progress, min, max, fontSize, setFontSize }: FontPopoverProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };



  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost'>
             <FontIcon color={theme.colors.text}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={Platform.OS === 'web' ? 'bottom' : 'top'}
          insets={contentInsets}
          className="w-64 flex-col gap-1 pl-10 pr-10"
        >
          <Text className='text-primary'>Font Size: {fontSize}</Text>
            <Slider
            onSlidingComplete={(value) => {
                setFontSize(value);
              }}
            progress={progress}
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            steps={4}
            forceSnapToStep
            sliderHeight={2}

            theme={{
                // Improve the visual appearance with themed colors
                minimumTrackTintColor: theme.colors.primary,
                maximumTrackTintColor: theme.colors.border,
                bubbleBackgroundColor: theme.colors.primary,
                cacheTrackTintColor: theme.colors.card,
              }}
        />
        </PopoverContent>
      </Popover>
  );
}

const styles = StyleSheet.create({
    slider: {
        padding: 5
    },
  });