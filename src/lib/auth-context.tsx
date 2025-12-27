'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if user is logged in from localStorage
        const loggedIn = localStorage.getItem('pos_authenticated') === 'true';
        setIsAuthenticated(loggedIn);
        setIsLoading(false);

        // Redirect logic
        if (!loggedIn && !pathname.startsWith('/auth')) {
            router.push('/auth/login');
        } else if (loggedIn && pathname.startsWith('/auth')) {
            router.push('/');
        }
    }, [pathname, router]);

    const login = (username: string, password: string): boolean => {
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('pos_authenticated', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('pos_authenticated');
        setIsAuthenticated(false);
        router.push('/auth/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
