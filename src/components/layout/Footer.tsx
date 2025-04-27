import React from 'react';
import Link from 'next/link';
import {KwizifyLogo} from "@/content/KwizifyLogo";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            <KwizifyLogo/>
                        </Link>
                        <p className="text-base text-gray-500">
                            Create engaging quizzes from any document in seconds using AI.
                        </p>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="space-x-6 flex">
                            <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} Kwizify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};