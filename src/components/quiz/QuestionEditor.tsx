'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { GeneratedQuestion } from '@/types';

interface QuestionEditorProps {
    questions: GeneratedQuestion[];
    onSaveQuiz: (title: string, description: string) => void;
    onEditQuestion: (index: number, question: GeneratedQuestion) => void;
    isLoading: boolean;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
                                                                  questions,
                                                                  onSaveQuiz,
                                                                  onEditQuestion,
                                                                  isLoading,
                                                              }) => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<GeneratedQuestion | null>(null);

    const activeQuestion = questions[activeQuestionIndex];

    const handleNext = () => {
        if (activeQuestionIndex < questions.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    const handleSave = () => {
        if (!quizTitle.trim()) {
            setError('Please enter a quiz title');
            return;
        }

        if (questions.length === 0) {
            setError('No questions available. Please extract keywords from a document first.');
            return;
        }

        // Validate all questions have a question text and options
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.question || !q.question.trim()) {
                setError(`Question ${i + 1} has empty question text`);
                return;
            }
            if (!q.options || q.options.length < 2) {
                setError(`Question ${i + 1} needs at least 2 options`);
                return;
            }
            if (!q.correct_answer || !q.options.includes(q.correct_answer)) {
                setError(`Question ${i + 1} has an invalid correct answer`);
                return;
            }
        }

        onSaveQuiz(quizTitle, quizDescription);
    };

    const handleEditQuestion = () => {
        setEditingQuestion({ ...activeQuestion });
    };

    const handleUpdateQuestion = () => {
        if (editingQuestion) {
            onEditQuestion(activeQuestionIndex, editingQuestion);
            setEditingQuestion(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingQuestion(null);
    };

    if (questions.length === 0) {
        return (
            <Card className="p-6">
                <Alert variant="info">
                    No questions available. Please extract keywords from a document first.
                </Alert>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>

                <Input
                    label="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter a title for your quiz"
                    required
                />

                <Input
                    label="Quiz Description (Optional)"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Enter a description for your quiz"
                />

                {error && (
                    <Alert variant="error" className="mt-4" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
            </Card>

            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Question {activeQuestionIndex + 1} of {questions.length}
                    </h2>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrevious}
                            disabled={activeQuestionIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNext}
                            disabled={activeQuestionIndex === questions.length - 1}
                        >
                            Next
                        </Button>
                    </div>
                </div>

                {editingQuestion ? (
                    <div className="space-y-4">
                        <Input
                            label="Question"
                            value={editingQuestion.question}
                            onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                        />

                        {editingQuestion.options.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <Input
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...editingQuestion.options];
                                        newOptions[idx] = e.target.value;

                                        let newCorrectAnswer = editingQuestion.correct_answer;
                                        if (option === editingQuestion.correct_answer) {
                                            newCorrectAnswer = e.target.value;
                                        }

                                        setEditingQuestion({
                                            ...editingQuestion,
                                            options: newOptions,
                                            correct_answer: newCorrectAnswer
                                        });
                                    }}
                                    label={`Option ${idx + 1}`}
                                />
                                <div className="flex items-center mt-4">
                                    <input
                                        type="radio"
                                        id={`correct-${idx}`}
                                        name="correct-answer"
                                        checked={option === editingQuestion.correct_answer}
                                        onChange={() => {
                                            setEditingQuestion({ ...editingQuestion, correct_answer: option });
                                        }}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={`correct-${idx}`} className="ml-2 text-sm text-gray-700">
                                        Correct
                                    </label>
                                </div>
                            </div>
                        ))}

                        <div className="flex space-x-2 mt-4">
                            <Button onClick={handleUpdateQuestion}>Save Changes</Button>
                            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-medium mb-4">{activeQuestion.question}</p>

                        <div className="space-y-3">
                            {activeQuestion.options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-md border ${
                                        option === activeQuestion.correct_answer
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                                        <span>{option}</span>
                                        {option === activeQuestion.correct_answer && (
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
                            ))}
                        </div>

                        <Button variant="outline" className="mt-4" onClick={handleEditQuestion}>
                            Edit Question
                        </Button>
                    </div>
                )}
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} isLoading={isLoading} disabled={isLoading}>
                    {isLoading ? 'Saving Quiz...' : 'Save Quiz'}
                </Button>
            </div>
        </div>
    );
};