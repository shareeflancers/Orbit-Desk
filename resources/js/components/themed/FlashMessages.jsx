import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { useThemeColor } from '../../context/ThemeContext';

/**
 * FlashMessages Component
 *
 * Listens to Inertia page props for 'flash' messages and displays
 * themed notifications using Mantine Notifications system.
 * Uses Inertia router to prevent duplicates on state updates/re-renders.
 */
export default function FlashMessages() {
    const { theme } = useThemeColor();

    useEffect(() => {
        // Listen to Inertia's success event directly, ignores React state re-renders
        const removeListener = router.on('success', (event) => {
            const flash = event.detail.page.props.flash;
            if (!flash) return;

            const showSuccessNotification = (msg) => {
                notifications.show({
                    title: 'Success',
                    message: msg,
                    color: 'green',
                    icon: <IconCheck size="1.2rem" />,
                    autoClose: 3000,
                    withBorder: true,
                    styles: {
                        root: {
                            borderColor: theme.primary,
                            backgroundColor: '#f0fdf4',
                        },
                        title: {
                            color: theme.primary,
                            fontWeight: 600
                        },
                        description: { color: '#1f2937' },
                        icon: {
                            backgroundColor: 'transparent',
                            color: theme.primary
                        }
                    }
                });
            };

            if (flash.success) {
                showSuccessNotification(flash.success);
            } else if (flash.status) {
                showSuccessNotification(flash.status);
            }

            if (flash.error) {
                notifications.show({
                    title: 'Error',
                    message: flash.error,
                    color: 'red',
                    icon: <IconX size="1.2rem" />,
                    autoClose: 5000,
                    withBorder: true,
                    styles: {
                        root: {
                            borderColor: '#ef4444',
                            backgroundColor: '#fef2f2',
                        },
                        title: {
                            color: '#b91c1c',
                            fontWeight: 600
                        },
                        icon: {
                            backgroundColor: 'transparent',
                            color: '#ef4444'
                        }
                    }
                });
            }

            if (flash.message) {
                notifications.show({
                    title: 'Notification',
                    message: flash.message,
                    color: 'blue',
                    icon: <IconInfoCircle size="1.2rem" />,
                    autoClose: 4000,
                    withBorder: true,
                    styles: {
                        root: { borderColor: theme.secondary },
                        title: {
                            color: theme.secondary,
                            fontWeight: 600
                        },
                        icon: {
                            backgroundColor: 'transparent',
                            color: theme.secondary
                        }
                    }
                });
            }
        });

        return removeListener;
    }, [theme]);

    return null;
}
