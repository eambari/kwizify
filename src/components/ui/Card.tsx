import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 shadow-md p-4 text-gray-900 ${className} ${onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};