'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/providers/AuthProvider';
import quizAttemptService from '@/services/quizAttemptService';
import { QuizAttempt } from '@/types';
import Link from 'next/link';

interface QuizAttemptHistoryProps {
    quizId?: number; // Optional, if provided will filter attempts by quiz ID
}

export const QuizAttemptHistory: React.FC<QuizAttemptHistoryProps> = ({ quizId }) => {
    const { user } = useAuth();
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttempts = async () => {
            if (!user) {
                setError("User not authenticated");
                setIsLoading(false);
                return;
            }

            try {
                const userAttempts = await quizAttemptService.getUserQuizAttempts(user.id);

                // Filter by quiz ID if provided
                const filteredAttempts = quizId
                    ? userAttempts.filter(attempt => attempt.quiz_id === quizId)
                    : userAttempts;

                // Cast the response to QuizAttempt[] to satisfy TypeScript
                setAttempts(filteredAttempts as QuizAttempt[]);
            } catch (err) {
                setError(`Failed to load quiz attempts: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttempts();
    }, [user, quizId]);

    // Format time in seconds to minutes and seconds
    const formatTime = (seconds: number | null): string => {
        if (seconds === null) return 'N/A';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Format date for display
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Loading quiz attempts...</p>
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

    if (attempts.length === 0) {
        return (
            <Card className="p-6 text-center">
                <p className="text-gray-600 mb-4">No quiz attempts found.</p>
                {quizId && (
                    <Button href={`/quiz/${quizId}`}>
                        Take This Quiz
                    </Button>
                )}
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
                {quizId ? 'Your Attempts for This Quiz' : 'Your Quiz Attempts'}
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quiz
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time Spent
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {attempts.map((attempt) => (
                        <tr key={attempt.attempt_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{attempt.quiz_title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatDate(attempt.started_at)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {attempt.score !== null ? (
                                    <div className="text-sm font-medium">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          attempt.score >= 70 ? 'bg-green-100 text-green-800' :
                              attempt.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                      }`}>
                        {Math.round(attempt.score)}%
                      </span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-500">Incomplete</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {formatTime(attempt.time_spent_seconds)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      attempt.completed_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {attempt.completed_at ? 'Completed' : 'In Progress'}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {attempt.completed_at ? (
                                    <Link href={`/quiz/${attempt.quiz_id}/attempt/${attempt.attempt_id}`} className="text-blue-600 hover:text-blue-900">
                                        View Details
                                    </Link>
                                ) : (
                                    <Link href={`/quiz/${attempt.quiz_id}`} className="text-blue-600 hover:text-blue-900">
                                        Continue
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {quizId && (
                <div className="mt-6 flex justify-center">
                    <Button href={`/quiz/${quizId}`}>
                        Take Quiz Again
                    </Button>
                </div>
            )}
        </Card>
    );
};