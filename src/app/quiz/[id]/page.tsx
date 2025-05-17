'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { QuizPlayer } from '@/components/quiz/QuizPlayer';
import { Card } from 'ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import quizService from '@/services/quizService';
import { Quiz } from '@/types';

export default function QuizDetailPage() {
    const params = useParams();
    const quizId = parseInt(params.id as string);

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startQuiz, setStartQuiz] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setIsLoading(true);
                const quizData = await quizService.getQuiz(quizId);
                setQuiz(quizData);
            } catch (err) {
                setError(`Failed to load quiz: ${(err as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center my-12">
                            <Loader size="lg"/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error || !quiz) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="p-6">
                            <Alert variant="error" className="mb-4">
                                {error || "Quiz not found"}
                            </Alert>
                            <div className="text-center">
                                <Button href="/dashboard">
                                    Back to Dashboard
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const formattedDate = new Date(quiz.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!startQuiz ? (
                        <Card className="p-6">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
                                <p className="text-gray-500">Created on {formattedDate}</p>
                            </div>

                            {quiz.description && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                                    <p className="text-gray-700">{quiz.description}</p>
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Details</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                        </svg>
                                        <span>{quiz.questions?.length || 0} Questions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>Estimated time: {(quiz.questions?.length || 0) * 2} minutes</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-1" onClick={() => setStartQuiz(true)}>
                                    Start Quiz
                                </Button>
                                <Button variant="outline" className="flex-1" href="/dashboard">
                                    Back to Dashboard
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <>
                            <div className="mb-6">
                                <Button variant="outline" onClick={() => setStartQuiz(false)}>
                                    Back to Quiz Details
                                </Button>
                            </div>
                            <QuizPlayer quiz={quiz}/>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}