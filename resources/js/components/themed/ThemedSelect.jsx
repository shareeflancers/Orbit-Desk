import { Select } from '@mantine/core';
import { forwardRef } from 'react';

/**
 * Themed Select — branded focus ring and dropdown highlight.
 */
const ThemedSelect = forwardRef(function ThemedSelect(props, ref) {
    return (
        <Select
            ref={ref}
            {...props}
            styles={(theme) => ({
                input: {
                    '&:focus': {
                        borderColor: 'var(--mantine-color-brand-6)',
                    },
                    ...props.styles?.input,
                },
                option: {
                    '&[data-checked]': {
                        backgroundColor: 'var(--mantine-color-brand-6)',
                        color: '#fff',
                    },
                    ...props.styles?.option,
                },
                ...props.styles,
            })}
        />
    );
});

export default ThemedSelect;
