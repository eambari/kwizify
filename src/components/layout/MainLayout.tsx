import React, { ReactNode, CSSProperties } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

interface MainLayoutProps {
    children: ReactNode
    hideFooter?: boolean
}

export const MainLayout: React.FC<MainLayoutProps> = ({
                                                          children,
                                                          hideFooter = false,
                                                      }) => {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                < SiteHeader/>
                <div className="flex flex-1 flex-col pt-16">
                    {/* offset for fixed header */}
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                            {children}
                        </div>
                    </div>
                </div>
                {/* { !hideFooter && <Footer /> } */}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout
