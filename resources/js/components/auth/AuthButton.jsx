import { forwardRef } from 'react';
import { Link } from '@inertiajs/react';

/**
 * AuthButton — Reusable button with multiple variants matching the glass/rounded UI aesthetic.
 *
 * Props:
 *   variant: 'primary' | 'secondary' | 'outline' | 'gradient' | 'white' | 'text'
 *   size: 'sm' | 'md' | 'lg'
 *   isLoading: boolean
 *   fullWidth: boolean
 */
const AuthButton = forwardRef(({
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

    // Variant mapping to static Tailwind styles matching Landing Page
    const variantStyles = {
        primary: `
            bg-gray-900 text-white shadow-xl shadow-gray-900/20 hover:bg-indigo-600 hover:shadow-indigo-500/30
            focus:ring-gray-900
        `,
        secondary: `
            bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100
            focus:ring-indigo-600
        `,
        gradient: `
            bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:to-purple-700
            focus:ring-purple-500
        `,
        outline: `
            border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 hover:border-gray-300
            focus:ring-gray-200
        `,
        white: `
            bg-white text-gray-900 shadow-sm border border-gray-100 hover:shadow-md hover:bg-gray-50
            focus:ring-gray-200
        `,
        text: `
            bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900
            active:scale-100 hover:translate-y-0 focus:ring-gray-200
        `
    };



    const widthStyle = fullWidth ? 'w-full' : '';

    // If href is passed, render an Inertia Link instead of a generic button
    const Component = props.href ? Link : 'button';

    return (
        <Component
            ref={ref}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
            {...props}
        >
            {isLoading ? (
                <svg className="w-5 h-5 mr-3 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </Component>
    );
});

AuthButton.displayName = 'AuthButton';
export default AuthButton;
