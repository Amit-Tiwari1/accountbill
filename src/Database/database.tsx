import SQLite from 'react-native-sqlite-2';

const database_name = 'billDb.db';
const database_version = '1.0';
const database_displayname = 'SQLite Demo';
const database_size = 200000;

export type DBConnection = any;


export const getDBConnection = async (): Promise<DBConnection> => {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                resolve(db);
            }
        );

        // Note: react-native-sqlite-2 doesn't have a separate error callback
        // If you need error handling, you'll need to wrap database operations in try-catch
    });
};