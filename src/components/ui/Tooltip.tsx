'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
                                             children,
                                             content,
                                             position = 'top',
                                             delay = 300,
                                             className = '',
                                         }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            updatePosition();
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };

    const updatePosition = () => {
        if (!targetRef.current || !tooltipRef.current) return;

        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let x = 0;
        let y = 0;

        switch (position) {
            case 'top':
                x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                y = targetRect.top - tooltipRect.height - 8;
                break;
            case 'bottom':
                x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                y = targetRect.bottom + 8;
                break;
            case 'left':
                x = targetRect.left - tooltipRect.width - 8;
                y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                break;
            case 'right':
                x = targetRect.right + 8;
                y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                break;
        }

        // Ensure tooltip stays within viewport
        x = Math.max(10, Math.min(x, window.innerWidth - tooltipRect.width - 10));
        y = Math.max(10, Math.min(y, window.innerHeight - tooltipRect.height - 10));

        setTooltipPosition({ x, y });
    };

    // Update position on resize and scroll
    useEffect(() => {
        if (isVisible) {
            const handleUpdate = () => {
                updatePosition();
            };

            window.addEventListener('resize', handleUpdate);
            window.addEventListener('scroll', handleUpdate);

            return () => {
                window.removeEventListener('resize', handleUpdate);
                window.removeEventListener('scroll', handleUpdate);
            };
        }
    }, [isVisible]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div
                ref={targetRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                className={`inline-block ${className}`}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-lg pointer-events-none opacity-90"
                    style={{
                        top: `${tooltipPosition.y}px`,
                        left: `${tooltipPosition.x}px`,
                        maxWidth: '200px',
                    }}
                >
                    {content}
                    {/* Arrow based on position */}
                    <div
                        className={`absolute w-2 h-2 bg-gray-800 transform ${
                            position === 'top'
                                ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45'
                                : position === 'bottom'
                                    ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45'
                                    : position === 'left'
                                        ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45'
                                        : 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45'
                        }`}
                    />
                </div>
            )}
        </>
    );
};

export default Tooltip;