import * as React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'lucide-react-native';
const Item: any = Picker.Item;

export function Dropdown() {
    const [value, setValue] = useState('key1');
    return (
        <View>
            <Picker
                testID="basic-picker"
                selectedValue={value}
                onValueChange={(v) => setValue(v)}
                accessibilityLabel="Basic Picker Accessibility Label"
            >
                <Item label="hello" value="key0" />
                <Item label="world" value="key1" />
            </Picker>
        </View>
    );
}
