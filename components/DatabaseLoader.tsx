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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.text}>Setting up database...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});