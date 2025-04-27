import React from 'react';
import { Button } from '@/components/ui/Button';
import { MainLayout } from '@/components/layout/MainLayout';

export default function NotFound() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        The page you&#39;re looking for doesn&#39;t exist or has been moved.
                    </p>
                    <Button href="/">
                        Back to Home
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}