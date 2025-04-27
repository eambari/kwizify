'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Loader } from '@/components/ui/Loader';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isLoggedIn, isLoading, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
};