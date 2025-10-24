import { useCallback, useState } from 'react';
import { NativeModules, Platform } from 'react-native';

const { WhatsAppModule } = NativeModules;

export const useWhatsAppSender = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const sendWhatsApp = useCallback(async (phone: string, message: string) => {
        if (!phone || !message) {
            setError('Phone number and message are required');
            return;
        }

        if (Platform.OS !== 'android') {
            setError('WhatsApp sending is supported only on Android');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const res = await WhatsAppModule.sendWhatsAppMessage(phone, message);
            setSuccess(res);
        } catch (err: any) {
            setError(err?.message || 'Failed to send WhatsApp message');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        sendWhatsApp,
        loading,
        error,
        success,
    };
};
