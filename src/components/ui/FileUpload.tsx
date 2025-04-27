'use client';

import React, { useState, useRef } from 'react';
import { Button } from './Button';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    label?: string;
    error?: string;
    className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
                                                          onFileSelect,
                                                          accept = '.pdf,.txt,.doc,.docx',
                                                          label = 'Upload File',
                                                          error,
                                                          className = '',
                                                      }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];

            if (accept.includes(file.type) || accept.includes(`.${file.name.split('.').pop()}`)) {
                setSelectedFile(file);
                onFileSelect(file);
            }
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChangeFile: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } ${error ? 'border-red-500' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />
                {selectedFile ? (
                    <div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={handleChangeFile}
                        >
                            Change File
                        </Button>
                    </div>
                ) : (
                    <div>
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                            Drag and drop a file here, or click to select a file
                        </p>
                        <p className="text-xs text-gray-500">
                            {accept.replace(/\./g, '').toUpperCase().split(',').join(', ')} files up to 10MB
                        </p>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};