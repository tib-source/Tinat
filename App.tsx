
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './src/db/schema';
import * as Font from 'expo-font';
import React from 'react';
// Open the database with change listeners enabled for live queries
const expo = openDatabaseSync('bible.sqlite', { enableChangeListener: true });

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
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
