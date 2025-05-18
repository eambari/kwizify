import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
    const sizeStyles = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className={`loader ${sizeStyles[size]}`}></div>
        </div>
    );
};