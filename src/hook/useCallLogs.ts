import { useCallback, useState } from 'react';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { CallLogModule } = NativeModules;

export interface CallLogItem {
    id: string;
    number: string | null;
    name: string | null;
    type: number;
    date: string; // epoch millis as string
    duration: string; // seconds as string
}

export const useCallLogs = () => {
    const [callLogs, setCallLogs] = useState<CallLogItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCallLogs = useCallback(async (limit?: number) => {
        if (Platform.OS !== 'android') {
            setError('Call logs are only available on Android');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                {
                    title: 'Call Log Permission',
                    message: 'App needs access to your call history',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                    buttonNeutral: 'Ask Me Later',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // call native module; pass limit or null
                const logs: CallLogItem[] = await CallLogModule.getCallLogs(limit ?? null);
                setCallLogs(logs);
            } else {
                setError('Call log permission denied');
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch call logs');
        } finally {
            setLoading(false);
        }
    }, []);

    return { callLogs, loading, error, fetchCallLogs };
};
