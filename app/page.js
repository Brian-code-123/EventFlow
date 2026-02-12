import Link from "next/link";
import {
    Calendar,
    Users,
    Trophy,
    GitBranch,
    Shield,
    Zap,
    CheckCircle,
    ArrowRight,
    Star,
    Code,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";

const features = [
    {
        icon: Calendar,
        title: "Event Management",
        description:
            "Create and manage multiple events with configurable timelines, rules, and visibility settings.",
    },
    {
        icon: Users,
        title: "Team Formation",
        description:
            "Easy team creation with invite codes, member management, and team size validation.",
    },
    {
        icon: Trophy,
        title: "Judge Evaluation",
        description:
            "Custom scoring rubrics, blind judging support, and automated ranking with score aggregation.",
    },
    {
        icon: GitBranch,
        title: "Project Submissions",
        description:
            "Phase-wise submissions with GitHub repo linking and deadline enforcement.",
    },
    {
        icon: Shield,
        title: "Role-Based Access",
        description:
            "Secure dashboards for Admins, Participants, Mentors, and Judges with clear permission boundaries.",
    },
    {
        icon: Zap,
        title: "Modular Architecture",
        description:
            "Enable only what your event needs. Each module can be toggled per event.",
    },
];

const benefits = [
    "Replace scattered Google Forms, Sheets, and emails",
    "Fair and transparent judging system",
    "Auto-generated certificates and badges",
    "Reusable infrastructure for any event",
    "Open source and community-driven",
    "Easy onboarding for contributors",
];

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Navigation */}
            <Navbar/>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-8">
                        <Star className="w-4 h-4" />
                        Open Source Event Infrastructure
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Run Hackathons &<br />
                        <span className="text-primary-600">Tech Events</span>{" "}
                        Seamlessly
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        EventFlow is a modular, open-source platform that
                        provides the complete digital infrastructure to run
                        hackathons, OSS programs, and community tech events —
                        all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition shadow-lg shadow-primary-600/25"
                        >
                            Start Organizing
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://github.com/R3ACTR/EventFlow"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition"
                        >
                            <Code className="w-5 h-5" />
                            View on GitHub
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">
                                100%
                            </div>
                            <div className="text-slate-600">Open Source</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">
                                4+
                            </div>
                            <div className="text-slate-600">User Roles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">
                                7+
                            </div>
                            <div className="text-slate-600">Modules</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">
                                MIT
                            </div>
                            <div className="text-slate-600">License</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Everything You Need to Run Events
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            A comprehensive suite of tools designed specifically
                            for hackathons and tech events.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Why Choose EventFlow?
                            </h2>
                            <p className="text-xl text-slate-600 mb-8">
                                Stop juggling disconnected tools. EventFlow
                                brings everything into one extensible system —
                                built for organizers, participants, mentors, and
                                judges.
                            </p>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-700 text-lg">
                                            {benefit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">
                                Role-Based Dashboards
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="font-semibold mb-1">
                                        Admin Dashboard
                                    </div>
                                    <div className="text-primary-100 text-sm">
                                        Manage events, users, and system settings
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="font-semibold mb-1">
                                        Participant Dashboard
                                    </div>
                                    <div className="text-primary-100 text-sm">
                                        Track projects, teams, and submissions
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="font-semibold mb-1">
                                        Judge Dashboard
                                    </div>
                                    <div className="text-primary-100 text-sm">
                                        Evaluate projects with custom rubrics
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="font-semibold mb-1">
                                        Mentor Dashboard
                                    </div>
                                    <div className="text-primary-100 text-sm">
                                        Guide teams and track mentorship
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Power Your Next Event?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Join the open-source community and start running better
                        hackathons today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition border border-white/20"
                        >
                            Browse Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                EventFlow
                            </span>
                        </div>
                        <div className="flex items-center gap-8 text-slate-400">
                            <Link
                                href="/events"
                                className="hover:text-white transition"
                            >
                                Events
                            </Link>
                            <Link
                                href="https://github.com/R3ACTR/EventFlow"
                                target="_blank"
                                className="hover:text-white transition"
                            >
                                GitHub
                            </Link>
                            <Link
                                href="/login"
                                className="hover:text-white transition"
                            >
                                Login
                            </Link>
                        </div>
                        <div className="text-slate-500 text-sm">
                            Built with love for the open-source community
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
