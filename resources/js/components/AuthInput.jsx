import { forwardRef } from 'react';

/**
 * AuthInput — A rounded text input with error state and focus transitions.
 * 
 * Props:
 *   label: string
 *   error: string (displays error styling and message)
 *   icon: ReactNode (left icon)
 */
const AuthInput = forwardRef(({
    label,
    error,
    icon,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    className={`
                        w-full px-5 py-3.5 bg-gray-50 border rounded-2xl text-gray-800 text-sm font-medium
                        transition-all duration-200 focus:outline-none focus:bg-white focus:ring-4 focus:ring-opacity-20
                        placeholder-gray-400
                        ${icon ? 'pl-11' : ''}
                        ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-transparent focus:border-indigo-600 focus:ring-indigo-600 hover:bg-gray-100'}
                    `}
                    {...props}
                />
            </div>

            {error && (
                <span className="text-xs font-medium text-red-500 ml-2 animate-in slide-in-from-top-1 fade-in">
                    {error}
                </span>
            )}
        </div>
    );
});

AuthInput.displayName = 'AuthInput';
export default AuthInput;
