'use client';

import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="flex items-center justify-between mb-6">
            {/* Page Title */}
            <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                {subtitle && (
                    <p className="text-[#abbbc2] text-sm mt-0.5">{subtitle}</p>
                )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-56 h-10 pl-10 pr-4 rounded-xl bg-[#252836] border border-[#393c49] text-white placeholder:text-[#6b7280] focus:outline-none focus:border-[#ff7ca3] transition-colors text-sm"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-xl bg-[#252836] border border-[#393c49] flex items-center justify-center text-[#abbbc2] hover:text-white hover:border-[#ff7ca3] transition-all">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff7ca3] text-white text-[10px] flex items-center justify-center font-medium">
                        3
                    </span>
                </button>

                {/* User Profile */}
                <button className="flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-xl bg-[#252836] border border-[#393c49] hover:border-[#ff7ca3] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff7ca3] to-[#9b51e0] flex items-center justify-center text-white text-xs font-medium">
                        A
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-xs font-medium text-white">Admin</p>
                    </div>
                    <ChevronDown size={14} className="text-[#6b7280]" />
                </button>
            </div>
        </header>
    );
}
