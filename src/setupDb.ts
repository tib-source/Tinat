import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

export async function setupDatabase() {
  // First, check if database already exists
  const dbName = 'bible.sqlite';
  const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
  const dbPath = `${dbDirectory}/${dbName}`;
  
  // Create directory if it doesn't exist
  const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
  }
  
  // Check if database exists
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (!fileInfo.exists) {
    // If not, copy from assets
    // print current directory
    console.log("Copying database from assets to", dbPath);
    console.log("Current directory:", FileSystem.documentDirectory);
    // const asset = Asset.fromModule(require('../assets/bible.sqlite'));
    // await asset.downloadAsync();
    // await FileSystem.copyAsync({
    //   from: asset.uri,
    //   to: dbPath
    // });
  }
  
  // Open database
  return SQLite.openDatabaseAsync(dbName);
}