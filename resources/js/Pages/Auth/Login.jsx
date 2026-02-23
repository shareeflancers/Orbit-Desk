import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import AuthPasswordInput from '../../components/auth/AuthPasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import { IconMail } from '@tabler/icons-react';
import { useState } from 'react';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <>
            <Head title="Log in — Orbit Desk" />
            <AuthLayout
                title="Welcome Back."
                subtitle="Sign in to Orbit Desk to manage your support tickets and streamline your workflow."
            >
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Log in</h2>
                    <p className="text-gray-500 font-medium mb-8">
                        Enter your credentials to securely access your helpdesk.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            icon={<IconMail size={20} stroke={1.5} />}
                            required
                        />

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <a href="#" className="text-indigo-600 text-xs font-bold hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <AuthPasswordInput
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-2 ml-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="remember" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
                        </div>

                        <AuthButton type="submit" variant="primary" fullWidth size="lg" className="mt-4" isLoading={isLoading}>
                            Sign In
                        </AuthButton>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-indigo-600 font-bold hover:underline transition-all">
                            Create one now
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
