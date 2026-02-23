import { Text } from '@mantine/core';

/**
 * AuthLayout — Split-screen glass architecture for authentication pages.
 * Left side: Brand gradient with decorative glass circles.
 * Right side: Centered form container.
 */
export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="flex min-h-screen font-sans bg-white sm:bg-gray-50 flex-col md:flex-row">

            {/* ── Left Side: Brand Decor ── */}
            <div
                className="relative hidden md:flex flex-col justify-between w-full md:w-[45%] lg:w-[40%] p-10 overflow-hidden text-white bg-gradient-to-br from-indigo-800 to-purple-900"
            >
                {/* Decorative Glass Circles */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] rounded-full bg-black/10 blur-2xl" />

                <div className="relative z-10 flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-12 h-12 shadow-lg rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
                    >
                        <Text fw={900} size="xl" lh={1}>O</Text>
                    </div>
                    <Text fw={800} size="xl" className="tracking-tight">
                        Orbit Desk
                    </Text>
                </div>

                <div className="relative z-10 mb-10">
                    <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl drop-shadow-md">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 text-lg font-medium text-white/80 max-w-[80%] leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* ── Right Side: Form Container ── */}
            <div className="flex items-center justify-center flex-1 p-6 sm:p-12 lg:p-24 relative">

                {/* Form Card */}
                <div className="w-full max-w-md p-8 sm:p-10 bg-white sm:shadow-2xl sm:border border-gray-100/50 rounded-[2rem] sm:rounded-[2.5rem]">

                    {/* Mobile Only Header inside card */}
                    <div className="flex items-center gap-3 mb-8 md:hidden">
                        <div
                            className="flex items-center justify-center w-10 h-10 shadow-sm rounded-2xl text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                        >
                            <Text fw={900} size="lg" lh={1}>O</Text>
                        </div>
                        <Text fw={800} size="xl" className="tracking-tight text-gray-800">
                            Orbit Desk
                        </Text>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
