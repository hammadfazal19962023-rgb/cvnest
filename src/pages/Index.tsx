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
          CV Nest
        </a>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="/builder" style={{ color: "#475569", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            Builder
          </a>
          <a href="/blog" style={{ color: "#475569", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            Blog
          </a>
          <a href="/about" style={{ color: "#475569", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            About
          </a>
          <a href="/contact" style={{ color: "#475569", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            Contact
          </a>
          <a
            href="/builder"
            style={{
              background: "linear-gradient(to right, #f97316, #ec4899)",
              color: "white",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "8px",
            }}
          >
            Build my CV →
          </a>
        </nav>
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
