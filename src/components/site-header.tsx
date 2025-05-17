'use client'

import { usePathname } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "ui/mode-toggle"
import { ThemeSelector } from "components/theme-selector"
import { useMemo } from "react"
import {NavUser} from "components/nav-user";
import * as React from "react";
import {useAuth} from "@/providers/AuthProvider";

function getPageTitle(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) return 'Home'

    const lastSegment = segments[segments.length - 1]

    return lastSegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}

export function SiteHeader() {
    const pathname = usePathname()
    const pageTitle = useMemo(() => getPageTitle(pathname), [pathname])

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">{pageTitle}</h1>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeSelector />
                    <ModeToggle />
                    <NavUser />
                </div>
            </div>
        </header>
    )
}
