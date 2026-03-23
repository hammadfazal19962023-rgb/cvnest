import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Don't do anything if no measurement ID
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID not found in env');
      return;
    }

    // Load the gtag script dynamically
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { send_page_view: false });
    `;
    document.head.appendChild(script2);

    // Cleanup function (optional - removes scripts if component unmounts)
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]); // Re-run if measurementId changes

  // Track page views
  useEffect(() => {
    if (measurementId && typeof window.gtag !== 'undefined') {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location, measurementId]);

  return null;
};

export default GoogleAnalytics;