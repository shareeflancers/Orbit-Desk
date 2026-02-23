import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../components/auth/AuthLayout';
import { useState } from 'react';
import { IconMailOpened } from '@tabler/icons-react';
import AuthPinInput from '../../components/auth/AuthPinInput';
import AuthButton from '../../components/auth/AuthButton';

export default function VerifyEmail() {
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleVerify = () => {
        if (pin.length !== 6) return;
        setIsLoading(true);
        // Simulate network verify
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleResend = () => {
        setIsResending(true);
        setTimeout(() => setIsResending(false), 2000);
    };

    return (
        <>
            <Head title="Verify Email — Orbit Desk" />
            <AuthLayout
                title="Just one more step."
                subtitle="We need to verify your email address to secure your new helpdesk account."
            >
                <div className="flex flex-col items-center text-center">

                    <div
                        className="flex justify-center items-center w-20 h-20 rounded-[2rem] shadow-xl mb-8 bg-gradient-to-br from-indigo-500 to-purple-600"
                    >
                        <IconMailOpened size={40} className="text-white" stroke={1.5} />
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Check your email</h2>
                    <p className="text-gray-500 font-medium mb-10 max-w-sm">
                        We've sent a 6-digit verification code to <span className="font-bold text-gray-800">john@example.com</span>.
                    </p>

                    <AuthPinInput
                        length={6}
                        onComplete={(code) => {
                            setPin(code);
                            // Auto submit potentially? 
                            // handleVerify(code); 
                        }}
                    />

                    <AuthButton
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="mt-10"
                        disabled={pin.length !== 6}
                        onClick={handleVerify}
                        isLoading={isLoading}
                    >
                        Verify Email
                    </AuthButton>

                    <div className="mt-8">
                        <p className="text-sm font-medium text-gray-500 mb-3">Didn't receive the email?</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <AuthButton variant="outline" size="sm" onClick={handleResend} isLoading={isResending}>
                                Click to resend
                            </AuthButton>
                            <Link href="/login" className="w-full sm:w-auto">
                                <AuthButton variant="white" size="sm" fullWidth>
                                    Back to log in
                                </AuthButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
