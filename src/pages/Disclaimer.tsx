// pages/Disclaimer.tsx
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
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
            <AlertCircle className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Disclaimer
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">General Information</h2>
              <p className="text-gray-600">The information provided on CV Nest is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Affiliate Disclosure</h2>
              <p className="text-gray-600">Some links on CV Nest may be affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps support our free service. We only promote products and services that we genuinely believe will add value to our users.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">No Guarantee of Employment</h2>
              <p className="text-gray-600">CV Nest provides tools and templates to help you create a professional CV. However, we do not guarantee job placement, interviews, or employment outcomes. Your success depends on various factors including your qualifications, experience, interview performance, and the job market. We are not responsible for any employment decisions made by employers.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">AI Assistance</h2>
              <p className="text-gray-600">Our AI-powered suggestions are meant to assist and inspire you. The AI generates recommendations based on patterns and best practices, but you are solely responsible for reviewing, editing, and approving the final content of your CV. We recommend having a human review your CV before submission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">External Links</h2>
              <p className="text-gray-600">Our site may contain links to third-party websites or services that are not owned or controlled by CV Nest. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that CV Nest shall not be responsible or liable for any damage or loss caused by or in connection with the use of such content or services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Professional Advice Disclaimer</h2>
              <p className="text-gray-600">The information provided on CV Nest is not intended to be a substitute for professional career advice. You should not rely solely on the information provided and should consult with qualified professionals regarding your specific situation.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
              <p className="text-gray-600">In no event shall CV Nest be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of our service, whether based on contract, tort, strict liability, or otherwise, even if advised of the possibility of such damages.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Disclaimer</h2>
              <p className="text-gray-600">We may update this Disclaimer from time to time. We will notify you of any changes by posting the new Disclaimer on this page. Changes are effective immediately upon posting.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p className="text-gray-600">If you have any questions about this Disclaimer, please contact us at: <a href="mailto:cvnest29@gmail.com" className="text-orange-500 hover:underline">cvnest29@gmail.com</a></p>
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

export default Disclaimer;