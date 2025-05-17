import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import {ThemeProvider} from "@/providers/ThemeProvider";
import {ActiveThemeProvider} from "@/components/active-theme"
import {cookies} from "next/headers";
import {cn} from "lib/utils"
import {Toaster} from "ui/sonner";

export const metadata: Metadata = {
    title: 'Kwizify - AI-Powered Quiz Generator',
    description: 'Generate quizzes from any document using AI and NLP technology.',
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    const cookieStore = await cookies()
    const activeThemeValue = cookieStore.get("active_theme")?.value
    const isScaled = activeThemeValue?.endsWith("-scaled")

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="favicon.ico"/>
        </head>
        <body className={cn(
            "bg-background overscroll-none font-sans antialiased",
            activeThemeValue ? `theme-${activeThemeValue}` : "",
            isScaled ? "theme-scaled" : ""
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ActiveThemeProvider initialTheme={activeThemeValue}>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <Toaster />
            </ActiveThemeProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
