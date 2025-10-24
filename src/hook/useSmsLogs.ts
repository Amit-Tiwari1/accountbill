import { useState, useCallback } from 'react';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { SmsModule } = NativeModules;

export interface SmsItem {
    id: string;
    address: string;
    body: string;
    date: string;
    type: string;
}

export const useSmsLogs = () => {
    const [smsLogs, setSmsLogs] = useState<SmsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSms = useCallback(async () => {
        if (Platform.OS !== 'android') {
            setError('SMS logs are only available on Android');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: 'SMS Permission',
                    message: 'App needs access to your SMS logs',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                    buttonNeutral: 'Ask Me Later',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const logs: SmsItem[] = await SmsModule.getSmsLogs();
                setSmsLogs(logs);
            } else {
                setError('SMS permission denied');
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch SMS logs');
        } finally {
            setLoading(false);
        }
    }, []);

    return { smsLogs, loading, error, fetchSms };
};
