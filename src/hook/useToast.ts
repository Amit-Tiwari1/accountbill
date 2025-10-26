import { Platform, ToastAndroid, Alert } from 'react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';

let lastToastTime = 0;
const TOAST_DEBOUNCE_TIME = 1000;

/**
 * Show a native toast or alert message
 * @param message The message to display
 * @param type Type of message
 */
const showNativeToast = (message: string, type: ToastType = 'error') => {
    const now = Date.now();
    if (now - lastToastTime < TOAST_DEBOUNCE_TIME) return;
    lastToastTime = now;

    if (Platform.OS === 'android') {
        const duration = type === 'error' ? ToastAndroid.LONG : ToastAndroid.SHORT;
        ToastAndroid.show(message, duration);
        // TODO: For colored toast, a native Kotlin module is required
    } else {
        Alert.alert(
            type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Info',
            message,
            [{ text: 'OK' }],
            { cancelable: true }
        );
    }
};

export const showToast = {
    success: (title: string, message?: string) => {
        const fullMessage = message ? `${title}: ${message}` : title;
        showNativeToast(fullMessage, 'success');
    },

    error: (title: string, message?: string) => {
        const fullMessage = message ? `${title}: ${message}` : title;
        showNativeToast(fullMessage, 'error');
    },

    warning: (title: string, message?: string) => {
        const fullMessage = message ? `${title}: ${message}` : title;
        showNativeToast(fullMessage, 'warning');
    },

    info: (title: string, message?: string) => {
        const fullMessage = message ? `${title}: ${message}` : title;
        showNativeToast(fullMessage, 'info');
    },
};
