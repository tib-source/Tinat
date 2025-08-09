
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './src/db/schema';
import * as Font from 'expo-font';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Open the database with change listeners enabled for live queries
const expo = openDatabaseSync('bible.db', { enableChangeListener: true });

// Create the drizzle instance with schema
export const db = drizzle(expo, { schema });

// Must be exported or Fast Refresh won't update the context
export function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        // If font fails to load, still allow app to render
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
