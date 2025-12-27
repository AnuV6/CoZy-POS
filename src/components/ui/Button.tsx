import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    children?: ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-primary-hover active:scale-95',
        secondary: 'bg-surface border border-border text-white hover:border-primary hover:bg-surface-hover',
        ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-surface-hover',
        danger: 'bg-danger/10 text-danger hover:bg-danger hover:text-white',
    };

    const sizeStyles = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
}
