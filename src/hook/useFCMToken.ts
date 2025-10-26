// hooks/useFCMToken.ts
import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

const { NotificationModule } = NativeModules;

interface DeviceInfo {
    brand: string;
    model: string;
    os: string;
    osVersion: string;
}

export const useFCMToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get FCM token
                const fcmToken: string = await NotificationModule.getFCMToken();
                setToken(fcmToken);

                // Get device info
                const info: DeviceInfo = await NotificationModule.getDeviceInfo();
                setDeviceInfo(info);
            } catch (e: any) {
                setError(e.message || 'Failed to fetch FCM token or device info');
            }
        };

        fetchData();
    }, []);

    return { token, deviceInfo, error };
};
