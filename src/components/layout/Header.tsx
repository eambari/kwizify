'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '../ui/Button';
import {KwizifyLogo} from "@/content/KwizifyLogo";

export const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const navigationItems = isLoggedIn
        ? [
            { name: 'Dashboard', href: '/dashboard', exact: true },
            { name: 'Create Quiz', href: '/dashboard/create', exact: false },
            { name: 'My Quizzes', href: '/dashboard/quizzes', exact: false },
        ]
        : [
            { name: 'Home', href: '/', hash: '' },
            { name: 'How It Works', href: '/#how-it-works', hash: '#how-it-works' },
            { name: 'Why Kwizify', href: '/#why-kwizify', hash: '#why-kwizify' },
        ];

    useEffect(() => {
        const handleHashChange = () => {
            setActiveHash(window.location.hash);
        };

        if (pathname === '/') {
            setActiveHash(window.location.hash);
        }

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isLinkActive = (item: { href: string; hash?: string; exact?: boolean }): boolean => {
        if (item.exact !== undefined) {
            if (item.href === '/dashboard' && item.exact) {
                return pathname === '/dashboard';
            }

            if (!item.exact && pathname.startsWith(item.href) && item.href !== '/') {
                return true;
            }

            return false;
        }

        if (item.href === '/' && !item.hash && pathname === '/') {
            return activeHash === '';
        }

        if (item.hash && pathname === '/') {
            return activeHash === item.hash;
        }

        return false;
    };

    return (
        <>
            <div className="h-16"></div>

            <header className={`fixed top-0 left-0 right-0 z-50 bg-white ${
                scrolled ? 'shadow-md' : 'shadow-sm'
            } transition-shadow duration-300`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/" aria-label="Kwizify Home">
                                    <span className="text-2xl font-bold text-blue-600"><KwizifyLogo/></span>
                                </Link>
                            </div>

                            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigationItems.map((item) => {
                                    const active = isLinkActive(item);

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                                active
                                                    ? 'border-blue-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                            {isLoggedIn ? (
                                <>
                  <span className="text-sm text-gray-700">
                    Hello, <span className="font-semibold">{user?.username}</span>
                  </span>
                                    <Button
                                        variant="outline"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        href="/login"
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        href="/signup"
                                    >
                                        Join Us
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 pt-2 pb-3">
                            {navigationItems.map((item) => {
                                const active = isLinkActive(item);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                                            active
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}

                            <div className="border-t border-gray-200 pt-4 pb-3">
                                {isLoggedIn ? (
                                    <div className="space-y-2 px-4">
                                        <div className="text-base font-medium text-gray-800">
                                            {user?.username}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {user?.email}
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block w-full rounded-md bg-gray-100 px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2 px-4">
                                        <Link
                                            href="/login"
                                            className="block w-full rounded-md bg-gray-100 px-4 py-2 text-center text-base font-medium text-gray-700 hover:bg-gray-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Join Us
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};