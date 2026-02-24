import { router } from '@inertiajs/react';
import { Tooltip, Text, Avatar } from '@mantine/core';
import {
    IconHome2, IconTicket, IconUsers, IconSettings,
    IconChartBar, IconMail, IconLogout, IconX,
} from '@tabler/icons-react';

const NAV_ITEMS = [
    { icon: IconHome2, label: 'Dashboard', id: 'dashboard' },
];

function NavItem({ icon: Icon, label, active, onClick }) {
    return (
        <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 200 }}>
            <button
                onClick={onClick}
                className={`
                    flex items-center gap-3 w-full px-4 py-3
                    rounded-2xl transition-all duration-300 ease-out
                    ${active ? 'font-semibold shadow-md translate-x-1' : 'font-medium hover:bg-white/10 hover:translate-x-1'}
                `}
                style={{
                    color: active ? 'var(--od-white)' : 'rgba(255,255,255,0.7)',
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
 *   userName - string
 *   userAvatar - string
 */
export default function Sidebar({
    activeId = 'dashboard',
    onNavigate,
    openMobile,
    onCloseMobile,
    userName = 'Admin',
    userAvatar
}) {
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
                    fixed top-4 left-4 z-[70] h-[calc(100vh-32px)] w-[260px] flex flex-col p-4
                    transition-transform duration-300 ease-in-out lg:translate-x-0
                    border border-white/10 shadow-2xl rounded-3xl
                    ${openMobile ? 'translate-x-0' : '-translate-x-[120%]'}
                `}
                style={{ background: 'var(--od-dark-secondary)' }}
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
                            <Text c="var(--od-white)" fw={700} size="lg" className="tracking-tight whitespace-nowrap">
                                Orbit Desk
                            </Text>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            className="p-1 rounded-lg text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
                            onClick={onCloseMobile}
                        >
                            <IconX size={20} />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-1">
                        {NAV_ITEMS.map((item) => (
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

                {/* ── Lower Portion: Profile & Logout ── */}
                <div className="pt-4 mt-auto border-t border-white/10 flex flex-col gap-2">
                    {/* User Profile */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/5">
                        <Avatar
                            src={userAvatar}
                            radius="xl"
                            size="sm"
                            style={{ background: 'var(--od-primary)', color: 'var(--od-white)' }}
                        >
                            {userName.charAt(0)}
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <Text size="sm" fw={700} c="white" className="truncate leading-tight">
                                {userName}
                            </Text>
                            <Text size="xs" fw={500} style={{ color: 'var(--od-light-secondary)' }} className="truncate">
                                Workspace Admin
                            </Text>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            router.post('/logout');
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 ease-out font-medium hover:bg-white/10 text-[rgba(255,255,255,0.7)] hover:text-white"
                    >
                        <IconLogout size={22} stroke={1.5} />
                        <span className="text-sm tracking-wide">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
