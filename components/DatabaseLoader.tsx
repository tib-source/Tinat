import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '~/.';
import migrations from '~/drizzle/migrations';
import { seedBibleData } from '~/src/db/seedBibleData';

export default function DatabaseLoader({
    children
}: React.PropsWithChildren<object>) {
    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <Text className="mt-10 text-[red]">
                    Migration error: {error.message}r
                </Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" className="color-foreground" />
                <Text className="mt-10 text-foreground">
                    Migration is in progress...
                </Text>
            </View>
        );
    }

    seedBibleData().then((result) => {
        if (result.success) {
            console.log(success);
        } else {
            console.log(result.error);
        }
    });

    return <>{children}</>;
}
