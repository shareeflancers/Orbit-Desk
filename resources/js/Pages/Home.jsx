import { Head } from '@inertiajs/react';
import { Title, Text, Container, Stack } from '@mantine/core';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Container size="sm" py="xl">
                <Stack align="center" gap="md" mt={100}>
                    <Title order={1}>🚀 Orbit Desk</Title>
                    <Text size="lg" c="dimmed">
                        Laravel + React + Inertia.js + Mantine UI — Ready to go!
                    </Text>
                </Stack>
            </Container>
        </>
    );
}
