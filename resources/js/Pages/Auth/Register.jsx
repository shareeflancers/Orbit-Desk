import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import AuthPasswordInput from '../../components/auth/AuthPasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import { IconMail, IconUser } from '@tabler/icons-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Create Account — Orbit Desk" />
            <AuthLayout
                title="Join Orbit Desk."
                subtitle="Get started for free. Streamline your team's support emails and tickets today."
            >
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an account</h2>
                    <p className="text-gray-500 font-medium mb-8">
                        Sign up to deploy your secure, enterprise-grade helpdesk.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <AuthInput
                                label="Full Name"
                                type="text"
                                placeholder="John Doe"
                                icon={<IconUser size={20} stroke={1.5} />}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs font-medium ml-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <AuthInput
                                label="Email Address"
                                type="email"
                                placeholder="name@company.com"
                                icon={<IconMail size={20} stroke={1.5} />}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs font-medium ml-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <AuthPasswordInput
                                label="Password"
                                placeholder="Create a strong password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs font-medium ml-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <AuthPasswordInput
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs font-medium ml-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <AuthButton
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            className="mt-4"
                            isLoading={processing}
                        >
                            Create Account
                        </AuthButton>

                        {/* ─── Divider ─── */}
                        <div className="relative flex items-center gap-3 mt-1">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* ─── Google Sign Up ─── */}
                        <a
                            href="/auth/google"
                            className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                                Continue with Google
                            </span>
                        </a>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-600 font-bold hover:underline transition-all">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
