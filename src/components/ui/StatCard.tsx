'use client';

import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    chart?: ReactNode;
}

export default function StatCard({ title, value, subtitle, icon, trend, chart }: StatCardProps) {
    return (
        <div className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
                        <span>{trend.isPositive ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>

            <div className="mb-2">
                <p className="text-text-secondary text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                {subtitle && (
                    <p className="text-text-muted text-xs mt-1">{subtitle}</p>
                )}
            </div>

            {chart && (
                <div className="mt-4 h-16">
                    {chart}
                </div>
            )}
        </div>
    );
}
