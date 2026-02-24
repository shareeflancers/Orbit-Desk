import { Modal } from '@mantine/core';

/**
 * ThemedModal — A standardized modal component matching the Orbit Desk aesthetic.
 * 
 * Props:
 *   opened (boolean)             - Controls whether the modal is visible
 *   onClose (function)           - Callback when the modal is closed
 *   title (ReactNode)            - The title of the modal
 *   children (ReactNode)         - Modal content
 *   size (string|number)         - Modal size ('sm', 'md', 'lg', 'xl', or a number for px width)
 */
export default function ThemedModal({
    opened,
    onClose,
    title,
    children,
    size = 'md',
    ...props
}) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<strong className="text-xl font-extrabold text-[#001f3f]">{title}</strong>}
            centered
            overlayProps={{ blur: 8, color: 'rgba(0, 0, 0, 0.4)' }}
            radius="2xl"
            size={size}
            transitionProps={{ transition: 'pop' }}
            classNames={{
                header: 'bg-transparent pb-4 pt-6 px-10 rounded-t-[2rem]',
                content: 'bg-white shadow-2xl border border-gray-100 rounded-[2rem] overflow-hidden',
                body: 'px-10 pb-10 pt-2 rounded-b-[2rem]',
                close: 'w-8 h-8 rounded-full border border-green-500 text-green-500 hover:bg-green-50 transition-colors bg-transparent shadow-sm'
            }}
            {...props}
        >
            {children}
        </Modal>
    );
}
