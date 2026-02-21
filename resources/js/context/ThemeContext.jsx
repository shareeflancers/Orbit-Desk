import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { DEFAULT_COLOR_HEX, buildTheme } from '../theme';

const STORAGE_KEY = 'orbit-desk-brand-color';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [brandColor, setBrandColorState] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) || DEFAULT_COLOR_HEX;
        } catch (e) {
            return DEFAULT_COLOR_HEX;
        }
    });

    const setBrandColor = useCallback((hex) => {
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            setBrandColorState(hex);
            try {
                localStorage.setItem(STORAGE_KEY, hex);
            } catch (e) {
                // localStorage unavailable
            }
        }
    }, []);

    const theme = useMemo(() => buildTheme(brandColor), [brandColor]);

    const value = useMemo(
        () => ({ brandColor, setBrandColor, theme }),
        [brandColor, setBrandColor, theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook to read/change the brand color.
 *
 * @returns {{ brandColor: string, setBrandColor: (hex: string) => void, theme: object }}
 */
export function useThemeColor() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useThemeColor must be used within a ThemeProvider');
    return ctx;
}
