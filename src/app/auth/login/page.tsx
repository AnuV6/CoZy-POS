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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--figma-bg)] font-[var(--figma-font)]">
            {/* COSYPOS Logo */}
            <h1
                className="text-center mb-12"
                style={{
                    color: 'var(--figma-pink)',
                    fontSize: '55px',
                    fontWeight: 600,
                    lineHeight: '82px',
                    letterSpacing: '0.05em'
                }}
            >
                COSYPOS
            </h1>

            {/* Login Card */}
            <div className="figma-card w-[580px] flex flex-col items-center">
                {/* Title */}
                <h2
                    className="text-center mb-2"
                    style={{
                        color: 'var(--figma-white)',
                        fontSize: '45px',
                        fontWeight: 500,
                        lineHeight: '68px'
                    }}
                >
                    Login!
                </h2>
                {/* Subtitle */}
                <p
                    className="text-center mb-10"
                    style={{
                        color: 'var(--figma-white)',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        maxWidth: '380px'
                    }}
                >
                    Please enter your credentials below to continue
                </p>

                {/* Error Message */}
                {error && (
                    <div
                        className="w-full text-center mb-6 p-3 rounded-xl"
                        style={{
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            border: '1px solid rgba(255, 107, 107, 0.3)',
                            color: '#ff6b6b'
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    {/* Username Field */}
                    <div className="mb-8">
                        <label className="block mb-3" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-8">
                        <label className="block mb-3" htmlFor="password">
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
                                className="w-full outline-none pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                style={{ color: '#A7A7A7' }}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between mb-10">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="figma-checkbox" />
                            <span style={{ color: 'var(--figma-pink)', fontSize: '18px', fontWeight: 400 }}>
                                Remember me
                            </span>
                        </label>
                        <Link
                            href="/auth/forgot-password"
                            style={{ color: 'var(--figma-pink)', fontSize: '18px', fontWeight: 400, textDecoration: 'underline' }}
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{ width: '143px', height: '64px' }}
                        >
                            {isLoading ? (
                                <div
                                    className="w-5 h-5 border-2 rounded-full animate-spin"
                                    style={{ borderColor: '#33333330', borderTopColor: '#333333' }}
                                />
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
