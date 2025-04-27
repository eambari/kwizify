'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', fullWidth = true, ...props }, ref) => {
        return (
            <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block rounded-md sm:text-sm focus:ring-1 ${
                        error ? 'border-red-500' : ''
                    } ${fullWidth ? 'w-full' : ''} ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';