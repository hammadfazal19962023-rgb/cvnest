import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
// import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";


const Index = () => {
  const navigate = useNavigate();
  const toastIdRef = useRef<string | number | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    setShowCookieBanner(!consent);
  }, []);

  // useEffect(() => {
  //   // Show privacy policy notification only on first visit
  //   const hasSeenPrivacyPolicy = localStorage.getItem("privacy_policy_seen");

  //   if (!hasSeenPrivacyPolicy) {
  //     toastIdRef.current = toast.custom(
  //       (t) => (
  //         <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
  //           <p className="font-semibold text-foreground mb-4">Privacy & Cookies Notice</p>
  //           <p className="text-sm text-muted-foreground mb-4">
  //             We use cookies and ads to enhance your experience. By continuing, you agree to our privacy policy.
  //           </p>

  //           {/* Privacy Policy Link - Using button with navigate instead of Link */}
  //           <div className="mb-4">
  //             <button 
  //               onClick={() => {
  //                 toast.dismiss(t);
  //                 navigate("/privacy-policy");
  //               }}
  //               className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-2 transition-colors bg-transparent border-0 p-0 cursor-pointer"
  //             >
  //               Read our full privacy policy →
  //             </button>
  //           </div>

  //           <div className="flex gap-2">
  //             <Button
  //               size="sm"
  //               variant="default"
  //               className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
  //               onClick={() => {
  //                 localStorage.setItem("privacy_policy_seen", "true");
  //                 toast.dismiss(t);
  //               }}
  //             >
  //               Accept
  //             </Button>
  //             <Button
  //               size="sm"
  //               variant="outline"
  //               onClick={() => {
  //                 localStorage.setItem("privacy_policy_seen", "true");
  //                 toast.dismiss(t);
  //               }}
  //             >
  //               Reject
  //             </Button>
  //           </div>
  //         </div>
  //       ),
  //       {
  //         duration: Infinity,
  //         position: "bottom-right",
  //       }
  //     );
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* ===== RESPONSIVE HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with gradient text */}
            <a
              href="/"
              className="flex items-center gap-2 text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-clip-text text-transparent hover:opacity-90 transition-all hover:scale-105 duration-300 group"
            >
              <div className="hidden sm:block">
                <img
                  src="/android-chrome-512x512.png"
                  alt="CV Nest Logo"
                  className="w-8 h-8"
                />
              </div>
              {/* CV Nest */}
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-8 lg:gap-10">
              {["Builder", "Blog", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`/${item === "Builder" ? "builder" : item.toLowerCase()}`}
                  className="relative text-sm font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-orange-600" />
              ) : (
                <Menu className="w-5 h-5 text-orange-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="sm:hidden mt-4 space-y-2 pb-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {["Builder", "Blog", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`/${item === "Builder" ? "builder" : item.toLowerCase()}`}
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 bg-orange-50/80 hover:bg-orange-100 border border-orange-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
      {/* // In the JSX return: */}
      {showCookieBanner && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: "#1a1a1a", color: "#fff", padding: "1rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem", boxShadow: "0 -2px 20px rgba(0,0,0,0.3)"
        }}>
          <p style={{ margin: 0, fontSize: "14px", flex: 1 }}>
            We use cookies including Google AdSense to personalize ads and analyze traffic.{" "}
            <a href="/privacy-policy" style={{ color: "#f97316" }}>Learn more</a>
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => { localStorage.setItem("cookie_consent", "rejected"); setShowCookieBanner(false); }}
              style={{ padding: "8px 16px", border: "1px solid #555", background: "transparent", color: "#ccc", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
              Reject
            </button>
            <button onClick={() => { localStorage.setItem("cookie_consent", "accepted"); setShowCookieBanner(false); }}
              style={{ padding: "8px 16px", background: "#f97316", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
              Accept All
            </button>
          </div>
        </div>
      )}
      <HeroSection />

      {/* Additional sections */}
      <HowItWorks />
      <BlogSection />
      <FaqSection />

      {/* Ad Space - Placed above footer */}
      {/* <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-orange-100">
              <div className="mb-4">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Advertisement</span>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-12 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Your Ad Could Be Here</p>
                  <p className="text-xs text-gray-400">Contact us for advertising opportunities</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Support CV Nest and help us keep our service free for everyone
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <FeaturesSection /> */}
      <FooterSection />
    </div>
  );
};

export default Index;