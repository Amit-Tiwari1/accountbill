import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'billDb.db';
const database_version = '1.0';
const database_displayname = 'SQLite Demo';
const database_size = 200000;

/**
 * Returns a connection to the SQLite database.
 */
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
    );
};
