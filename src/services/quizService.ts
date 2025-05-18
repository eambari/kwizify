import {fetchApi, uploadFile} from '@/utils/api';
import {
    Quiz,
    KeywordResponse,
    GeneratedQuestion,
    SaveQuizRequest
} from '@/types';
import {toast} from "sonner";

const quizService = {
    extractKeywords: async (file: File): Promise<KeywordResponse> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadFile<KeywordResponse>(
                '/api/keywords/extract-keywords/',
                formData
            );

            return response;
        } catch (error) {
            throw error;
        }
    },

    generateQuestions: async (keywords: string[]): Promise<GeneratedQuestion[]> => {
        try {
            const formData = new FormData();
            keywords.forEach(keyword => {
                formData.append('keywords', keyword);
            });

            const response = await uploadFile<GeneratedQuestion[]>(
                '/api/questions/generate-questions/',
                formData
            );

            return response;
        } catch (error) {
            throw error;
        }
    },

    saveQuiz: async (quizData: SaveQuizRequest): Promise<{ quiz_id: number }> => {
        try {
            console.log('Sending quiz data:', JSON.stringify(quizData, null, 2));

            const {quiz_title, quiz_description, user_id, questions} = quizData;

            const url = `/api/keywords/save-quiz/?quiz_title=${encodeURIComponent(quiz_title)}&quiz_description=${encodeURIComponent(quiz_description)}&user_id=${user_id}`;

            const response = await fetchApi<{ quiz_id: number }>(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify(questions),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Quiz Saved Successfully!', {
                description: 'Happy learning! 🎉',
                richColors: true,
            });

            return response;
        } catch (error) {
            console.error('Error saving quiz:', error);
            throw error;
        }
    },

    getQuiz: async (quizId: number): Promise<Quiz> => {
        try {
            const response = await fetchApi<Quiz>(
                `/api/questions/quiz/${quizId}`,
                {
                    method: 'GET',
                }
            );

            return response;
        } catch (error) {
            throw error;
        }
    },

    getUserQuizzes: async (userId: number): Promise<Quiz[]> => {
        try {
            const response = await fetchApi<Quiz[]>(
                `/api/questions/user/${userId}/quizzes`,
                {
                    method: 'GET',
                }
            );

            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default quizService;