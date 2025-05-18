'use client';

import React, {useState, useEffect, useRef} from 'react';
import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {Alert} from '@/components/ui/Alert';
import {Modal} from '@/components/ui/Modal';
import {Quiz} from '@/types';
import {useAuth} from '@/providers/AuthProvider';
import quizAttemptService from '@/services/quizAttemptService';
import Tooltip from '@/components/ui/Tooltip';

interface QuizPlayerProps {
    quiz: Quiz;
}

interface QuizResults {
    attempt_id: number;
    score: number;
    correct_answers: number;
    total_questions: number;
    time_spent_seconds: number;
}

type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const QuizPlayer: React.FC<QuizPlayerProps> = ({quiz}) => {
    const {user} = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
    // Track selected answers by index (position) instead of question ID
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [attemptId, setAttemptId] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // Question difficulties array
    const [questionDifficulties, setQuestionDifficulties] = useState<QuestionDifficulty[]>([]);

    // Timer related state
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const currentQuestion = quiz.questions?.[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === (quiz.questions?.length || 0) - 1;

    // Start quiz attempt and timer when component mounts
    useEffect(() => {
        const startQuiz = async () => {
            if (!user) {
                setErrorMessage("User not authenticated. Please log in again.");
                return;
            }

            try {
                const response = await quizAttemptService.startQuizAttempt(quiz.id, user.id);
                setAttemptId(response.attempt_id);
                setStartTime(new Date());

                // Initialize selectedAnswers array with empty values for each question
                if (quiz.questions) {
                    setSelectedAnswers(new Array(quiz.questions.length).fill(''));

                    // Generate random difficulties for each question
                    const difficulties: QuestionDifficulty[] = quiz.questions.map(() => {
                        const randomNum = Math.floor(Math.random() * 3);
                        return ['EASY', 'MEDIUM', 'HARD'][randomNum] as QuestionDifficulty;
                    });
                    setQuestionDifficulties(difficulties);
                }
            } catch (error) {
                setErrorMessage(`Failed to start quiz: ${error instanceof Error ? error.message : String(error)}`);
            }
        };

        startQuiz();

        // Start the timer
        timerRef.current = setInterval(() => {
            setElapsedTime(prev => prev + 1); // Increment by 1 second each time
        }, 1000);

        // Clean up timer on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [quiz.id, user]);

    useEffect(() => {
        // Reset current question state when changing questions
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
    }, [currentQuestionIndex]);

    const handleOptionSelect = (optionId: number, optionIndex: number) => {
        if (!isAnswerSubmitted) {
            setSelectedOptionId(optionId);

            // Update selected answers with letter (A, B, C, D, etc.)
            const optionLetter = String.fromCharCode(65 + optionIndex); // 0 -> A, 1 -> B, etc.
            const newSelectedAnswers = [...selectedAnswers];
            newSelectedAnswers[currentQuestionIndex] = optionLetter;
            setSelectedAnswers(newSelectedAnswers);
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedOptionId !== null && currentQuestion) {
            setIsAnswerSubmitted(true);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const confirmSubmitQuiz = () => {
        setShowConfirmation(true);
    };

    const handleFinishQuiz = async () => {
        if (!user || !attemptId || !startTime) return;

        setShowConfirmation(false);

        try {
            // Calculate time spent
            const timeSpentSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);

            // Stop the timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            // Submit quiz attempt
            const results = await quizAttemptService.submitQuizAttempt(
                quiz.id,
                user.id,
                timeSpentSeconds,
                selectedAnswers
            );

            setQuizResults(results);
        } catch (error) {
            setErrorMessage(`Failed to submit quiz: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const handleRestartQuiz = async () => {
        if (!user) return;

        try {
            // Reset all state
            setCurrentQuestionIndex(0);
            setSelectedOptionId(null);
            setIsAnswerSubmitted(false);
            setQuizResults(null);

            // Start a new attempt
            const response = await quizAttemptService.startQuizAttempt(quiz.id, user.id);
            setAttemptId(response.attempt_id);
            setStartTime(new Date());
            setElapsedTime(0);

            // Reset selected answers
            if (quiz.questions) {
                setSelectedAnswers(new Array(quiz.questions.length).fill(''));

                // Generate new random difficulties
                const difficulties: QuestionDifficulty[] = quiz.questions.map(() => {
                    const randomNum = Math.floor(Math.random() * 3);
                    return ['EASY', 'MEDIUM', 'HARD'][randomNum] as QuestionDifficulty;
                });
                setQuestionDifficulties(difficulties);
            }

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } catch (error) {
            setErrorMessage(`Failed to restart quiz: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    // Format seconds to mm:ss
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (difficulty: QuestionDifficulty): string => {
        switch(difficulty) {
            case 'EASY':
                return 'bg-green-100 text-green-800';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800';
            case 'HARD':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!quiz.questions || quiz.questions.length === 0) {
        return (
            <Card className="p-6">
                <Alert variant="info">This quiz doesn&#39;t have any questions.</Alert>
            </Card>
        );
    }

    if (errorMessage) {
        return (
            <Card className="p-6">
                <Alert variant="error">
                    {errorMessage}
                </Alert>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                </Button>
            </Card>
        );
    }

    if (quizResults) {
        return (
            <Card className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>

                <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-blue-600 mb-3">{Math.round(quizResults.score)}%</div>
                    <p className="text-gray-600">
                        You answered {quizResults.correct_answers} out of {quizResults.total_questions} questions
                        correctly
                    </p>
                    <p className="text-gray-500 mt-2">
                        Time taken: {formatTime(quizResults.time_spent_seconds)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{quizResults.correct_answers}</div>
                        <p className="text-green-800">Correct</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div
                            className="text-2xl font-bold text-red-600">{quizResults.total_questions - quizResults.correct_answers}</div>
                        <p className="text-red-800">Incorrect</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button onClick={handleRestartQuiz} className="w-full">
                        Retake Quiz
                    </Button>

                    <Button
                        href={`/dashboard/quizzes`}
                        variant="outline"
                        className="w-full"
                    >
                        Back to Quizzes
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <>
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </h2>

                    <div className="flex items-center space-x-4">
                        {questionDifficulties.length > 0 && (
                            <div>
                                <Tooltip content={`Question difficulty: ${questionDifficulties[currentQuestionIndex]}`}>
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(questionDifficulties[currentQuestionIndex])}`}>
                                        {questionDifficulties[currentQuestionIndex]}
                                    </span>
                                </Tooltip>
                            </div>
                        )}

                        <div className="flex items-center">
                            <Tooltip content="Time elapsed since starting the quiz">
                                <div
                                    className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {formatTime(elapsedTime)}
                                </div>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip content="Questions answered">
                                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                    {selectedAnswers.filter(a => a !== '').length}/{quiz.questions.length}
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">{currentQuestion?.question_text}</h3>

                    <div className="space-y-3">
                        {currentQuestion?.options.map((option, idx) => {
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
                                    onClick={() => handleOptionSelect(option.id, idx)}
                                >
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
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
                        <Button onClick={confirmSubmitQuiz}>
                            Finish Quiz
                        </Button>
                    ) : (
                        <Button onClick={handleNextQuestion}>
                            Next Question
                        </Button>
                    )}

                    {!isAnswerSubmitted && (
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                disabled={currentQuestionIndex === quiz.questions.length - 1}
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            >
                                Skip
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            {/* Question navigation panel */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex flex-wrap gap-2 justify-center">
                    {quiz.questions.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => !isAnswerSubmitted && setCurrentQuestionIndex(idx)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full ${
                                idx === currentQuestionIndex
                                    ? 'bg-blue-600 text-white'
                                    : selectedAnswers[idx]
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                            } hover:opacity-80 transition-opacity`}
                            disabled={isAnswerSubmitted}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                title="Submit Quiz"
            >
                <div className="p-4">
                    <p className="mb-4">Are you sure you want to submit your quiz?</p>
                    <p className="mb-4 text-gray-600">You&#39;ve answered {selectedAnswers.filter(a => a !== '').length} out of {quiz.questions.length} questions.</p>
                    <p className="mb-6 text-gray-600">Time elapsed: {formatTime(elapsedTime)}</p>

                    <div className="flex space-x-4">
                        <Button onClick={handleFinishQuiz} className="w-full">
                            Yes, Submit Quiz
                        </Button>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)} className="w-full">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};