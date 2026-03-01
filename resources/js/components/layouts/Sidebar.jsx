import { router, usePage } from '@inertiajs/react';
import { Tooltip, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { getNavigationByRole } from '../../navigation';

function NavItem({ icon: Icon, label, active, onClick }) {
    return (
        <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 200 }}>
            <button
                onClick={onClick}
                className={`
                    flex items-center gap-3 w-full px-4 py-3
                    rounded-[1.25rem] transition-all duration-300 ease-out cursor-pointer
                    ${active ? 'font-semibold shadow-md translate-x-1' : 'font-medium hover:bg-gray-100 hover:translate-x-1'}
                `}
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: active ? 'var(--od-white)' : 'var(--od-gray-600)',
                    background: active ? 'var(--od-brand-gradient)' : 'transparent',
                }}
            >
                <Icon size={22} stroke={active ? 2 : 1.5} />
                <span className="text-sm tracking-wide">{label}</span>
            </button>
        </Tooltip>
    );
}

/**
 * Sidebar — themed dark vertical navigation, floaty layout.
 * Hidden on mobile, toggled via openMobile prop.
 *
 * Props:
 *   activeId – id of the currently active nav item
 *   onNavigate – (id: string) => void
 *   openMobile – boolean (true if mobile drawer is open)
 *   onCloseMobile – () => void
 */
export default function Sidebar({
    activeId = 'dashboard',
    onNavigate,
    openMobile,
    onCloseMobile,
}) {
    const { auth } = usePage().props;
    const user = auth?.user || {};
    const navItems = getNavigationByRole(user.role);

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {openMobile && (
                <div
                    className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar Container - Floaty style */}
            <aside
                className={`
                    fixed top-4 left-4 z-[70] h-[calc(100vh-32px)] w-[285px] flex flex-col p-4
                    transition-transform duration-300 ease-in-out lg:translate-x-0
                    border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl bg-white
                    ${openMobile ? 'translate-x-0' : '-translate-x-[120%]'}
                `}
            >
                {/* ── Upper Portion: Navigation ── */}
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    {/* Header / Logo */}
                    <div className="flex items-center justify-between px-2 mb-8">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center shrink-0 w-10 h-10 shadow-sm rounded-2xl"
                                style={{ background: 'var(--od-brand-gradient)' }}
                            >
                                <Text c="var(--od-white)" fw={800} size="lg" lh={1}>O</Text>
                            </div>
                            <Text c="var(--od-primary-dark)" fw={800} size="lg" className="tracking-tight whitespace-nowrap">
                                Orbit Desk
                            </Text>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
                            onClick={onCloseMobile}
                        >
                            <IconX size={20} />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                active={activeId === item.id}
                                onClick={() => {
                                    onNavigate?.(item.id);
                                    onCloseMobile?.();
                                }}
                            />
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}
