import { createTheme, DEFAULT_THEME } from '@mantine/core';
import { generateColors } from '@mantine/colors-generator';

export const DEFAULT_COLOR_HEX = '#4C6EF5'; // Indigo

/**
 * Build a full Mantine theme from any hex color.
 * Generates a 10-shade palette and sets it as the primary color.
 */
export function buildTheme(hex = DEFAULT_COLOR_HEX) {
    const palette = generateColors(hex);

    return createTheme({
        colors: {
            brand: palette,
        },
        primaryColor: 'brand',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        headings: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        defaultRadius: 'md',
    });
}
