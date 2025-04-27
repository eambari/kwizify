import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    sub: string;
    [key: string]: unknown;
}

export const saveToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('kwizify_token', token);
    }
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('kwizify_token');
    }
    return null;
};

export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('kwizify_token');
    }
};

export const isTokenValid = (): boolean => {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};

export const getUsernameFromToken = (): string | null => {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.sub || null;
    } catch (error) {
        console.error('Error extracting username from token:', error);
        return null;
    }
};