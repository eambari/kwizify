// src/services/quizAttemptService.ts
import { fetchApi } from '@/utils/api';
import {toast} from "sonner";

// Quiz attempt service for handling quiz attempts and submissions
const quizAttemptService = {
    // Start a new quiz attempt
    startQuizAttempt: async (quizId: number, userId: number): Promise<{ attempt_id: number, started_at: string }> => {
        try {
            const response = await fetchApi<{ attempt_id: number, started_at: string }>(
                `/api/quiz/quiz-attempts/start?quiz_id=${quizId}&user_id=${userId}`,
                {
                    method: 'POST',
                }
            );

            return response;
        } catch (error) {
            console.error('Error starting quiz attempt:', error);
            throw error;
        }
    },

    // Submit a quiz attempt
    submitQuizAttempt: async (
        quizId: number,
        userId: number,
        timeSpentSeconds: number,
        selectedOptions: string[] // Array of letters: ["A", "B", "C", etc.]
    ): Promise<{
        attempt_id: number,
        score: number,
        correct_answers: number,
        total_questions: number,
        time_spent_seconds: number
    }> => {
        try {
            const queryParams = new URLSearchParams({
                quiz_id: quizId.toString(),
                user_id: userId.toString(),
                time_spent_seconds: timeSpentSeconds.toString()
            });

            const response = await fetchApi<{
                attempt_id: number,
                score: number,
                correct_answers: number,
                total_questions: number,
                time_spent_seconds: number
            }>(
                `/api/quiz/quiz-attempts/submit?${queryParams}`,
                {
                    method: 'POST',
                    body: JSON.stringify(selectedOptions),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Quiz submitted successfully.', {
                richColors: true,
            });
            return response;
        } catch (error) {
            toast.error('Error submitting quiz attempt :(', {
                richColors: true,
            });
            console.error('Error submitting quiz attempt:', error);
            throw error;
        }
    },

    // Get all quiz attempts for a user
    getUserQuizAttempts: async (userId: number): Promise<Array<{
        attempt_id: number,
        quiz_id: number,
        quiz_title: string,
        started_at: string,
        completed_at: string | null,
        time_spent_seconds: number | null,
        score: number | null
    }>> => {
        try {
            const response = await fetchApi<Array<{
                attempt_id: number,
                quiz_id: number,
                quiz_title: string,
                started_at: string,
                completed_at: string | null,
                time_spent_seconds: number | null,
                score: number | null
            }>>(
                `/api/quiz/quiz-attempts/user/${userId}`,
                {
                    method: 'GET',
                }
            );

            return response;
        } catch (error) {
            console.error('Error fetching user quiz attempts:', error);
            throw error;
        }
    },

    // Get detailed information about a quiz attempt
    getQuizAttemptDetails: async (attemptId: number): Promise<{
        attempt_id: number,
        quiz_id: number,
        quiz_title: string,
        user_id: number,
        started_at: string,
        completed_at: string | null,
        time_spent_seconds: number | null,
        score: number | null,
        answers: Array<{
            question_id: number,
            question_text: string,
            selected_option_id: number | null,
            selected_option_letter: string | null,
            correct_option_letter: string | null,
            is_correct: boolean,
            options: Array<{
                id: number,
                text: string,
                is_correct: boolean
            }>
        }>
    }> => {
        try {
            const response = await fetchApi<{
                attempt_id: number,
                quiz_id: number,
                quiz_title: string,
                user_id: number,
                started_at: string,
                completed_at: string | null,
                time_spent_seconds: number | null,
                score: number | null,
                answers: Array<{
                    question_id: number,
                    question_text: string,
                    selected_option_id: number | null,
                    selected_option_letter: string | null,
                    correct_option_letter: string | null,
                    is_correct: boolean,
                    options: Array<{
                        id: number,
                        text: string,
                        is_correct: boolean
                    }>
                }>
            }>(
                `/api/quiz/quiz-attempts/${attemptId}`,
                {
                    method: 'GET',
                }
            );

            return response;
        } catch (error) {
            console.error('Error fetching quiz attempt details:', error);
            throw error;
        }
    }
};

export default quizAttemptService;