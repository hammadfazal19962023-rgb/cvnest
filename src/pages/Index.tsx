import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
// import FeaturesSection from "@/components/FeaturesSection";
// import FooterSection from "@/components/FooterSection";

const Index = () => {
  const navigate = useNavigate();
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    // Show privacy policy notification on page load
    toastIdRef.current = toast.custom(
      (t) => (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
          <p className="font-semibold text-foreground mb-4">Privacy & Cookies Notice</p>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies and ads to enhance your experience.
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => {
                toast.dismiss(t);
              }}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
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
      }
    );
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* <FeaturesSection /> */}
      {/* <FooterSection />/ */}
    </div>
  );
};

export default Index;
