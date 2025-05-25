import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

// Open the database with change listeners enabled for live queries
const expo = openDatabaseSync('bible.db', { enableChangeListener: true });

// Create the drizzle instance
export const db = drizzle(expo, { schema });

export type Database = typeof db;
export { schema };