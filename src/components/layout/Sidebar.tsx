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

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Don't render the fixed sidebar on small screens to avoid overlay issues
    if (isMobile) return null;

    return (
        <aside
            className="fixed left-0 top-0 h-screen z-40 py-6 flex flex-col items-center"
            style={{
                width: '140px',
                background: 'var(--figma-card)',
                borderRadius: '0px 30px 30px 0px',
            }}
        >
            {/* Logo */}
            <div className="mb-8 text-center">
                <h1
                    style={{
                        color: 'var(--figma-pink)',
                        fontFamily: 'Poppins',
                        fontSize: '20px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                    }}
                >
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
                            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-[var(--figma-pink)]' : 'hover:bg-[#3D4142]'}`}
                            style={{ width: '100%' }}
                        >
                            <div className={`w-[30px] h-[30px] flex items-center justify-center rounded-full mb-1 ${isActive ? 'bg-white' : 'bg-white'}`}>
                                <Icon size={16} className={isActive ? 'text-[var(--figma-pink)]' : 'text-[#292C2D]'} />
                            </div>
                            <span
                                style={{
                                    fontFamily: 'Poppins',
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    color: isActive ? '#333333' : '#FFFFFF',
                                    textAlign: 'center',
                                }}
                            >
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
                <div className="w-[24px] h-[24px] flex items-center justify-center mb-1 text-[var(--figma-pink)] group-hover:text-white transition-colors">
                    <LogOut size={24} />
                </div>
                <span
                    style={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        textAlign: 'center',
                    }}
                >
                    Logout
                </span>
            </button>
        </aside>
    );
}
