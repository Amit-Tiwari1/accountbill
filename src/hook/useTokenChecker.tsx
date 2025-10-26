import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { decodeJwt, JwtPayload } from '../utils/jwtHelper';

export const useTokenChecker = () => {
    const navigation = useNavigation<any>();
    const [sessionExpired, setSessionExpired] = useState(false);
    const [payload, setPayload] = useState<JwtPayload['data'] | null>(null);

    useEffect(() => {
        let interval: number;

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;

            const decoded = decodeJwt(token);


            if (decoded?.expired) {
                if (!sessionExpired) {
                    setSessionExpired(true);
                    setTimeout(async () => {
                        await AsyncStorage.removeItem('token');
                        setSessionExpired(false);
                        navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
                    }, 3000); // 3 seconds before redirect
                }
                return;
            }
            setPayload(decoded.payload)

        };

        checkToken();
        interval = setInterval(checkToken, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, [navigation, sessionExpired]);

    return { sessionExpired, payload };
};
