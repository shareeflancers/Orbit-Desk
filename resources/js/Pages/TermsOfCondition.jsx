import { Head, Link } from '@inertiajs/react';

export default function TermsOfCondition() {
    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
            <Head title="Terms of Condition — Orbit Desk" />
            <div className="container px-6 py-16 mx-auto max-w-4xl">
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 inline-block transition-colors">&larr; Back to Home</Link>
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-gray-900">Terms of Condition</h1>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <p className="text-sm text-gray-400 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
                        <p>Please read these Terms of Condition ("Terms", "Terms of Condition") carefully before using the Orbit Desk application and services operated by Orbit Desk Inc.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Subscriptions, Free Tier, and Trials</h2>
                        <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (such as monthly or annually). We offer special onboarding discounts, such as a "First 3 months free" tier without credit card requirement, subject to change at our sole discretion.</p>
                        <p>At the end of your promotional period, you will need to enter valid payment information to continue using premium features, otherwise your account may be downgraded or suspended.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Acceptable Use Policy</h2>
                        <p>You agree not to use the Service for any unlawful purpose or in any way that might harm, damage, or disparage any other party. Without limiting the foregoing, you may not:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-600">
                            <li>Attempt to gain unauthorized access to our systems or another user's account.</li>
                            <li>Send spam or unsolicited messages via our emailing tools.</li>
                            <li>Upload or distribute viruses or malicious code.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Intellectual Property</h2>
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Orbit Desk Inc and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Orbit Desk Inc.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Limitation of Liability</h2>
                        <p>In no event shall Orbit Desk Inc, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
