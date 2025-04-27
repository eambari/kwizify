export interface User {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
    created_at: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    creator_id: number;
    created_at: string;
    question_count?: number;
    questions?: Question[];
}

export interface Question {
    id: number;
    question_text: string;
    options: QuestionOption[];
}

export interface QuestionOption {
    id: number;
    text: string;
    is_correct: boolean;
}

export interface GeneratedQuestion {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface KeywordResponse {
    keywords: string[];
    questions: GeneratedQuestion[];
}

export interface SaveQuizRequest {
    quiz_title: string;
    quiz_description: string;
    user_id: number;
    questions: GeneratedQuestion[];
}

export interface ApiError {
    status: number;
    message: string;
}