"use client";

import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

// Make this a client component so Sidebar (client) works correctly and
// use responsive CSS to push main content to the right of the fixed sidebar.
export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen" style={{ background: 'var(--figma-bg)' }}>
            <Sidebar />
            {/*
              Use Tailwind responsive margin: no left margin on small screens,
              apply left margin equal to sidebar width on md and up.
            */}
            <main className="min-h-screen p-8 relative md:ml-[140px]">
                {children}
            </main>
        </div>
    );
}
