import { Head } from '@inertiajs/react';
import {
    Title, Text, Container, Stack, Group, Button, ThemeIcon,
    Paper, ColorInput, Badge, Box,
} from '@mantine/core';
import { useThemeColor } from '../context/ThemeContext';

export default function Home() {
    const { brandColor, setBrandColor } = useThemeColor();

    return (
        <>
            <Head title="Orbit Desk — Helpdesk & Ticketing" />

            {/* ── Hero Section ── */}
            <Box
                style={(theme) => ({
                    background: `linear-gradient(135deg, var(--mantine-color-brand-6) 0%, var(--mantine-color-brand-9) 100%)`,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                })}
            >
                {/* Decorative circles */}
                <Box
                    style={{
                        position: 'absolute',
                        width: 500,
                        height: 500,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        top: -120,
                        right: -100,
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.04)',
                        bottom: -80,
                        left: -60,
                    }}
                />

                <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
                    <Stack align="center" gap="xl" py={60}>
                        {/* Logo / brand */}
                        <Badge
                            size="lg"
                            variant="light"
                            color="white"
                            radius="xl"
                            styles={{
                                root: {
                                    background: 'rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                },
                            }}
                        >
                            ✉️ Unified Helpdesk Platform
                        </Badge>

                        <Title
                            order={1}
                            ta="center"
                            c="white"
                            fz={{ base: 36, sm: 52 }}
                            fw={800}
                            lh={1.15}
                        >
                            Your team inbox,{' '}
                            <Text
                                component="span"
                                inherit
                                style={{ opacity: 0.85 }}
                            >
                                reimagined.
                            </Text>
                        </Title>

                        <Text
                            size="lg"
                            ta="center"
                            maw={520}
                            style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                            Orbit Desk converts every email into a trackable ticket,
                            so your team never drops the ball. Assign, collaborate,
                            and resolve — all from one place.
                        </Text>

                        <Group gap="md" mt="sm">
                            <Button
                                size="lg"
                                radius="xl"
                                color="white"
                                variant="white"
                                styles={{
                                    root: {
                                        color: 'var(--mantine-color-brand-7)',
                                        fontWeight: 700,
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                radius="xl"
                                variant="outline"
                                styles={{
                                    root: {
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        color: '#fff',
                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.1)',
                                        },
                                    },
                                }}
                            >
                                Learn More
                            </Button>
                        </Group>

                        {/* Feature pills */}
                        <Group gap="xs" mt="lg" justify="center">
                            {[
                                '📩 Email → Ticket',
                                '👥 Role-Based Access',
                                '📊 Reports & Analytics',
                                '🏢 On-Premise or SaaS',
                            ].map((feature) => (
                                <Badge
                                    key={feature}
                                    size="md"
                                    radius="xl"
                                    variant="light"
                                    styles={{
                                        root: {
                                            background: 'rgba(255,255,255,0.12)',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                        },
                                    }}
                                >
                                    {feature}
                                </Badge>
                            ))}
                        </Group>

                        {/* ── Color Picker ── */}
                        <Paper
                            mt="xl"
                            p="lg"
                            radius="lg"
                            style={{
                                background: 'rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.18)',
                            }}
                        >
                            <Group gap="md" align="flex-end">
                                <ColorInput
                                    label={
                                        <Text size="sm" fw={600} c="white">
                                            🎨 Brand Color
                                        </Text>
                                    }
                                    value={brandColor}
                                    onChange={setBrandColor}
                                    format="hex"
                                    swatches={[
                                        '#F03E3E', '#E8590C', '#F59F00',
                                        '#37B24D', '#1C7ED6', '#4C6EF5',
                                        '#7048E8', '#AE3EC9', '#E64980',
                                    ]}
                                    styles={{
                                        input: {
                                            background: 'rgba(255,255,255,0.9)',
                                            width: 220,
                                        },
                                    }}
                                />
                            </Group>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
