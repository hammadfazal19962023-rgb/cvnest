import { Heart, Shield, FileText, Cookie, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import cvNestLogo from "/public/android-chrome-512x512.png";



const FooterSection = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-pink-50/80 border-t-2 border-orange-100 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 justify-center md:justify-start mb-3 group">
              <img
                src={cvNestLogo}
                alt="CV Nest Logo"
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
              />
              <h3 className="hero-gradient-text font-heading text-xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                CV Nest
              </h3>
            </Link>
            <p className="text-xs text-slate-500">
              Your friendly AI-powered CV builder
            </p>
          </div>

          {/* Legal links */}
          <div className="text-center">
            <h4 className="font-semibold text-slate-700 mb-3 text-sm">Legal</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/privacy-policy"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
              >
                <Cookie className="w-3 h-3" />
                Cookie Policy
              </Link>
              <Link
                to="/disclaimer"
                className="text-xs text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center md:text-right">
            <div className="flex items-center gap-1 justify-center md:justify-end text-xs text-slate-500">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span>Made for job seekers</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-orange-100 pt-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CV Nest. Free forever.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
