import {
    Drawer, Stack, Text, ColorInput, Group, UnstyledButton,
    Box, Divider, Paper
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useThemeColor } from '../../context/ThemeContext';
import { DEFAULT_COLOR_HEX } from '../../theme';

function PalettePreviewRow({ label, color, isGradient = false }) {
    return (
        <Group gap="sm" align="center">
            <Box style={{ width: 28, height: 28, borderRadius: 6, background: color, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
            <Box style={{ flex: 1 }}>
                <Text size="xs" fw={600} lh={1.2}>{label}</Text>
                {!isGradient && <Text size="xs" c="dimmed" lh={1.2}>{color}</Text>}
            </Box>
        </Group>
    );
}

/**
 * ThemeAdjustmentPanel — Drawer with full palette preview, typography settings, and sub-palette suggestions.
 */
export default function ThemeAdjustmentPanel({ opened, onClose }) {
    const {
        brandColor, setBrandColor,
        palette, suggestions
    } = useThemeColor();

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title={<Text fw={700} size="lg">🎨 Theme Settings</Text>}
            position="right"
            size={400}
            overlayProps={{ backgroundOpacity: 0.25, blur: 3 }}
            styles={{
                header: { borderBottom: '1px solid var(--mantine-color-default-border)' },
                body: { paddingBottom: 32 },
            }}
        >
            <Stack gap="xl" mt="md">

                {/* ── Primary Color Picker ── */}
                <Box>
                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="xs">
                        Primary Color Source
                    </Text>
                    <Group align="flex-start">
                        <ColorInput
                            value={brandColor}
                            onChange={setBrandColor}
                            format="hex"
                            radius="md"
                            style={{ flex: 1 }}
                        />
                        <UnstyledButton
                            onClick={() => setBrandColor(DEFAULT_COLOR_HEX)}
                            className="h-[36px] px-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                            title="Revert to Website Default"
                        >
                            <Box style={{ width: 14, height: 14, borderRadius: '50%', background: DEFAULT_COLOR_HEX }} />
                            <Text size="xs" fw={600} c="dimmed">Reset</Text>
                        </UnstyledButton>
                    </Group>
                    <Text size="xs" c="dimmed" mt="xs">
                        Select a base color. A complete custom palette is generated automatically.
                    </Text>
                </Box>

                {/* ── Active Palette Preview ── */}
                <Paper p="md" radius="xl" withBorder className="shadow-sm">
                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="sm">
                        Generated Palette Tokens
                    </Text>
                    <Stack gap={8}>
                        <PalettePreviewRow label="Primary" color={palette.primary} />
                        <PalettePreviewRow label="Dark Primary" color={palette.primaryDark} />
                        <PalettePreviewRow label="Primary Light" color={palette.lightPrimary} />
                        <PalettePreviewRow label="Accent" color={palette.accent} />
                        <PalettePreviewRow label="Secondary (Dark)" color={palette.darkSecondary} />
                        <PalettePreviewRow label="Surface" color={palette.surface} />
                    </Stack>
                </Paper>

                <Divider label="Suggested Harmonies" labelPosition="center" />

                {/* ── Suggestions from primary color (Full Palettes) ── */}
                <Stack gap={10}>
                    {suggestions.map((sug) => {
                        const isActive = brandColor.toLowerCase() === sug.primaryHex.toLowerCase();

                        return (
                            <UnstyledButton
                                key={sug.name}
                                onClick={() => setBrandColor(sug.primaryHex)}
                                className={`
                                    flex flex-col gap-2 p-3 rounded-2xl transition-all
                                    ${isActive ? 'border-2 shadow-sm' : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                                `}
                                style={{
                                    borderColor: isActive ? 'var(--od-primary)' : undefined,
                                    background: isActive ? 'var(--od-light-secondary)' : undefined
                                }}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <Text size="sm" fw={600} className="text-gray-800">{sug.name}</Text>
                                    {isActive && <IconCheck size={16} style={{ color: 'var(--od-primary)' }} stroke={3} />}
                                </div>

                                {/* Mini Palette Preview */}
                                <div className="flex h-6 overflow-hidden rounded-lg shadow-inner w-full">
                                    <div className="flex-1" style={{ background: sug.palette.primaryDark }} />
                                    <div className="flex-[2]" style={{ background: sug.palette.primary }} />
                                    <div className="flex-1" style={{ background: sug.palette.lightPrimary }} />
                                    <div className="flex-1" style={{ background: sug.palette.accent }} />
                                    <div className="flex-1" style={{ background: sug.palette.darkSecondary }} />
                                </div>
                            </UnstyledButton>
                        );
                    })}
                </Stack>

            </Stack>
        </Drawer>
    );
}
