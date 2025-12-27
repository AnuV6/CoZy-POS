interface BadgeProps {
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    children: React.ReactNode;
    size?: 'sm' | 'md';
}

export default function Badge({ variant = 'default', children, size = 'md' }: BadgeProps) {
    const variantStyles = {
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        danger: 'bg-danger/10 text-danger',
        info: 'bg-info/10 text-info',
        default: 'bg-surface-light text-text-secondary',
    };

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-lg font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
            {children}
        </span>
    );
}
