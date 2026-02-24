import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthPasswordInput from '../../components/auth/AuthPasswordInput';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { IconMail } from '@tabler/icons-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email ?? '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <>
            <Head title="Reset Password — Orbit Desk" />
            <AuthLayout
                title="Create new password."
                subtitle="Choose a strong new password to secure your Orbit Desk account."
            >
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reset password</h2>
                    <p className="text-gray-500 font-medium mb-8">
                        Enter and confirm your new password below.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email (pre-filled, read-only) */}
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
                                label="New Password"
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
                                label="Confirm New Password"
                                placeholder="Re-enter your new password"
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
                            Reset Password
                        </AuthButton>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
