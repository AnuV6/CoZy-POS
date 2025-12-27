'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitted(true);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--figma-bg)] font-[var(--figma-font)]">
            {/* Logo */}
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

            {/* Forgot Password Card */}
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
                    Forgot your password?
                </h2>
                {/* Subtitle */}
                <p
                    className="text-center mb-10"
                    style={{
                        color: 'var(--figma-white)',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        maxWidth: '360px'
                    }}
                >
                    Please enter your username or email to recover your password
                </p>

                {submitted ? (
                    <div className="text-center">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ backgroundColor: 'var(--figma-pink)' }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p style={{ color: 'var(--figma-white)', fontSize: '18px', marginBottom: '30px' }}>
                            Password reset instructions have been sent to your email.
                        </p>
                        <Link
                            href="/auth/login"
                            className="inline-block transition-transform hover:scale-105 active:scale-95"
                            style={{
                                color: 'var(--figma-pink)',
                                fontSize: '16px',
                                fontWeight: 400,
                                textDecoration: 'underline'
                            }}
                        >
                            Back to Login!
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="w-full">
                            {/* Username Field */}
                            <div className="mb-10">
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

                            {/* Submit Button */}
                            <div className="flex justify-center mb-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{ width: '197px', height: '64px' }}
                                >
                                    {isLoading ? (
                                        <div
                                            className="w-5 h-5 border-2 rounded-full animate-spin"
                                            style={{ borderColor: '#33333330', borderTopColor: '#333333' }}
                                        />
                                    ) : (
                                        'Submit Now'
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Back to Login Link */}
                        <div className="text-center mt-8">
                            <Link
                                href="/auth/login"
                                className="transition-colors hover:opacity-80"
                                style={{
                                    color: 'var(--figma-white)',
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    lineHeight: '24px'
                                }}
                            >
                                Back to Login!
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
