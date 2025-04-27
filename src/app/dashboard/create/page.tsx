'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { KeywordExtractor } from '@/components/quiz/KeywordExtractor';
import { QuestionEditor } from '@/components/quiz/QuestionEditor';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/providers/AuthProvider';
import quizService from '@/services/quizService';
import { KeywordResponse, GeneratedQuestion } from '@/types';

export default function CreateQuizPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleExtractComplete = (data: KeywordResponse) => {
        setQuestions(data.questions || []);
        setStep(2);
    };

    const handleEditQuestion = (index: number, updatedQuestion: GeneratedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const handleSaveQuiz = async (title: string, description: string) => {
        if (!user) {
            setError("User not authenticated. Please log in again.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formattedQuestions = questions.map(q => ({
                question: q.question,
                options: q.options,
                correct_answer: q.correct_answer
            }));

            const response = await quizService.saveQuiz({
                quiz_title: title,
                quiz_description: description,
                user_id: user.id,
                questions: formattedQuestions
            });

            router.push(`/quiz/${response.quiz_id}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(`Failed to save quiz: ${errorMessage}`);
            setIsLoading(false);
        }
    };

    return (
        <AuthGuard>
            <MainLayout>
                <div className="bg-gray-50 min-h-screen py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Create New Quiz</h1>

                            <div className="mt-4">
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                        step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        1
                                    </div>
                                    <div className={`h-1 flex-1 mx-2 ${
                                        step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}></div>
                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                        step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        2
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm font-medium text-gray-500">Upload Document</span>
                                    <span className="text-sm font-medium text-gray-500">Edit & Save Quiz</span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="error" className="mb-6" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        {step === 1 && (
                            <KeywordExtractor onExtractComplete={handleExtractComplete} />
                        )}

                        {step === 2 && (
                            <QuestionEditor
                                questions={questions}
                                onSaveQuiz={handleSaveQuiz}
                                onEditQuestion={handleEditQuestion}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </div>
            </MainLayout>
        </AuthGuard>
    );
}