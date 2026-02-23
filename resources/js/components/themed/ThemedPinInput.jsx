import { useState, useRef, useEffect } from 'react';

/**
 * ThemedPinInput — A 6-digit OTP/Verification code input composed of 6 separate boxes.
 * Auto-advances focus and handles pasting a full 6-digit code.
 */
export default function ThemedPinInput({ length = 6, onComplete }) {
    const [values, setValues] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const focusInput = (index) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].focus();
            // Automatically select the text so typing replaces it
            inputRefs.current[index].select();
        }
    };

    const handleChange = (index, val) => {
        // Only allow numbers
        const cleanVal = val.replace(/[^0-9]/g, '');
        if (!cleanVal && val !== '') return;

        // If pasting a multi-character string into one box
        if (cleanVal.length > 1) {
            const arr = cleanVal.split('').slice(0, length);
            const newValues = [...values];
            arr.forEach((char, i) => {
                if (index + i < length) newValues[index + i] = char;
            });
            setValues(newValues);

            // Focus the box after the last pasted digit (or the very last box)
            const nextFocusIndex = Math.min(index + arr.length, length - 1);
            focusInput(nextFocusIndex);

            if (newValues.join('').length === length) {
                onComplete?.(newValues.join(''));
            }
            return;
        }

        // Single character logic
        const newValues = [...values];
        newValues[index] = cleanVal;
        setValues(newValues);

        if (cleanVal !== '') {
            if (index < length - 1) {
                focusInput(index + 1);
            } else if (newValues.join('').length === length) {
                onComplete?.(newValues.join(''));
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (values[index] === '' && index > 0) {
                focusInput(index - 1);
            } else {
                const newValues = [...values];
                newValues[index] = '';
                setValues(newValues);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, length);
        if (pastedData) {
            const arr = pastedData.split('');
            const newValues = Array(length).fill('');
            arr.forEach((char, i) => { newValues[i] = char; });
            setValues(newValues);
            focusInput(Math.min(arr.length, length - 1));

            if (pastedData.length === length) {
                onComplete?.(pastedData);
            }
        }
    };

    return (
        <div className="flex items-center gap-2 sm:gap-3 justify-center w-full" onPaste={handlePaste}>
            {values.map((v, idx) => (
                <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={v}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="
                        w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl bg-gray-50 border border-gray-200 text-[var(--od-black)]
                        transition-all duration-200 focus:outline-none focus:bg-white focus:border-[var(--od-primary)] focus:ring-4 focus:ring-[var(--od-primary)] focus:ring-opacity-20 hover:bg-gray-100
                    "
                    maxLength={1} // Fallback, handle paste handles multi-char natively
                />
            ))}
        </div>
    );
}
