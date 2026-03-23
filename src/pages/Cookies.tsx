// pages/CookiePolicy.tsx
import { ArrowLeft, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
            <Cookie className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">What Are Cookies</h2>
              <p className="text-gray-600">Cookies are small text files stored on your device that help us provide and improve our services. They allow websites to remember your actions and preferences over time.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Cookies</h2>
              <p className="text-gray-600 mb-3">We use different types of cookies for various purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve relevant ads</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-3">Google AdSense may use cookies to serve ads based on your interests. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the internet.</p>
              <p className="text-gray-600">You can opt out of personalized advertising through <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Google Ad Settings</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Managing Cookies</h2>
              <p className="text-gray-600 mb-3">You can control and delete cookies through your browser settings. Most browsers allow you to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
                <li>View cookies stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
              </ul>
              <p className="text-gray-600 mt-3">Note that disabling cookies may affect site functionality and your user experience.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookie Duration</h2>
              <p className="text-gray-600">Cookies can be either session cookies (deleted when you close your browser) or persistent cookies (remain on your device until they expire or are deleted). We use both types.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Updates to This Policy</h2>
              <p className="text-gray-600">We may update this Cookie Policy from time to time. We encourage you to review this page periodically for any changes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p className="text-gray-600">If you have questions about our use of cookies, please contact us at: <a href="mailto:cvnest29@gmail.com" className="text-orange-500 hover:underline">cvnest29@gmail.com</a></p>
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

export default CookiePolicy;