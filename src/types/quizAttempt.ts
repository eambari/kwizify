// src/types/quizAttempt.ts
export interface QuizAttempt {
    attempt_id: number;
    quiz_id: number;
    quiz_title: string;
    user_id?: number;
    started_at: string;
    completed_at: string | null;
    time_spent_seconds: number | null;
    score: number | null;
}

export interface QuizAttemptDetail extends QuizAttempt {
    answers: QuestionAnswer[];
}

export interface QuestionAnswer {
    question_id: number;
    question_text: string;
    selected_option_id: number | null;
    selected_option_letter: string | null;
    correct_option_letter: string | null;
    is_correct: boolean;
    options: {
        id: number;
        text: string;
        is_correct: boolean;
    }[];
}

export interface QuizAttemptResults {
    attempt_id: number;
    score: number;
    correct_answers: number;
    total_questions: number;
    time_spent_seconds: number;
}

export interface QuizAttemptStart {
    attempt_id: number;
    started_at: string;
}