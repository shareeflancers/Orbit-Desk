import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthButton from '../../components/auth/AuthButton';
import { IconMailOpened, IconCircleCheck } from '@tabler/icons-react';

export default function VerifyEmail({ email, status }) {
    const { post, processing } = useForm({});

    const handleResend = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <>
            <Head title="Verify Email — Orbit Desk" />
            <AuthLayout
                title="Just one more step."
                subtitle="We need to verify your email address to secure your new helpdesk account."
            >
                <div className="flex flex-col items-center text-center">

                    <div className="flex justify-center items-center w-20 h-20 rounded-[2rem] shadow-xl mb-8 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <IconMailOpened size={40} className="text-white" stroke={1.5} />
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Check your email</h2>
                    <p className="text-gray-500 font-medium mb-3 max-w-sm">
                        We've sent a verification link to{' '}
                        <span className="font-bold text-gray-800">{email}</span>.
                    </p>
                    <p className="text-gray-400 text-sm mb-10 max-w-sm">
                        Click the link in the email to verify your account. You may need to check your spam folder.
                    </p>

                    {/* Success: link resent */}
                    {status === 'verification-link-sent' && (
                        <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium w-full">
                            <IconCircleCheck size={18} />
                            A new verification link has been sent to your email address.
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <form onSubmit={handleResend} className="flex-1">
                            <AuthButton
                                type="submit"
                                variant="primary"
                                size="md"
                                fullWidth
                                isLoading={processing}
                            >
                                Resend verification email
                            </AuthButton>
                        </form>

                        <AuthButton
                            href="/logout"
                            method="post"
                            as="button"
                            variant="outline"
                            size="md"
                            fullWidth
                            className="flex-1"
                        >
                            Log out
                        </AuthButton>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
