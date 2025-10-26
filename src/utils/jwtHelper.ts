import { jwtDecode } from 'jwt-decode';

export type JwtPayload = {
    iat: number;
    exp: number;
    data: {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            role: string;
        };
        company: {
            id: string;
            name: string;
            company_code: string;
            address: string;
        };
    };
};

export type DecodedJwt = {
    expired: boolean;
    payload: JwtPayload['data'] | null;
};

export const decodeJwt = (token: string | null) => {
    if (!token) return { expired: true, payload: null };

    try {
        const payload = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const expired = payload.exp < currentTime;

        return { expired, payload: payload.data };
    } catch (error) {
        console.warn('Invalid JWT token', error);
        return { expired: true, payload: null };
    }
};
