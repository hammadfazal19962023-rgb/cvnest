// pages/Contact.tsx
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                <h1 className="hero-gradient-text text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Get in Touch
                </h1>
              </div>
              <p className="text-gray-600 mb-8">
                Have questions about your CV? Need help with our AI builder? We'd love to hear from you! Our team is here to help make your job search journey awesome.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                    <a href="mailto:cvnest29@gmail.com" className="text-gray-600 hover:text-orange-500 transition-colors">
                      cvnest29@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Response Time</h3>
                    <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Weekend responses may take a bit longer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Smile className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Follow Us</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Twitter</a>
                      <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">LinkedIn</a>
                      <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                <p className="text-sm text-gray-600 text-center">
                  ✨ Fun fact: Every CV we help create gets a tiny digital high-five! 🖐️
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a message</h2>
            <p className="text-gray-600 mb-6">We'd love to help you land your dream job!</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-sm text-green-700">Thanks for reaching out. We'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="question">Question about CV building</option>
                    <option value="support">Technical support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
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

export default Contact;