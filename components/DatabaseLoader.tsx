import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import migrateDbIfNeeded from '../src/db/seedDatabase';

export default function DatabaseLoader({ children }: React.PropsWithChildren<{}>) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const db = useSQLiteContext();

    useEffect(() => {
        const setupDb = async () => {
            try {
                await migrateDbIfNeeded(db);
                setIsLoading(false);
            } catch (err: any) {
                setError(err?.message || 'Failed to set up database.');
                setIsLoading(false);
            }
        };

        setupDb();
    }, [db]);

    if (isLoading) {
        return (
            <View className='flex-1 justify-center items-center bg-background'>
                <ActivityIndicator size="large" className='color-foreground' />
                <Text className='mt-10 text-foreground'>Setting up database...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className='flex-1 justify-center items-center bg-background'>
                <Text className='mt-10 text-[red]'>Error: {error}</Text>
            </View>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});