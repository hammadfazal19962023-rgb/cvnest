import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
// import FeaturesSection from "@/components/FeaturesSection";
// import FooterSection from "@/components/FooterSection";

const Index = () => {
  const navigate = useNavigate();
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    // Show privacy policy notification only on first visit
    const hasSeenPrivacyPolicy = localStorage.getItem("privacy_policy_seen");
    
    if (!hasSeenPrivacyPolicy) {
      toastIdRef.current = toast.custom(
        (t) => (
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
            <p className="font-semibold text-foreground mb-4">Privacy & Cookies Notice</p>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies and ads to enhance your experience. By continuing, you agree to our privacy policy.
            </p>
            
            {/* Privacy Policy Link - Using button with navigate instead of Link */}
            <div className="mb-4">
              <button 
                onClick={() => {
                  toast.dismiss(t);
                  navigate("/privacy-policy");
                }}
                className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-2 transition-colors bg-transparent border-0 p-0 cursor-pointer"
              >
                Read our full privacy policy →
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
                onClick={() => {
                  localStorage.setItem("privacy_policy_seen", "true");
                  toast.dismiss(t);
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  localStorage.setItem("privacy_policy_seen", "true");
                  toast.dismiss(t);
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "bottom-right",
        }
      );
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Additional sections */}
      <HowItWorks />
      <BlogSection />
      <FaqSection />
      
      {/* <FeaturesSection /> */}
      {/* <FooterSection /> */}
    </div>
  );
};

export default Index;