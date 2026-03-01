import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    IconCheck, IconLayoutDashboard, IconUsers, IconBrandSpeedtest,
    IconChartBar, IconMessageCircle, IconShieldCheck, IconMail, IconKey, IconServer, IconBrandWhatsapp, IconSend, IconRocket, IconHeartHandshake, IconCoin
} from '@tabler/icons-react';

export default function Home() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const words = ['emails', 'tickets', 'workflow'];
    const [wordIndex, setWordIndex] = useState(0);

    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState('');

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactStatus('sending');
        router.post('/contact', contactForm, {
            preserveScroll: true,
            onSuccess: () => {
                setContactForm({ name: '', email: '', message: '' });
                setContactStatus('success');
                setTimeout(() => setContactStatus(''), 5000);
            },
            onError: () => setContactStatus('error')
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-white selection:bg-indigo-100 selection:text-indigo-900">
            <Head title="Orbit Desk — Manage Your Workspace Seamlessly" />

            {/* ── Navigation ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                        <span className="text-lg md:text-xl font-black">O</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">Orbit Desk</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
                    <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                    <a href="#why-us" className="hover:text-indigo-600 transition-colors">Why Us</a>
                    <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                    <a href="#about-us" className="hover:text-indigo-600 transition-colors">About</a>
                    <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 md:px-5 md:py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-full bg-gray-900 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
                        >
                            Go to workspace →
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 md:px-5 md:py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-full bg-gray-900 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
                            >
                                Start for free
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/50 blur-[100px] -z-10" />
                <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-200/50 blur-[120px] -z-10" />

                <div className="container px-6 mx-auto text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full bg-indigo-500 rounded-full opacity-75 animate-ping"></span>
                            <span className="relative inline-flex w-2 h-2 bg-indigo-600 rounded-full"></span>
                        </span>
                        Introducing Orbit Desk 1.0
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
                        Unify your team's{' '}
                        <span className="inline-flex justify-center relative align-bottom min-w-[5em] md:min-w-[5.5em]">
                            {words.map((word, index) => (
                                <span
                                    key={word}
                                    className={`absolute left-1/2 -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out py-2 ${index === wordIndex
                                        ? 'opacity-100 translate-y-0'
                                        : index < wordIndex || (wordIndex === 0 && index === words.length - 1)
                                            ? 'opacity-0 -translate-y-4 pointer-events-none'
                                            : 'opacity-0 translate-y-4 pointer-events-none'
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                            <span className="invisible pointer-events-none">helpdesk</span>
                        </span>
                        <br className="hidden md:block" /> in one workspace.
                    </h1>

                    <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-gray-500 leading-relaxed">
                        A centralized ticketing system that converts emails into trackable tickets. Support role-based access, assignments, and robust reporting. Deployed on-premise or as a SaaS solution.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={user ? '/dashboard' : '/register'}
                            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white transition-all duration-300 rounded-full shadow-xl bg-gray-900 shadow-gray-900/20 hover:bg-indigo-600 hover:shadow-indigo-500/30 active:scale-95"
                        >
                            {user ? 'Go to your workspace →' : 'Get Started Free'}
                        </Link>
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-gray-700 transition-all duration-300 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                        >
                            Explore Features
                        </a>
                    </div>

                    <p className="mt-6 text-sm text-gray-400 font-medium">No credit card required • 90-day free trial</p>

                    {/* Dashboard Mockup Visualization */}
                    <div className="relative mt-20 md:mt-28 mx-auto -mb-10 lg:-mb-32">
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 w-full h-full bottom-[-20px] md:bottom-[-50px]" />
                        <div className="relative rounded-t-[2.5rem] border-[8px] border-b-0 border-gray-900/5 bg-gray-50 shadow-2xl p-2 md:p-4 overflow-hidden mask-image-bottom">
                            <div className="w-full h-[300px] md:h-[500px] bg-white rounded-t-[2rem] shadow-sm border border-gray-200 overflow-hidden relative flex">
                                {/* Pseudo Sidebar */}
                                <div className="w-16 md:w-64 h-full border-r border-gray-100 bg-gray-50/50 p-4 shrink-0 hidden sm:block">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200 mb-8" />
                                    <div className="w-full h-4 rounded bg-indigo-100 mb-4" />
                                    <div className="w-3/4 h-4 rounded bg-gray-200 mb-4" />
                                    <div className="w-5/6 h-4 rounded bg-gray-200 lg:block hidden" />
                                </div>
                                {/* Pseudo Main Content */}
                                <div className="flex-1 p-6 md:p-8 relative">
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex-1 h-32 rounded-3xl bg-indigo-50 border border-indigo-100/50" />
                                        <div className="flex-1 h-32 rounded-3xl bg-purple-50 border border-purple-100/50 hidden md:block" />
                                        <div className="flex-[2] h-32 rounded-3xl bg-gray-50 border border-gray-100 hidden lg:block" />
                                    </div>
                                    <div className="w-full h-64 rounded-3xl bg-white border border-gray-100 shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Logos Section ── */}
            <section className="py-12 border-t border-b border-gray-100 bg-gray-50/50">
                <div className="container px-6 mx-auto text-center">
                    <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-8">
                        Trusted by innovative teams worldwide
                    </p>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20 o    pacity-40 grayscale">
                        {/* Dummy Logos */}
                        <div className="text-xl font-black font-serif">Acme Corp</div>
                        <div className="text-xl font-bold tracking-tighter">GLOBAL<span className="font-light">sys</span></div>
                        <div className="text-xl font-extrabold italic">Nexus</div>
                        <div className="text-xl font-medium tracking-widest hidden sm:block">A E R O</div>
                        <div className="text-xl font-bold hidden md:block">Vortex</div>
                    </div>
                </div>
            </section>

            {/* ── Features Grid ── */}
            <section id="features" className="py-24 md:py-32 bg-white">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Powerful ticketing, simplified.</h2>
                        <p className="text-lg text-gray-500">Transform chaotic team inboxes into an organized, collaborative workflow with our comprehensive helpdesk toolkit.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconMail size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Email-to-Ticket</h3>
                            <p className="text-gray-500 leading-relaxed">Automatically convert incoming emails into trackable tickets, centralizing customer support into a single collaborative workspace.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconUsers size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Smart Assignments</h3>
                            <p className="text-gray-500 leading-relaxed">Route and assign tickets effortlessly to the right team members. Track accountability and ensure every request is handled.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconKey size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Encrypted Email & Data</h3>
                            <p className="text-gray-500 leading-relaxed">Securely lock down personal information and incoming emails using enterprise-grade encryption for total data privacy.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconChartBar size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Robust Reporting</h3>
                            <p className="text-gray-500 leading-relaxed">Generate beautiful reports instantly. Understand your team's resolution velocity, agent performance, and incoming ticket volume.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconServer size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Flexible Deployment</h3>
                            <p className="text-gray-500 leading-relaxed">Host Orbit Desk heavily customized on your own on-premise servers, or enjoy it seamlessly as a fully-managed SaaS solution.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 transition-transform duration-300 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 group">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                <IconShieldCheck size={28} stroke={1.5} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Role-Based Access</h3>
                            <p className="text-gray-500 leading-relaxed">Define granular permissions for each team member, ensuring everyone has the right level of access to tickets and data.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Select Us ── */}
            <section id="why-us" className="py-24 md:py-32 bg-indigo-50 border-t border-indigo-100/50">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-indigo-950 mb-6 tracking-tight">Why Select Orbit Desk?</h2>
                        <p className="text-lg text-indigo-700/80">We believe that powerful communication tools shouldn't come with a massive price tag. Here is our value proposition.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-indigo-100/50 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                                <IconCoin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cost-Effective Alternative</h3>
                            <p className="text-gray-500 leading-relaxed">Stop paying per-agent fees that cripple your growth. We offer transparent pricing that saves you thousands compared to traditional helpdesks.</p>
                        </div>
                        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-indigo-100/50 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                                <IconHeartHandshake size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-First Support</h3>
                            <p className="text-gray-500 leading-relaxed">We actually care about your success. You get direct access to our team to ensure Orbit Desk perfectly fits your workflow needs.</p>
                        </div>
                        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-indigo-100/50 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                                <IconRocket size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Speed</h3>
                            <p className="text-gray-500 leading-relaxed">Our minimalist, blazing-fast interface means less time clicking around and more time actually resolving customer inquiries.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Pricing Tiers ── */}
            <section id="pricing" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
                <div className="container px-6 mx-auto max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Simple, flexible pricing.</h2>
                        <p className="text-lg text-gray-500">Pick the perfect plan that scales with your team's support needs.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">

                        {/* Tier 1: Free */}
                        <div className="flex flex-col p-8 bg-white border border-gray-200 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                            <p className="text-sm text-gray-500 mb-6 font-medium text-amber-600">First 3 months. No credit card required.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                                <span className="text-gray-500 font-medium">/mo</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">1 User</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">Up to 1 email connection</span>
                                </li>
                            </ul>
                            <Link href="/register" className="w-full py-3 text-center text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                                Get Started
                            </Link>
                        </div>

                        {/* Tier 2: Personal */}
                        <div className="flex flex-col p-8 bg-white border border-gray-200 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Personal</h3>
                            <p className="text-sm text-gray-500 mb-6">For power users.</p>
                            <div className="mb-8 flex items-baseline">
                                <span className="text-4xl font-extrabold text-gray-900">$9</span>
                                <span className="text-gray-500 font-medium ml-1">/connection/mo</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">1 User</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">Up to 2 email connections</span>
                                </li>
                            </ul>
                            <Link href="/register" className="w-full py-3 text-center text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                                Get Started
                            </Link>
                        </div>

                        {/* Tier 3: Team */}
                        <div className="flex flex-col p-8 bg-white border border-indigo-200 rounded-[2rem] shadow-lg shadow-indigo-100 relative transform lg:-translate-y-4 transition-all duration-300">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                                Popular
                            </div>
                            <h3 className="text-xl font-bold text-indigo-950 mb-2">Team</h3>
                            <p className="text-sm text-gray-500 mb-6">For growing businesses.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-indigo-950">$29</span>
                                <span className="text-gray-500 font-medium">/user/mo</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">Unlimited Users</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">Up to 2 email connections per user</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 font-medium">Advanced Reporting</span>
                                </li>
                            </ul>
                            <Link href="/register" className="w-full py-3 text-center text-sm font-bold text-white bg-indigo-600 shadow-md shadow-indigo-500/30 rounded-full hover:bg-indigo-700 transition-colors">
                                Try 14 Days Free
                            </Link>
                        </div>

                        {/* Tier 4: Custom */}
                        <div className="flex flex-col p-8 bg-gray-900 text-white border border-gray-800 rounded-[2rem] shadow-xl md:col-span-2 lg:col-span-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Custom</h3>
                            <p className="text-sm text-gray-400 mb-6 relative z-10">For massive scale.</p>
                            <div className="mb-8 relative z-10">
                                <span className="text-3xl font-extrabold text-white tracking-tight">Let's talk</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8 relative z-10">
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300 font-medium">Unlimited Connections</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300 font-medium">Dedicated Deployment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCheck size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300 font-medium">SLA Guarantees</span>
                                </li>
                            </ul>
                            <a href="mailto:sales@orbitdesk.com" className="w-full relative z-10 py-3 text-center text-sm font-bold text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors">
                                Contact Sales
                            </a>
                        </div>

                    </div>
                </div>
            </section>


            {/* ── Pricing / CTA Section ── */}
            <section className="py-24 md:py-32 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[120px] -z-10" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] -z-10" />

                <div className="container px-6 mx-auto text-center max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Ready to transform your workflow?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of teams already using Orbit Desk to deliver exceptional customer experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href={user ? '/dashboard' : '/register'}
                            className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-gray-900 transition-transform rounded-full bg-white hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                        >
                            {user ? 'Go to your workspace →' : 'Start your 90-day free trial'}
                        </Link>
                        <p className="text-sm text-gray-400 sm:hidden">No credit card required</p>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-gray-300">
                        <div className="flex items-center gap-2">
                            <IconCheck size={18} className="text-green-400" /> Free 90-day trial
                        </div>
                        <div className="flex items-center gap-2">
                            <IconCheck size={18} className="text-green-400" /> Upgrade anytime
                        </div>
                        <div className="flex items-center gap-2">
                            <IconCheck size={18} className="text-green-400" /> No credit card required
                        </div>
                    </div>
                </div>
            </section>

            {/* ── About Us ── */}
            <section id="about-us" className="py-24 md:py-32 bg-white">
                <div className="container px-6 mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-[3rem] -z-10 transform -rotate-3"></div>
                                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl">
                                    <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
                                        <IconUsers size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Orbit Desk was built with a simple premise: smaller teams deserve enterprise-grade ticketing without the suffocating subscription fees. We started out of frustration with bloated software that took months to configure and cost a fortune. Today, our goal is to empower businesses with an intuitive, hyper-fast helpdesk that scales with your ambition, prioritizing what really matters—your customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">About Us</h2>
                            <p className="text-lg text-gray-500 mb-8">
                                We are a passionate team of developers and product designers dedicated to streamlining communication. We believe in simplicity, transparency, and creating software that gets out of your way. Our suite of powerful tools makes it effortless to provide stellar support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Contact Info ── */}
            <section id="contact" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
                <div className="container px-6 mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Get in touch</h2>
                        <p className="text-lg text-gray-500">Have questions? Send us a message and we'll reply as soon as possible.</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={contactForm.name}
                                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={contactForm.email}
                                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea
                                    required
                                    value={contactForm.message}
                                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={contactStatus === 'sending'}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 duration-200"
                            >
                                {contactStatus === 'sending' ? 'Sending...' : contactStatus === 'success' ? 'Message Sent!' : <><IconSend size={20} /> Send Message</>}
                            </button>
                            {contactStatus === 'error' && (
                                <p className="text-red-500 text-sm text-center mt-2 font-medium">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="py-12 bg-white border-t border-gray-100">
                <div className="container px-6 mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 text-white rounded-lg bg-gray-900">
                            <span className="text-xs font-black">O</span>
                        </div>
                        <span className="text-base font-bold text-gray-900 tracking-tight">Orbit Desk</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-condition" className="hover:text-gray-900 transition-colors">Terms of Condition</Link>
                        <a href="#contact" className="hover:text-gray-900 transition-colors">Contact Sales</a>
                    </div>

                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Orbit Desk Inc. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* WhatsApp Floaty Button */}
            <a
                href="https://wa.me/923120576877"
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                aria-label="Contact us on WhatsApp"
            >
                <IconBrandWhatsapp size={32} stroke={2} />
            </a>
        </div>
    );
}
