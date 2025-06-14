import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './src/db/schema';

// Open the database with change listeners enabled for live queries
const expo = openDatabaseSync('tinat_v2.db', { enableChangeListener: true });

// Create the drizzle instance with schema
export const db = drizzle(expo, { schema });


// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
