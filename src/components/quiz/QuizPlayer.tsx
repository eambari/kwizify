'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Quiz } from '@/types';

interface QuizPlayerProps {
    quiz: Quiz;
}

interface QuizResults {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
    const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());

    const currentQuestion = quiz.questions?.[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === (quiz.questions?.length || 0) - 1;

    useEffect(() => {
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
    }, [currentQuestionIndex]);

    const handleOptionSelect = (optionId: number) => {
        if (!isAnswerSubmitted) {
            setSelectedOptionId(optionId);
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedOptionId !== null && currentQuestion) {
            setIsAnswerSubmitted(true);

            // Store user's answer
            setUserAnswers(new Map(userAnswers.set(currentQuestion.id, selectedOptionId)));
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleFinishQuiz = () => {
        if (!quiz.questions) return;

        let correctAnswers = 0;
        const totalQuestions = quiz.questions.length;

        quiz.questions.forEach(question => {
            const userSelectedOptionId = userAnswers.get(question.id);
            const correctOption = question.options.find(option => option.is_correct);

            if (userSelectedOptionId && correctOption && userSelectedOptionId === correctOption.id) {
                correctAnswers++;
            }
        });

        const incorrectAnswers = totalQuestions - correctAnswers;
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        setQuizResults({
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            score
        });
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
        setQuizResults(null);
        setUserAnswers(new Map());
    };

    if (!quiz.questions || quiz.questions.length === 0) {
        return (
            <Card className="p-6">
                <Alert variant="info">This quiz doesn&#39;t have any questions.</Alert>
            </Card>
        );
    }

    if (quizResults) {
        return (
            <Card className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>

                <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-blue-600 mb-3">{quizResults.score}%</div>
                    <p className="text-gray-600">
                        You answered {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correctly
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{quizResults.correctAnswers}</div>
                        <p className="text-green-800">Correct</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">{quizResults.incorrectAnswers}</div>
                        <p className="text-red-800">Incorrect</p>
                    </div>
                </div>

                <Button onClick={handleRestartQuiz} className="w-full">
                    Restart Quiz
                </Button>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </h2>

                <div className="text-sm font-medium text-gray-500">
                    Score: {Math.round((Array.from(userAnswers.entries()).filter(([questionId, optionId]) => {
                    const question = quiz.questions?.find(q => q.id === questionId);
                    const correctOption = question?.options.find(o => o.is_correct);
                    return correctOption?.id === optionId;
                }).length / userAnswers.size || 0) * 100)}%
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">{currentQuestion?.question_text}</h3>

                <div className="space-y-3">
                    {currentQuestion?.options.map((option) => {
                        const isCorrect = option.is_correct;
                        const isSelected = selectedOptionId === option.id;

                        let optionClass = 'p-3 rounded-md border cursor-pointer';

                        if (isAnswerSubmitted) {
                            if (isCorrect) {
                                optionClass += ' border-green-500 bg-green-50';
                            } else if (isSelected) {
                                optionClass += ' border-red-500 bg-red-50';
                            } else {
                                optionClass += ' border-gray-300 opacity-60';
                            }
                        } else {
                            optionClass += isSelected
                                ? ' border-blue-500 bg-blue-50'
                                : ' border-gray-300 hover:border-gray-400';
                        }

                        return (
                            <div
                                key={option.id}
                                className={optionClass}
                                onClick={() => handleOptionSelect(option.id)}
                            >
                                <div className="flex items-center">
                                    <span className="text-lg">{option.text}</span>

                                    {isAnswerSubmitted && isCorrect && (
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

                                    {isAnswerSubmitted && isSelected && !isCorrect && (
                                        <svg
                                            className="ml-auto h-5 w-5 text-red-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between">
                {!isAnswerSubmitted ? (
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionId === null}
                    >
                        Submit Answer
                    </Button>
                ) : isLastQuestion ? (
                    <Button onClick={handleFinishQuiz}>
                        Finish Quiz
                    </Button>
                ) : (
                    <Button onClick={handleNextQuestion}>
                        Next Question
                    </Button>
                )}
            </div>
        </Card>
    );
};