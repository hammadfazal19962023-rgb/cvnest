import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
// import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";

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