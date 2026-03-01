import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider, useThemeColor } from './context/ThemeContext';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '../css/app.css';

function AppShell({ App, props }) {
    const { theme } = useThemeColor();

    return (
        <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={1000} />
            <App {...props} />
        </MantineProvider>
    );
}

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <AppShell App={App} props={props} />
            </ThemeProvider>
        );
    },
});
