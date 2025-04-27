'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    isLoading?: boolean;
    href?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  className = '',
                                                  type = 'button',
                                                  variant = 'primary',
                                                  size = 'md',
                                                  disabled = false,
                                                  isLoading = false,
                                                  href,
                                              }) => {
    const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeStyles = {
        sm: 'py-1.5 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-2.5 px-5 text-lg',
    };

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {isLoading ? (
                    <span className="inline-block mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                ) : null}
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedStyles}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <span className="inline-block mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
            ) : null}
            {children}
        </button>
    );
};