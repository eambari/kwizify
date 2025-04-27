'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Quiz } from '@/types';

interface QuizCardProps {
    quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
    const router = useRouter();
    const formattedDate = new Date(quiz.created_at).toLocaleDateString();

    const handleViewQuiz = () => {
        router.push(`/quiz/${quiz.id}`);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{quiz.title}</h3>

                <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description || 'No description'}</p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Created: {formattedDate}</span>
                    <span>{quiz.question_count || 0} questions</span>
                </div>

                <Button
                    onClick={handleViewQuiz}
                    className="w-full"
                >
                    View Quiz
                </Button>
            </div>
        </Card>
    );
};