import { set } from 'date-fns';
import * as React from 'react';
import { View } from 'react-native';
import Setting from '~/src/components/settings/Setting';
import { Card } from '~/src/components/ui/card';
import { Separator } from '~/src/components/ui/separator';
import { Text } from '~/src/components/ui/text';
import { useSettingsStore } from '~/src/state/store';

export default function Screen() {
    const { settings } = useSettingsStore();
    const setChecked = () => {};
    return (
        <View className="w-full flex-1 gap-2 p-6">
            <Text>General Settings</Text>
            <Card className="w-full bg-background rounded-2xl">
                <Setting
                    name="Dark Mode"
                    type="bool"
                    current={settings.darkMode}
                    mutateFn={setChecked}
                />
                <Separator />
                <Setting
                    name="testin"
                    type="option"
                    current={settings.darkMode}
                    mutateFn={setChecked}
                />
            </Card>
        </View>
    );
}
