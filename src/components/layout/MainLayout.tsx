"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Header for Sidebar Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-card)] z-30 flex items-center px-4 shadow-sm">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-card-hover)] rounded-full transition-colors"
                >
                    <Menu size={24} />
                </button>
                <span className="ml-4 text-[var(--color-primary)] font-semibold text-[20px]">COSYPOS</span>
            </div>

            {/* 
              Use Tailwind responsive margin: no left margin on small screens (pt-16 for header).
              apply left margin equal to sidebar width on md and up.
            */}
            <main className="min-h-screen p-4 md:p-8 pt-20 md:pt-8 relative md:ml-[140px]">
                {children}
            </main>
        </div>
    );
}
