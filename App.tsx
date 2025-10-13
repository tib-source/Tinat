
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './src/db/schema';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { UserSettings } from './src/types';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import { create } from 'zustand';
import { getSettings } from './src/queries/settingQueries';
import { useSettingsStore } from './src/state/store';
// Open the database with change listeners enabled for live queries
const expo = openDatabaseSync('bible.db', { enableChangeListener: true });

// Create the drizzle instance with schema
export const db = drizzle(expo, { schema });

// Must be exported or Fast Refresh won't update the context
export function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const state = useMigrations(db, migrations)

  useEffect(() => {
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


  if (state?.error){ 
    console.log(state.error)
  }

  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
