'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { isTokenValid } from '@/utils/token';
import { User, LoginCredentials, SignupCredentials, ApiError } from '@/types';

interface AuthContextState {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextState>({
    user: null,
    isLoading: true,
    isLoggedIn: false,
    error: null,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
    clearError: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (isTokenValid()) {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (err) {
                console.log(err)
                authService.logout();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.login(credentials);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            router.push('/dashboard');
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (credentials: SignupCredentials): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.signup(credentials);
            await authService.login({
                username: credentials.username,
                password: credentials.password,
            });
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            router.push('/dashboard');
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
        router.push('/');
    };

    const clearError = (): void => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isLoggedIn: !!user,
                error,
                login,
                signup,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;