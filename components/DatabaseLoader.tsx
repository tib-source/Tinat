import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from "../src/db";
import migrations from '../src/db/migrations/migrations'; 

export default function DatabaseLoader({
  children,
}: React.PropsWithChildren<object>) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="mt-10 text-[red]">Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" className="color-foreground" />
        <Text className="mt-10 text-foreground">Migration is in progress...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
