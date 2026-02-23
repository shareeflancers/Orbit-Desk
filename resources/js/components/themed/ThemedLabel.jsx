import { Text } from '@mantine/core';

/**
 * Themed label — a small, semi-bold text component.
 * Use `branded` prop to tint it with the brand color.
 */
export default function ThemedLabel({
    branded = false,
    children,
    size = 'sm',
    fw = 600,
    ...rest
}) {
    return (
        <Text
            size={size}
            fw={fw}
            c={branded ? 'brand.6' : undefined}
            {...rest}
        >
            {children}
        </Text>
    );
}
