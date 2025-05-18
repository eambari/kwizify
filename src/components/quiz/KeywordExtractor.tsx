'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import quizService from '@/services/quizService';
import { KeywordResponse } from '@/types';

interface KeywordExtractorProps {
    onExtractComplete: (data: KeywordResponse) => void;
}

export const KeywordExtractor: React.FC<KeywordExtractorProps> = ({ onExtractComplete }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setError(null);
    };

    const handleExtract = async () => {
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await quizService.extractKeywords(file);
            onExtractComplete(response);
        } catch (err) {
            setError(`Error extracting keywords: ${(err as Error).message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
            <p className="mb-4 text-gray-600">
                Upload a PDF or text file to extract keywords and generate quiz questions.
            </p>

            <FileUpload
                onFileSelect={handleFileSelect}
                accept=".pdf,.txt,.doc,.docx"
                label="Upload Document"
            />

            {error && (
                <Alert variant="error" className="mb-4" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <div className="mt-6">
                <Button
                    onClick={handleExtract}
                    disabled={!file || isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Extracting Keywords...' : 'Extract Keywords'}
                </Button>
            </div>

            {isLoading && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">This may take a few seconds...</p>
                    <Loader />
                </div>
            )}
        </Card>
    );
};