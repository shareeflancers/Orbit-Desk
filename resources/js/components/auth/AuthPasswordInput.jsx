import { useState, forwardRef } from 'react';
import { IconEye, IconEyeOff, IconCheck, IconX } from '@tabler/icons-react';

/**
 * AuthPasswordInput — Handles password visibility toggle and real-time strength validation.
 */
const AuthPasswordInput = forwardRef(({
    label,
    error,
    id,
    className = '',
    onChange,
    value,
    ...props
}, ref) => {
    const inputId = id || `pwd-${Math.random().toString(36).substring(2, 9)}`;
    const [showPassword, setShowPassword] = useState(false);

    // Calculate strength locally based on value prop if available
    const pwdValue = value || '';

    const rules = [
        { label: 'Minimum 8 characters', valid: pwdValue.length >= 8 },
        { label: 'At least one number', valid: /\d/.test(pwdValue) },
        { label: 'At least one letter', valid: /[a-zA-Z]/.test(pwdValue) },
        { label: 'At least one special character', valid: /[^a-zA-Z0-9]/.test(pwdValue) },
    ];

    const hasValue = pwdValue.length > 0;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    ref={ref}
                    id={inputId}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full px-5 py-3.5 pr-12 bg-gray-50 border rounded-2xl text-gray-800 text-sm font-medium
                        transition-all duration-200 focus:outline-none focus:bg-white focus:ring-4 focus:ring-opacity-20
                        placeholder-gray-400
                        ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-transparent focus:border-indigo-600 focus:ring-indigo-600 hover:bg-gray-100'}
                    `}
                    {...props}
                />

                {/* Visibility Toggle */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-indigo-600"
                    tabIndex={-1}
                >
                    {showPassword ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}
                </button>
            </div>

            {/* Error Message */}
            {error && !hasValue && (
                <span className="text-xs font-medium text-red-500 ml-2 animate-in slide-in-from-top-1 fade-in">
                    {error}
                </span>
            )}

            {/* Real-time Validation UI (Only shows when typing or evaluating) */}
            {hasValue && (
                <div className="flex flex-col gap-1 mt-2 ml-2">
                    {rules.map((rule, idx) => (
                        <div key={idx} className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 ${rule.valid ? 'text-green-600' : 'text-gray-400'}`}>
                            {rule.valid ? <IconCheck size={14} stroke={3} /> : <div className="w-1.5 h-1.5 ml-[3px] mr-[4px] rounded-full bg-gray-300"></div>}
                            <span>{rule.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

AuthPasswordInput.displayName = 'AuthPasswordInput';
export default AuthPasswordInput;
