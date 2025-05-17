'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/providers/AuthProvider';
import quizAttemptService from '@/services/quizAttemptService';
import { QuizAttemptDetail } from '@/types';

interface QuizAttemptDetailViewProps {
    attemptId: number;
}

export const QuizAttemptDetailView: React.FC<QuizAttemptDetailViewProps> = ({ attemptId }) => {
    const { user } = useAuth();
    const [attemptDetail, setAttemptDetail] = useState<QuizAttemptDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttemptDetail = async () => {
            if (!user) {
                setError("User not authenticated");
                setIsLoading(false);
                return;
            }

            try {
                const detail = await quizAttemptService.getQuizAttemptDetails(attemptId);
                // Cast to QuizAttemptDetail to handle any type mismatches
                setAttemptDetail(detail as unknown as QuizAttemptDetail);
            } catch (err) {
                setError(`Failed to load attempt details: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttemptDetail();
    }, [attemptId, user]);

    // Format time in seconds to minutes and seconds
    const formatTime = (seconds: number | null): string => {
        if (seconds === null) return 'N/A';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Format date for display
    const formatDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleString();
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Loading attempt details...</p>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="p-6">
                <Alert variant="error">{error}</Alert>
            </Card>
        );
    }

    if (!attemptDetail) {
        return (
            <Card className="p-6">
                <Alert variant="error">Attempt not found</Alert>
            </Card>
        );
    }

    const correctAnswers = attemptDetail.answers.filter(answer => answer.is_correct).length;
    const totalQuestions = attemptDetail.answers.length;
    const score = attemptDetail.score !== null ? Math.round(attemptDetail.score) : Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                        {attemptDetail.quiz_title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Score: {score}%
            </span>

                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Time: {formatTime(attemptDetail.time_spent_seconds)}
            </span>

                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {correctAnswers}/{totalQuestions} correct
            </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <span className="text-gray-500">Started:</span>
                        <span className="ml-2 text-gray-900">{formatDate(attemptDetail.started_at)}</span>
                    </div>

                    <div>
                        <span className="text-gray-500">Completed:</span>
                        <span className="ml-2 text-gray-900">
              {attemptDetail.completed_at ? formatDate(attemptDetail.completed_at) : 'Not completed'}
            </span>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <Button href={`/quiz/${attemptDetail.quiz_id}`}>
                        Retake Quiz
                    </Button>
                </div>
            </Card>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold px-2">Question Review</h2>

                {attemptDetail.answers.map((answer, index) => (
                    <Card key={answer.question_id} className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">
                                Question {index + 1}: {answer.question_text}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {answer.options.map((option, idx) => {
                                const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D, etc.
                                const isSelected = optionLetter === answer.selected_option_letter;
                                const isCorrect = option.is_correct;

                                let optionClass = 'p-3 rounded-md border';

                                if (isSelected && isCorrect) {
                                    optionClass += ' border-green-500 bg-green-50';
                                } else if (isSelected && !isCorrect) {
                                    optionClass += ' border-red-500 bg-red-50';
                                } else if (isCorrect) {
                                    optionClass += ' border-green-500';
                                } else {
                                    optionClass += ' border-gray-300';
                                }

                                return (
                                    <div
                                        key={option.id}
                                        className={optionClass}
                                    >
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2">{optionLetter}.</span>
                                            <span>{option.text}</span>

                                            {isSelected && (
                                                <span className="ml-2 text-sm">
                          (Your answer)
                        </span>
                                            )}

                                            {isCorrect && (
                                                <svg
                                                    className="ml-auto h-5 w-5 text-green-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4">
                            <p className={`text-sm font-medium ${answer.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                                {answer.is_correct
                                    ? 'Correct!'
                                    : `Incorrect. The correct answer is ${answer.correct_option_letter}.`}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <Button href={`/quiz/${attemptDetail.quiz_id}`} className="mr-4">
                    Retake Quiz
                </Button>
                <Button href="/dashboard/quizzes" variant="outline">
                    Back to Quizzes
                </Button>
            </div>
        </div>
    );
};