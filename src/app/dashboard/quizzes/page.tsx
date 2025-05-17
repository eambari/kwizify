'use client';

import React, {useEffect, useState} from 'react';
import {MainLayout} from '@/components/layout/MainLayout';
import {AuthGuard} from '@/components/auth/AuthGuard';
import {Loader} from '@/components/ui/Loader';
import {Alert} from '@/components/ui/Alert';
import {Button} from '@/components/ui/Button';
import {Card} from 'ui/Card';
import {useAuth} from '@/providers/AuthProvider';
import quizService from '@/services/quizService';
import {Quiz} from '@/types';
import {QuizCard} from '@/components/quiz/QuizCard';

export default function QuizzesPage() {
    const {user} = useAuth();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!user) return;

            try {
                setIsLoading(true);
                const userQuizzes = await quizService.getUserQuizzes(user.id);
                setQuizzes(userQuizzes);
            } catch (err) {
                setError(`Failed to load quizzes: ${(err as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizzes();
    }, [user]);

    return (
        <AuthGuard>
            <MainLayout>
                <div className="bg-gray-50 min-h-screen py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between mb-8">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    My Quizzes
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    A list of all the quizzes you&#39;ve created
                                </p>
                            </div>
                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                <Button href="/dashboard/create">
                                    Create New Quiz
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="error" className="mb-6" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        {isLoading ? (
                            <div className="flex justify-center my-12">
                                <Loader size="lg"/>
                            </div>
                        ) : quizzes.length === 0 ? (
                            <Card className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
                                <p className="text-gray-500 mb-4">
                                    You haven&#39;t created any quizzes yet. Get started by creating your first quiz.
                                </p>
                                <Button href="/dashboard/create">
                                    Create Your First Quiz
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {quizzes.map((quiz) => (
                                    <QuizCard key={quiz.id} quiz={quiz}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </MainLayout>
        </AuthGuard>
    );
}