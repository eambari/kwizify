'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export const SignupForm: React.FC = () => {
    const { signup, isLoading, error, clearError } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (validateForm()) {
            await signup(formData);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Create a new account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        sign in to your existing account
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
                        value={formData.username}
                        onChange={handleChange}
                        error={formErrors.username}
                    />

                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={formErrors.email}
                    />

                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        error={formErrors.password}
                    />

                    <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={formErrors.confirmPassword}
                    />
                </div>

                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Create Account
                    </Button>
                </div>

                <div className="text-sm text-center">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                        Privacy Policy
                    </Link>
                </div>
            </form>
        </div>
    );
};