import { forwardRef } from 'react';

/**
 * ThemedButton — Reusable button with multiple variants matching the glass/rounded UI aesthetic.
 *
 * Props:
 *   variant: 'primary' | 'secondary' | 'outline' | 'gradient' | 'white' | 'text'
 *   size: 'sm' | 'md' | 'lg'
 *   isLoading: boolean
 *   fullWidth: boolean
 */
const ThemedButton = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}, ref) => {
    // Base styles: perfectly rounded, flex centered, transition ring
    const baseStyles = `
        inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 
        rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98] hover:-translate-y-0.5
    `;

    // Size variations
    const sizeStyles = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-md',
    };

    // Variant mapping to --od CSS variables
    const variantStyles = {
        primary: `
            text-white shadow-md hover:shadow-lg
            focus:ring-[var(--od-primary)]
        `,
        secondary: `
            text-white shadow-sm hover:shadow-md
            focus:ring-[var(--od-dark-secondary)]
        `,
        gradient: `
            text-white shadow-md hover:shadow-lg
            focus:ring-[var(--od-primary)]
        `,
        outline: `
            border-2 bg-transparent hover:bg-gray-50
            focus:ring-[var(--od-primary)]
        `,
        white: `
            bg-white text-[var(--od-primary-dark)] shadow-sm border border-gray-100
            hover:shadow-md hover:bg-gray-50
            focus:ring-gray-200
        `,
        text: `
            bg-transparent text-[var(--od-primary)] hover:bg-[var(--od-primary)]/10
            active:scale-100 hover:translate-y-0 focus:ring-[var(--od-primary)]/50
        `
    };

    // Calculate dynamic styles that require CSS custom properties
    const dynamicStyle = (() => {
        switch (variant) {
            case 'primary': return { background: 'var(--od-primary)' };
            case 'secondary': return { background: 'var(--od-dark-secondary)' };
            case 'gradient': return { background: 'var(--od-brand-gradient)' };
            case 'outline': return { borderColor: 'var(--od-primary)', color: 'var(--od-primary)' };
            default: return {};
        }
    })();

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
            style={dynamicStyle}
            {...props}
        >
            {isLoading ? (
                <svg className="w-5 h-5 mr-3 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
});

ThemedButton.displayName = 'ThemedButton';
export default ThemedButton;
