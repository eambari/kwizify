import { ApiError } from '@/types';

const API_URL = 'https://kwizify-api.onrender.com';
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('kwizify_token');
    }
    return null;
};

const createHeaders = (includeAuth: boolean = true): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

export const fetchApi = async <T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
): Promise<T> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const headers = {
            ...createHeaders(includeAuth),
            ...options.headers,
        };

        console.log(`Fetching ${options.method || 'GET'} ${url}`);

        if (options.body) {
            console.log('Request body:', options.body);
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        const responseText = await response.text();
        console.log('Response status:', response.status);
        console.log('Response text:', responseText);

        let responseData;
        try {
            responseData = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
            console.log(e)
            responseData = { detail: responseText };
        }

        if (!response.ok) {
            let errorMessage = 'An error occurred';

            if (responseData.detail) {
                errorMessage = typeof responseData.detail === 'string'
                    ? responseData.detail
                    : JSON.stringify(responseData.detail);
            } else if (responseData.message) {
                errorMessage = responseData.message;
            } else {
                errorMessage = response.statusText || errorMessage;
            }

            const error: ApiError = {
                status: response.status,
                message: errorMessage,
            };

            throw error;
        }

        return responseData as T;
    } catch (error) {
        if ((error as ApiError).status) {
            throw error;
        }

        console.error('API error:', error);
        throw {
            status: 500,
            message: (error as Error).message || 'Network error',
        } as ApiError;
    }
};

export const uploadFile = async <T>(
    endpoint: string,
    formData: FormData,
    includeAuth: boolean = true
): Promise<T> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const headers: HeadersInit = {};

        if (includeAuth) {
            const token = getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        console.log(`Uploading to ${url}`);

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: formData,
        });

        const responseText = await response.text();
        console.log('Response status:', response.status);
        console.log('Response text:', responseText);

        let responseData;
        try {
            responseData = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
            console.log(e)
            responseData = { detail: responseText };
        }

        if (!response.ok) {
            let errorMessage = 'An error occurred during file upload';

            if (responseData.detail) {
                errorMessage = typeof responseData.detail === 'string'
                    ? responseData.detail
                    : JSON.stringify(responseData.detail);
            } else if (responseData.message) {
                errorMessage = responseData.message;
            } else {
                errorMessage = response.statusText || errorMessage;
            }

            const error: ApiError = {
                status: response.status,
                message: errorMessage,
            };

            throw error;
        }

        return responseData as T;
    } catch (error) {
        if ((error as ApiError).status) {
            throw error;
        }

        console.error('File upload error:', error);
        throw {
            status: 500,
            message: (error as Error).message || 'Network error during file upload',
        } as ApiError;
    }
};