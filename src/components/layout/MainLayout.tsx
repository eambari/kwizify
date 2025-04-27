import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    hideFooter?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
                                                          children,
                                                          hideFooter = false
                                                      }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            {!hideFooter && <Footer />}
        </div>
    );
};