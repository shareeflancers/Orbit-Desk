import { createTheme } from '@mantine/core';
import { generateColors } from '@mantine/colors-generator';
import { generatePalette } from './paletteGenerator';

export const DEFAULT_COLOR_HEX = '#4f46e5'; // Landing Page Indigo
export const DEFAULT_FONT_FAMILY = "'Instrument Sans', sans-serif";

/**
 * Build a full Mantine theme from any hex color and font.
 * Generates a 10-shade Mantine palette AND our custom OD palette.
 */
export function buildTheme(hex = DEFAULT_COLOR_HEX) {
    const mantinePalette = generateColors(hex);
    const odPalette = generatePalette(hex);

    return {
        mantineTheme: createTheme({
            colors: {
                brand: mantinePalette,
            },
            primaryColor: 'brand',
            fontFamily: DEFAULT_FONT_FAMILY,
            headings: {
                fontFamily: DEFAULT_FONT_FAMILY,
            },
            defaultRadius: 'xl', // Matching the highly rounded UI aesthetic requested
        }),
        palette: odPalette,
    };
}
