'use client'

import Link from 'next/link';
import {MainLayout} from '@/components/layout/MainLayout';
import {useAuth} from "@/providers/AuthProvider";

export default function Home() {
    const {isLoggedIn} = useAuth();

    return (
        <MainLayout>
            <section className="bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight lg:text-6xl">
                            <span className="block text-blue-600">Kwizify</span>
                            <span className="block">AI-Powered Quiz Generator</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Transform any document into engaging quizzes in seconds.
                            Upload your content and let our AI generate meaningful questions instantly.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            {!isLoggedIn && (
                                <>
                                    <Link
                                        href="/signup"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg shadow-sm"
                                    >
                                        Join Us
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:text-lg shadow-sm"
                                    >
                                        Log In
                                    </Link>
                                </>)}
                        </div>
                    </div>
                </div>
            </section>

            <section id="why-kwizify" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Why Kwizify?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            The ultimate study companion for efficient and effective learning
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        <div
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div
                                className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Time-Saving</h3>
                            <p className="mt-2 text-gray-600">
                                Create comprehensive quizzes in seconds, not hours. Our AI technology automates the most
                                time-consuming part of quiz creation.
                            </p>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div
                                className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Personalized Learning</h3>
                            <p className="mt-2 text-gray-600">
                                Generate quizzes from your own study materials for truly personalized learning that
                                focuses on what you need to know.
                            </p>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div
                                className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Cross-Device Access</h3>
                            <p className="mt-2 text-gray-600">
                                Access your quizzes anytime, anywhere, and on any device. Study on your terms with our
                                responsive web platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Creating quizzes with Kwizify is simple and fast
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="relative">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="relative">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                                        1
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Upload Document</h3>
                                    <p className="mt-2 text-gray-600">
                                        Upload your PDF, DOC, or TXT file containing your study material.
                                    </p>
                                </div>

                                <div className="relative">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                                        2
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">AI Processing</h3>
                                    <p className="mt-2 text-gray-600">
                                        Our NLP and AI system extracts key concepts and generates relevant
                                        multiple-choice questions.
                                    </p>
                                </div>

                                <div className="relative">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                                        3
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Take Your Quiz</h3>
                                    <p className="mt-2 text-gray-600">
                                        Review the generated questions, make any adjustments, and start your quiz.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-blue-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to create your first quiz?
                    </h2>
                    <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
                        Join thousands of students and educators who use Kwizify to enhance their learning experience.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg shadow-sm"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}