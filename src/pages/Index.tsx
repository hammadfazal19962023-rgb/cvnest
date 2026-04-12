import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import HowItWorksDetailed from "@/components/HowItWorks";
import WhyChooseSection from "@/components/WhyChooseSection";
import IndustriesSection from "@/components/IndustriesSection";
import CVTipsSection from "@/components/CVTipsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
// import HomeContent from "@/components/HomeContent";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const navigate = useNavigate();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Only show on client side
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        setShowCookieBanner(true);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Persistent navigation header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #fde8d8",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            fontWeight: 800,
            fontSize: "1.25rem",
            background: "linear-gradient(to right, #f97316, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          <img
            src="/android-chrome-512x512.png"
            alt="CV Nest Logo"
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
          />
          {/* CV Nest */}
        </a>
        {/* Mobile hamburger (visible on small screens) */}
        <button
          onClick={() => setMobileOpen((s) => !s)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer" }}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 18L18 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12H20" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 18H20" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <nav className="hidden md:flex md:gap-6 items-center" style={{ alignItems: "center" }}>
          <a href="/builder" className="text-slate-600 no-underline text-sm font-medium">
            Builder
          </a>
          <a href="/blog" className="text-slate-600 no-underline text-sm font-medium">
            Blog
          </a>
          <a href="/about" className="text-slate-600 no-underline text-sm font-medium">
            About
          </a>
          <a href="/contact" className="text-slate-600 no-underline text-sm font-medium">
            Contact
          </a>
          <a
            href="/builder"
            className="text-white text-xs font-semibold"
            style={{ background: "linear-gradient(to right, #f97316, #ec4899)", padding: "6px 16px", borderRadius: 8 }}
          >
            Build my CV →
          </a>
        </nav>

        {/* Mobile dropdown menu (always mounted so transitions work) */}
        <div
          className={"md:hidden absolute left-0 right-0 z-60 transform-gpu transition-all duration-200 ease-out" +
            (mobileOpen ? " opacity-100 translate-y-0 pointer-events-auto" : " opacity-0 -translate-y-2 pointer-events-none")}
          aria-hidden={!mobileOpen}
          style={{
            top: "64px",
            background: "rgba(255,255,255,0.98)",
            borderBottom: "1px solid #f3e9e0",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            maxWidth: 520,
            margin: "0 auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <a
            href="/builder"
            onClick={() => setMobileOpen(false)}
            className="w-full transition transform duration-150 hover:-translate-y-1 hover:text-[#fb923c] hover:bg-slate-50 rounded-md"
            style={{ color: "#475569", textDecoration: "none", fontSize: "15px", padding: "10px 8px" }}
          >
            Builder
          </a>
          <a
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="w-full transition transform duration-150 hover:-translate-y-1 hover:text-[#fb923c] hover:bg-slate-50 rounded-md"
            style={{ color: "#475569", textDecoration: "none", fontSize: "15px", padding: "10px 8px" }}
          >
            Blog
          </a>
          <a
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="w-full transition transform duration-150 hover:-translate-y-1 hover:text-[#fb923c] hover:bg-slate-50 rounded-md"
            style={{ color: "#475569", textDecoration: "none", fontSize: "15px", padding: "10px 8px" }}
          >
            About
          </a>
          <a
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full transition transform duration-150 hover:-translate-y-1 hover:text-[#fb923c] hover:bg-slate-50 rounded-md"
            style={{ color: "#475569", textDecoration: "none", fontSize: "15px", padding: "10px 8px" }}
          >
            Contact
          </a>
          <a
            href="/builder"
            onClick={() => setMobileOpen(false)}
            className="w-full shadow-sm transition transform duration-150 hover:scale-102 rounded-md"
            style={{ background: "linear-gradient(to right, #f97316, #ec4899)", color: "white", padding: "10px 14px", textDecoration: "none", fontWeight: 600 }}
          >
            Build my CV →
          </a>
        </div>
      </header>

      {/* ── Page sections ── */}
      <HeroSection />
      <HowItWorksDetailed />
      <WhyChooseSection />
      <IndustriesSection />
      <CVTipsSection />
      <TestimonialsSection />
      <BlogSection />
      {/* <HomeContent /> */}
      <FaqSection />
      <FooterSection />

      {/* ── Cookie consent banner ── */}
      {showCookieBanner && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#1e1e1e",
            color: "#f0f0f0",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
          }}
        >
          <p style={{ margin: 0, fontSize: "13px", flex: 1, lineHeight: 1.6, maxWidth: "600px" }}>
            We use cookies, including Google AdSense advertising cookies, to personalise content and
            ads, and to analyse traffic. By clicking "Accept All" you consent to our use of cookies.{" "}
            <a
              href="/cookies"
              style={{ color: "#fb923c", textDecoration: "underline" }}
            >
              Cookie Policy
            </a>{" "}
            ·{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#fb923c", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
            <button
              onClick={() => {
                localStorage.setItem("cookie_consent", "rejected");
                setShowCookieBanner(false);
              }}
              style={{
                padding: "8px 18px",
                border: "1px solid #555",
                background: "transparent",
                color: "#ccc",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => {
                localStorage.setItem("cookie_consent", "accepted");
                setShowCookieBanner(false);
              }}
              style={{
                padding: "8px 18px",
                background: "linear-gradient(to right, #f97316, #ec4899)",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
