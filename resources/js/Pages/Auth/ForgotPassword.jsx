import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { IconMail, IconCircleCheck } from '@tabler/icons-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <>
            <Head title="Forgot Password — Orbit Desk" />
            <AuthLayout
                title="Reset your password."
                subtitle="Enter your email address and we'll send you a link to reset your password."
            >
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Forgot password?</h2>
                    <p className="text-gray-500 font-medium mb-8">
                        No worries, we'll send you reset instructions.
                    </p>

                    {/* Success status */}
                    {status && (
                        <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                            <IconCircleCheck size={18} />
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                        <AuthButton
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            className="mt-2"
                            isLoading={processing}
                        >
                            Send Reset Link
                        </AuthButton>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-gray-500">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-indigo-600 font-bold hover:underline transition-all"
                        >
                            ← Back to sign in
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
