import { View } from 'react-native';
import { Text } from '../ui/text';
import { Switch } from '../ui/switch';
import { kebabify } from '../../helpers/utils';
import { Dropdown } from './Dropdown';

interface SettingProps {
    name: string;
    type: 'bool' | 'option' | 'rangeInput';
    options?: any;
    mutateFn: any;
    current: any;
}

export default function Setting({
    current,
    mutateFn,
    name,
    type,
    options
}: SettingProps) {
    const relevantModifier = () => {
        let nativeID = kebabify(name);

        switch (type) {
            case 'bool':
                return (
                    <Switch
                        checked={current}
                        onCheckedChange={mutateFn}
                        nativeID={nativeID}
                    />
                );
            case 'option':
                return <Dropdown />;
        }
    };
    return (
        <View className="flex-row justify-between p-5">
            <Text>{name}</Text>
            {relevantModifier()}
        </View>
    );
}
