/**
 * paletteGenerator.js
 *
 * Given a single primary hex color, derives a full palette:
 *   primary        – the user's chosen color
 *   primaryDark    – darkened primary
 *   darkSecondary  – very dark shade (near-black tinted)
 *   lightSecondary – very light tint
 *   lightPrimary   – light tint of primary
 *   accent         – complementary hue shift for highlights
 *   surface        – ultra-light background tint
 *   black          – near-black (tinted)
 *   white          – pure white
 *
 * Also: suggestPalettes(hex) returns 5 harmonious full-palette objects.
 */

/* ── helpers ── */

function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

/* ── main generator ── */

export function generatePalette(hex) {
    const { h, s, l } = hexToHSL(hex);

    const primary = hex;
    const primaryDark = hslToHex(h, clamp(s + 10, 0, 100), clamp(l - 25, 5, 40));
    const darkSecondary = hslToHex(h, clamp(s - 15, 10, 60), 12);
    const lightSecondary = hslToHex(h, clamp(s - 5, 10, 50), 93);
    const lightPrimary = hslToHex(h, clamp(s, 30, 90), 70);
    const accent = hslToHex((h + 30) % 360, clamp(s + 5, 30, 90), clamp(l, 40, 60));
    const surface = hslToHex(h, clamp(s - 20, 5, 25), 97);
    const black = hslToHex(h, 15, 8);
    const white = '#FFFFFF';

    const primaryGradient = `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`;
    const secondaryGradient = `linear-gradient(135deg, ${darkSecondary} 0%, ${lightPrimary} 100%)`;
    const brandGradient = `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`;
    const subtleGradient = `linear-gradient(135deg, ${surface} 0%, ${lightSecondary} 100%)`;

    return {
        primary,
        primaryDark,
        darkSecondary,
        lightSecondary,
        lightPrimary,
        accent,
        surface,
        black,
        white,
        // gradients
        primaryGradient,
        secondaryGradient,
        brandGradient,
        subtleGradient,
    };
}

/* ── CSS custom properties injector ── */

export function applyPaletteToDOM(palette) {
    const root = document.documentElement;
    root.style.setProperty('--od-primary', palette.primary);
    root.style.setProperty('--od-primary-dark', palette.primaryDark);
    root.style.setProperty('--od-dark-secondary', palette.darkSecondary);
    root.style.setProperty('--od-light-secondary', palette.lightSecondary);
    root.style.setProperty('--od-light-primary', palette.lightPrimary);
    root.style.setProperty('--od-accent', palette.accent);
    root.style.setProperty('--od-surface', palette.surface);
    root.style.setProperty('--od-black', palette.black);
    root.style.setProperty('--od-white', palette.white);
    root.style.setProperty('--od-primary-gradient', palette.primaryGradient);
    root.style.setProperty('--od-secondary-gradient', palette.secondaryGradient);
    root.style.setProperty('--od-brand-gradient', palette.brandGradient);
    root.style.setProperty('--od-subtle-gradient', palette.subtleGradient);
}

/* ── palette suggestions ── */

/* ── palette suggestions ── */

export function suggestPalettes(hex) {
    const { h, s, l } = hexToHSL(hex);

    const suggestions = [
        { name: 'Analogous Cool', hex: hslToHex((h + 330) % 360, s, l) },
        { name: 'Analogous Warm', hex: hslToHex((h + 30) % 360, s, l) },
        { name: 'Triadic 1', hex: hslToHex((h + 120) % 360, s, l) },
        { name: 'Triadic 2', hex: hslToHex((h + 240) % 360, s, l) },
        { name: 'Complementary', hex: hslToHex((h + 180) % 360, s, l) },
    ];

    // Instead of just returning hexes, return full generated palettes for each suggestion
    return suggestions.map(s => ({
        name: s.name,
        primaryHex: s.hex,
        palette: generatePalette(s.hex)
    }));
}
