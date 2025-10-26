import { NativeModules, PermissionsAndroid, Platform, Alert } from 'react-native';
const { DatabaseModule } = NativeModules;

// Insert
export const insertExpense = async (type: string, category: string, amount: number, date: string, description: string) => {
    return DatabaseModule.insertExpense(type, category, amount, date, description);
};

// Update
export const updateExpense = async (id: number, type: string, category: string, amount: number, date: string, description: string) => {
    return DatabaseModule.updateExpense(id, type, category, amount, date, description);
};

// Delete
export const deleteExpense = async (id: number) => {
    return DatabaseModule.deleteExpense(id);
};

// Get all
export const getExpenses = async () => {
    return DatabaseModule.getExpenses();
};

// Export DB
export const exportDatabaseNative = async () => {
    if (Platform.OS !== 'android') {
        Alert.alert('Unsupported', 'Database export only works on Android.');
        return;
    }

    const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Storage Permission',
            message: 'App needs storage permission to export the database.',
            buttonPositive: 'OK',
        }
    );

    if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Cannot export database without permission.');
        return;
    }

    try {
        const res: string = await DatabaseModule.exportDatabase();
        Alert.alert('Export Successful', res);
    } catch (err: any) {
        console.error('Export DB Error:', err);
        Alert.alert('Error', String(err));
    }
};

export const testDbConnection = async () => {
    try {
        const res: string = await DatabaseModule.testDatabaseConnection();
        console.log(res);
        // Alert.alert(res);
    } catch (err) {
        console.error(err);
        Alert.alert('DB connection failed: ' + err);
    }
};
