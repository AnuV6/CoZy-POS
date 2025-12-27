'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const success = login(username, password);
        if (!success) {
            setError('Invalid credentials. Use admin/admin');
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] font-[family-name:var(--font-sans)]">
            {/* COSYPOS Logo */}
            <h1 className="text-center mb-12 text-[var(--color-primary)] text-[55px] font-semibold leading-[82px] tracking-[0.05em]">
                COSYPOS
            </h1>

            {/* Login Card */}
            <div className="bg-[var(--color-card)] rounded-[50px] p-[45px_80px_50px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] w-[580px] flex flex-col items-center">
                {/* Title */}
                <h2 className="text-center mb-2 text-[var(--color-foreground)] text-[45px] font-medium leading-[68px]">
                    Login!
                </h2>
                {/* Subtitle */}
                <p className="text-center mb-10 text-[var(--color-foreground)] text-[16px] font-normal leading-[24px] max-w-[380px]">
                    Please enter your credentials below to continue
                </p>

                {/* Error Message */}
                {error && (
                    <div className="w-full text-center mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    {/* Username Field */}
                    <div className="mb-8">
                        <label className="block mb-3 text-[var(--color-foreground)] font-[family-name:var(--font-sans)] text-[16px] font-medium" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full outline-none bg-[var(--color-card-hover)] rounded-[10px] border-none text-[var(--color-foreground)] font-[family-name:var(--font-sans)] text-[18px] font-light p-[16px_20px] mb-[18px] placeholder:text-[var(--color-text-muted)] placeholder:opacity-100"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-8">
                        <label className="block mb-3 text-[var(--color-foreground)] font-[family-name:var(--font-sans)] text-[16px] font-medium" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full outline-none bg-[var(--color-card-hover)] rounded-[10px] border-none text-[var(--color-foreground)] font-[family-name:var(--font-sans)] text-[18px] font-light p-[16px_20px] mb-[18px] pr-12 placeholder:text-[var(--color-text-muted)] placeholder:opacity-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[1.6rem] -translate-y-1/2 text-[var(--color-text-muted)]"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between mb-10">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-[var(--color-primary)] border border-[var(--color-primary)] rounded-[2px] w-6 h-6" />
                            <span className="text-[var(--color-primary)] text-[18px] font-normal">
                                Remember me
                            </span>
                        </label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-[var(--color-primary)] text-[18px] font-normal underline decoration-[var(--color-primary)]"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[143px] h-[64px] bg-[var(--color-primary)] text-[var(--color-text-dark)] rounded-[10px] font-[family-name:var(--font-sans)] text-[16px] font-medium border-none cursor-pointer transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-[#33333330] border-t-[#333333] rounded-full animate-spin" />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}
