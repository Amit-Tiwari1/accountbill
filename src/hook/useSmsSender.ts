import { useCallback, useState } from 'react';
import { NativeModules, Platform } from 'react-native';

const { SmsSenderModule } = NativeModules;

export const useSmsSender = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    /**
     * Sends an SMS using native Kotlin module
     * Opens the default SMS app with phone & message prefilled
     */
    const sendSms = useCallback(async (phoneNumber: string, message: string) => {
        if (!phoneNumber || !message) {
            setError('Phone number and message are required');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            if (Platform.OS !== 'android') {
                setError('SMS sending is only supported on Android');
                return;
            }

            const result = await SmsSenderModule.sendSms(phoneNumber, message);
            setSuccess(result);
        } catch (err: any) {
            setError(err?.message || 'Failed to send SMS');
        } finally {
            setLoading(false);
        }
    }, []);

    return { sendSms, loading, error, success };
};
