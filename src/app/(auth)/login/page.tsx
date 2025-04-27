'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <MainLayout hideFooter>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}