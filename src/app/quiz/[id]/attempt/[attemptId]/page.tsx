'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { QuizAttemptDetailView } from '@/components/quiz/QuizAttemptDetailView';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function QuizAttemptDetailPage() {
    const params = useParams();
    const attemptId = parseInt(params.attemptId as string);

    return (
        <AuthGuard>
            <MainLayout>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <QuizAttemptDetailView attemptId={attemptId} />
                    </div>
                </div>
            </MainLayout>
        </AuthGuard>
    );
}