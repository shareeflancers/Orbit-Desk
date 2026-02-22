import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../components/AuthLayout';
import AuthInput from '../../components/AuthInput';
import AuthPasswordInput from '../../components/AuthPasswordInput';
import AuthButton from '../../components/AuthButton';
import { IconMail, IconUser } from '@tabler/icons-react';
import { useState } from 'react';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [pwd, setPwd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => setIsLoading(false), 2000);
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
                        <AuthInput
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={<IconUser size={20} stroke={1.5} />}
                            required
                        />

                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            icon={<IconMail size={20} stroke={1.5} />}
                            required
                        />

                        <AuthPasswordInput
                            label="Password"
                            placeholder="Create a strong password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                        />

                        <AuthButton type="submit" variant="primary" fullWidth size="lg" className="mt-4" isLoading={isLoading}>
                            Create Account
                        </AuthButton>
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
