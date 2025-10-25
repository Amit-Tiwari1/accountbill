import { useState, useCallback } from 'react';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { SmsModule } = NativeModules;

export interface SmsItem {
    id: string;
    address: string;
    body: string;
    date: string;
    type: 'credit' | 'debit' | 'other';
    amount?: number;
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

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                setError('SMS permission denied');
                setLoading(false);
                return;
            }

            const logs: SmsItem[] = await SmsModule.getSmsLogs();

            // Filter for financial transactions
            const filteredLogs = logs
                .map((sms) => {
                    const body = sms.body.toLowerCase();

                    const creditKeywords = ['credited', 'received', 'deposit', 'salary', 'refund', 'upi credited'];
                    const debitKeywords = ['debited', 'spent', 'withdrawn', 'purchase', 'payment done', 'upi debited', 'card transaction'];

                    let type: 'credit' | 'debit' | 'other' = 'other';

                    if (creditKeywords.some((kw) => body.includes(kw))) type = 'credit';
                    else if (debitKeywords.some((kw) => body.includes(kw))) type = 'debit';

                    // Extract amount if possible
                    const amountMatch = body.match(/(\d+[,.]?\d*)/);
                    const amount = amountMatch ? parseFloat(amountMatch[1].replace(',', '')) : undefined;

                    return { ...sms, type, amount };
                })
                .filter((sms) => sms.type !== 'other'); // Only keep credit/debit

            setSmsLogs(filteredLogs);
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch SMS logs');
        } finally {
            setLoading(false);
        }
    }, []);

    return { smsLogs, loading, error, fetchSms };
};
