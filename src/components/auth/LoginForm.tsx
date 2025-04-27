'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export const LoginForm: React.FC = () => {
    const { login, isLoading, error, clearError } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
    });

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            username: '',
            password: '',
        };

        if (!username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (validateForm()) {
            await login({ username, password });
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Log in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        create a new account
                    </Link>
                </p>
            </div>

            {error && (
                <Alert variant="error" onClose={clearError}>
                    {error}
                </Alert>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Input
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={formErrors.username}
                    />

                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={formErrors.password}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};