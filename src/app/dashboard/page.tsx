'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';
import { useAuth } from '@/providers/AuthProvider';
import quizService from '@/services/quizService';
import { Quiz } from '@/types';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizAttemptHistory } from '@/components/quiz/QuizAttemptHistory';

export default function DashboardPage() {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);

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
                                    Dashboard
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Welcome back, {user?.username || 'User'}
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

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
                            <Card className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Overview</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                                                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Total Quizzes</p>
                                                <p className="text-xl font-semibold text-gray-900">{quizzes.length}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Total Questions</p>
                                                <p className="text-xl font-semibold text-gray-900">
                                                    {quizzes.reduce((acc, quiz) => acc + (quiz.question_count || 0), 0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <Link href="/dashboard/create" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 rounded-md p-2 mr-3">
                                                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Create New Quiz</p>
                                                <p className="text-sm text-gray-500">Upload a document and generate questions</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/quizzes" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 rounded-md p-2 mr-3">
                                                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">View All Quizzes</p>
                                                <p className="text-sm text-gray-500">Manage and review your quizzes</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Card>
                        </div>

                        <Tabs index={activeTab} onChange={setActiveTab}>
                            <TabList className="mb-4 flex border-b border-gray-200">
                                <Tab className="px-4 py-2 font-medium text-sm border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 cursor-pointer">
                                    Your Quizzes
                                </Tab>
                                <Tab className="px-4 py-2 font-medium text-sm border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 cursor-pointer">
                                    Quiz Attempts
                                </Tab>
                            </TabList>

                            <TabPanel>
                                {isLoading ? (
                                    <div className="flex justify-center my-12">
                                        <Loader size="lg" />
                                    </div>
                                ) : quizzes.length === 0 ? (
                                    <Card className="p-6 text-center">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes yet</h3>
                                        <p className="text-gray-500 mb-4">
                                            You haven&#39;t created any quizzes yet. Get started by creating your first quiz.
                                        </p>
                                        <Button href="/dashboard/create">
                                            Create Your First Quiz
                                        </Button>
                                    </Card>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {quizzes.slice(0, 6).map((quiz) => (
                                            <QuizCard key={quiz.id} quiz={quiz} />
                                        ))}
                                    </div>
                                )}

                                {quizzes.length > 6 && (
                                    <div className="mt-6 text-center">
                                        <Link
                                            href="/dashboard/quizzes"
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View All Quizzes
                                        </Link>
                                    </div>
                                )}
                            </TabPanel>

                            <TabPanel>
                                <QuizAttemptHistory />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </MainLayout>
        </AuthGuard>
    );
}