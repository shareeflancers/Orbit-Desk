import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { DEFAULT_COLOR_HEX, buildTheme } from '../theme';
import { applyPaletteToDOM, suggestPalettes } from '../paletteGenerator';

const STORAGE_KEY_COLOR = 'orbit-desk-brand-color';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    // ── Color State ──
    const [brandColor, setBrandColorState] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY_COLOR) || DEFAULT_COLOR_HEX;
        } catch (e) {
            return DEFAULT_COLOR_HEX;
        }
    });

    const setBrandColor = useCallback((hex) => {
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            setBrandColorState(hex);
            try {
                localStorage.setItem(STORAGE_KEY_COLOR, hex);
            } catch (e) {
                // localStorage unavailable
            }
        }
    }, []);

    // ── Derived Data ──
    const { mantineTheme, palette } = useMemo(
        () => buildTheme(brandColor),
        [brandColor]
    );

    // suggestions now return an array of { name, primaryHex, palette }
    const suggestions = useMemo(() => suggestPalettes(brandColor), [brandColor]);

    // ── DOM Injection ──
    useEffect(() => {
        applyPaletteToDOM(palette);
    }, [palette]);

    const value = useMemo(
        () => ({
            brandColor,
            setBrandColor,
            theme: mantineTheme,
            palette,
            suggestions,
        }),
        [brandColor, setBrandColor, mantineTheme, palette, suggestions]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook to read/change the brand color/font and access the full palette.
 */
export function useThemeColor() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useThemeColor must be used within a ThemeProvider');
    return ctx;
}
