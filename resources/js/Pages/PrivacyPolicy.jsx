import { Head, Link } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
            <Head title="Privacy Policy — Orbit Desk" />
            <div className="container px-6 py-16 mx-auto max-w-4xl">
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 inline-block transition-colors">&larr; Back to Home</Link>
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-gray-900">Privacy Policy</h1>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <p className="text-sm text-gray-400 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
                        <p>Welcome to Orbit Desk ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or when you contact us.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-600">
                            <li><strong>Name and Contact Data:</strong> We collect your first and last name, email address, phone number, and other similar contact data.</li>
                            <li><strong>Credentials:</strong> We collect passwords and similar security information used for authentication and account access.</li>
                            <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Data Security and Encryption</h2>
                        <p>We use state-of-the-art enterprise-grade security measures to protect your personal data. Incoming emails, ticketing data, and customer demographics are encrypted at rest and in transit using industry-standard protocols. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Sharing Your Information</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We securely process payments and emails through trusted third-party vendors, such as SendGrid, who adhere to strict privacy standards.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
