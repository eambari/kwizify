import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import {Toaster} from "sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Kwizify - AI-Powered Quiz Generator',
    description: 'Generate quizzes from any document using AI and NLP technology.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="favicon.ico" />
        </head>
        <body className={inter.className}>
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
        </body>
        </html>
    );
}
