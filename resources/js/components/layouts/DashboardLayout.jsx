import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconPalette, IconMenu2 } from '@tabler/icons-react';
import { usePage } from '@inertiajs/react';
import Sidebar from './Sidebar';
import ThemeAdjustmentPanel from '../themed/ThemeAdjustmentPanel';
import ThemedProfile from './ThemedProfile';

/**
 * DashboardLayout — full-page shell with a floating sidebar and removed header.
 * The theme settings button is now a floating glassmorphism icon on the bottom right.
 *
 * Props:
 *   children, activeNavId, onNavigate
 */
export default function DashboardLayout({
    children,
    activeNavId = 'dashboard',
    onNavigate,
}) {
    const { auth } = usePage().props;
    const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div
            className="flex min-h-screen text-gray-800 transition-colors duration-500"
            style={{ background: 'var(--od-surface)' }}
        >
            {/* Theme Drawer */}
            <ThemeAdjustmentPanel
                opened={themeDrawerOpen}
                onClose={() => setThemeDrawerOpen(false)}
            />

            {/* Sidebar (Responsive, Floaty) */}
            <Sidebar
                activeId={activeNavId}
                onNavigate={onNavigate}
                openMobile={mobileSidebarOpen}
                onCloseMobile={() => setMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full min-w-0 transition-all duration-300 lg:pl-[292px]">

                {/* Top Header Row (Mobile Toggle + Global Top Right Profile) */}
                <div className="flex items-center justify-between p-4 lg:px-8 lg:pt-6 lg:pb-0 lg:justify-end">
                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            className="p-2 text-gray-800 transition-colors bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50"
                            onClick={() => setMobileSidebarOpen(true)}
                        >
                            <IconMenu2 size={24} />
                        </button>
                        <div className="font-bold text-gray-800">Orbit Desk</div>
                    </div>

                    <div className="flex items-center gap-4 z-[60]">
                        <ThemedProfile user={auth?.user || {}} />
                    </div>
                </div>

                {/* ── Page Content ── */}
                <main className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto">
                    {children}
                </main>
            </div>

            {/* ── Floating Theme Button (Bottom Right Glass Effect) ── */}
            <button
                onClick={() => setThemeDrawerOpen(true)}
                className="fixed cursor-pointer z-50 flex items-center justify-center w-14 h-14 bottom-6 right-6 lg:bottom-10 lg:right-10 rounded-full shadow-2xl backdrop-blur-xl bg-white/40 border border-white/60 hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
            >
                <IconPalette size={26} style={{ color: 'var(--od-primary-dark)', zIndex: 10 }} stroke={1.5} />
            </button>
        </div>
    );
}
