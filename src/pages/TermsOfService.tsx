// pages/TermsOfService.tsx
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
            <span className="font-heading text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              CV Nest
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">By accessing or using CV Nest, you agree to be bound by these Terms of Service. If you disagree with any part, you may not use our service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Use of Service</h2>
              <p className="text-gray-600">You are responsible for the accuracy of the information you provide. You retain ownership of your CV content. We are not responsible for any decisions made based on your CV.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
              <p className="text-gray-600">You are responsible for maintaining the confidentiality of your account. You agree to accept responsibility for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Intellectual Property</h2>
              <p className="text-gray-600">Our templates, code, and design are protected by copyright. You may use our templates for personal, non-commercial purposes. Reselling our templates is prohibited.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Prohibited Activities</h2>
              <p className="text-gray-600">You may not use our service for any illegal purpose, to harass others, or to create fake or misleading content.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
              <p className="text-gray-600">CV Nest is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our service, including employment outcomes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Termination</h2>
              <p className="text-gray-600">We may terminate or suspend your account immediately, without prior notice, for conduct that violates these Terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Changes to Terms</h2>
              <p className="text-gray-600">We may modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact</h2>
              <p className="text-gray-600">Questions? Reach us at: <a href="mailto:cvnest29@gmail.com" className="text-orange-500 hover:underline">cvnest29@gmail.com</a></p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-pink-50/80 border-t-2 border-orange-100 mt-12">
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

export default TermsOfService;