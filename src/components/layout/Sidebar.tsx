"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
    LayoutDashboard,
    UtensilsCrossed,
    ClipboardList,
    Users,
    Package,
    BarChart3,
    CalendarCheck,
    Settings,
    LogOut,
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Staff', href: '/staff', icon: Users },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Order/Table', href: '/orders', icon: ClipboardList },
    { name: 'Reservation', href: '/reservations', icon: CalendarCheck },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 h-screen z-40 py-6 flex flex-col items-center bg-[var(--color-card)] 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0
                    border-r-0 rounded-r-[30px] shadow-xl md:shadow-none
                `}
                style={{ width: '140px' }}
            >
                {/* Logo */}
                <div className="mb-8 text-center">
                    <h1 className="text-[var(--color-primary)] font-[family-name:var(--font-sans)] text-[20px] font-semibold tracking-[0.05em]">
                        COSYPOS
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2 w-full px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => onClose && onClose()} // Close on navigation (mobile)
                                className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-200 w-full ${isActive ? 'bg-[var(--color-primary)]' : 'hover:bg-[var(--color-card-hover)]'
                                    }`}
                            >
                                <div className={`w-[30px] h-[30px] flex items-center justify-center rounded-full mb-1 ${isActive ? 'bg-white' : 'bg-white'
                                    }`}>
                                    <Icon size={16} className={isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-card)]'} />
                                </div>
                                <span className={`font-[family-name:var(--font-sans)] text-[16px] font-normal text-center ${isActive ? 'text-[var(--color-text-dark)]' : 'text-white'
                                    }`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex flex-col items-center justify-center mt-auto mb-4 group"
                >
                    <div className="w-[24px] h-[24px] flex items-center justify-center mb-1 text-[var(--color-primary)] group-hover:text-white transition-colors">
                        <LogOut size={24} />
                    </div>
                    <span className="font-[family-name:var(--font-sans)] text-[16px] font-normal text-white text-center">
                        Logout
                    </span>
                </button>
            </aside>
        </>
    );
}
