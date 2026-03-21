// pages/About.tsx
import { ArrowLeft, Sparkles, Rocket, Heart, Users, Coffee, Zap, Award, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hero-gradient-text font-heading text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            CV Nest
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-orange-700">Our Story</span>
                        </div>
                        <h1 className="hero-gradient-text text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                            We're on a Mission to Make CV Building Fun
                        </h1>
                        <p className="text-xl text-gray-600">
                            Because job applications shouldn't feel like a chore
                        </p>
                    </div>

                    {/* Story Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-6 h-6 text-pink-500" />
                            <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            CV Nest was born from a simple frustration: why is creating a CV so boring and stressful? We've all been there - staring at a blank document, not knowing what to write, and ending up with a generic template that looks like everyone else's.
                        </p>
                        <p className="text-gray-600 mb-4">
                            So we decided to build something different. Something that actually makes you feel good about showcasing your awesomeness. With AI that knows what to say, templates that actually look great, and a friendly vibe that takes the pressure off.
                        </p>
                        <p className="text-gray-600">
                            Today, CV Nest is helping thousands of job seekers create CVs they're proud of. And we're just getting started! 🚀
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 mb-12 border border-orange-100">
                        <div className="flex items-center gap-3 mb-3">
                            <Rocket className="w-6 h-6 text-orange-500" />
                            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 text-lg">
                            "To empower every job seeker with the confidence and tools to showcase their unique story, making the journey from application to dream job not just successful, but enjoyable."
                        </p>
                    </div>

                    {/* Values Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What We Believe In</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">AI That Actually Helps</h3>
                                    <p className="text-sm text-gray-600">Smart suggestions that know what to say when you're stuck</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-6 h-6 text-pink-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Lightning Fast</h3>
                                    <p className="text-sm text-gray-600">Build your CV in minutes, not hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Free Forever</h3>
                                    <p className="text-sm text-gray-600">Because your dream job shouldn't cost you money to apply for</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Human First</h3>
                                    <p className="text-sm text-gray-600">Built by job seekers, for job seekers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
                        <div>
                            <div className="text-3xl font-black text-orange-500">10K+</div>
                            <p className="text-sm text-gray-500">CVs Created</p>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-pink-500">1000+</div>
                            <p className="text-sm text-gray-500">Happy Users</p>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-yellow-500">50+</div>
                            <p className="text-sm text-gray-500">Countries</p>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-purple-500">24/7</div>
                            <p className="text-sm text-gray-500">AI Support</p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Made with ❤️ by Passionate People</h2>
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 text-center border border-orange-100">
                            <div className="text-5xl mb-3">🤝</div>
                            <p className="text-gray-700 mb-2">
                                We're a small team of designers, developers, and career enthusiasts who believe everyone deserves a shot at their dream job.
                            </p>
                            <p className="text-sm text-gray-500">
                                Want to join us? We're always looking for passionate people!
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <div
                            style={{
                                background: "linear-gradient(to right, #f97316, #ec4899)",
                                borderRadius: "0.75rem",
                                padding: "2rem",
                                color: "white"
                            }}
                        >
                            <h3 className="text-2xl font-bold mb-2">Ready to Build Your Dream CV?</h3>
                            <p className="mb-6 opacity-90">Join thousands of job seekers who already trust CV Nest</p>
                            <Link
                                to="/builder"
                                className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
                            >
                                Start Building Now
                                <Rocket className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative main-gradient-bg bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-pink-50/80 border-t-2 border-orange-100 mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} CV Nest. Free forever.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;