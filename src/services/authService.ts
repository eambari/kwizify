import { fetchApi } from '@/utils/api';
import { saveToken, removeToken } from '@/utils/token';
import {
    User,
    LoginCredentials,
    SignupCredentials,
    AuthResponse
} from '@/types';

const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await fetchApi<AuthResponse>(
                '/auth/signin',
                {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                },
                false
            );

            saveToken(response.access_token);

            return response;
        } catch (error) {
            throw error;
        }
    },

    signup: async (credentials: SignupCredentials): Promise<User> => {
        try {
            const { username, email, password } = credentials;
            const apiCredentials = { username, email, password };

            const response = await fetchApi<User>(
                '/auth/signup',
                {
                    method: 'POST',
                    body: JSON.stringify(apiCredentials),
                },
                false
            );

            return response;
        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await fetchApi<User>('/auth/me', {
                method: 'GET',
            });

            return response;
        } catch (error) {
            throw error;
        }
    },

    logout: (): void => {
        removeToken();
    },
};

export default authService;