const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <a href="/" className="font-heading text-lg font-bold text-foreground hover:text-muted-foreground transition-colors">
            cvnest
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-foreground">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to cvnest ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-muted-foreground">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">A. Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li><strong>Account Information:</strong> When you create an account, we collect your email address, password, and authentication details.</li>
              <li><strong>Profile Information:</strong> You may provide personal information such as your name, phone number, location, job title, work experience, education history, and skills.</li>
              <li><strong>CV/Resume Data:</strong> When you upload a CV or create a resume, we collect and process the information contained within it.</li>
              <li><strong>Job Description:</strong> When you submit job descriptions for CV optimization, we collect and process that information.</li>
              <li><strong>Communication:</strong> If you contact us with inquiries or feedback, we collect the information you provide.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">B. Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Device Information:</strong> We collect information about the device you use, including IP address, browser type, operating system, and device identifiers.</li>
              <li><strong>Usage Information:</strong> We collect data about how you interact with our website, including pages visited, time spent, features used, and user actions.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance your experience and analyze website usage.</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To provide, maintain, and improve our services</li>
              <li>To generate and optimize your CV/resume</li>
              <li>To authenticate and manage your account</li>
              <li>To communicate with you about your account or our services</li>
              <li>To analyze website usage and performance</li>
              <li>To display personalized content and advertisements</li>
              <li>To comply with legal obligations and enforce our terms of service</li>
              <li>To prevent fraud and enhance security</li>
            </ul>
          </section>

          {/* Advertising and Google AdSense */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Advertising and Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              Our website uses Google AdSense and other advertising partners to display ads based on your interests. These advertising partners may collect and use information about your visits to our website and other websites to provide targeted advertisements.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">Google AdSense</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li>Google uses cookies to serve ads based on your prior visits to our website or other websites</li>
              <li>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
              <li>You can also use the <a href="https://optout.aboutads.info/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out tool</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">Third-Party Links</h3>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
            <p className="text-muted-foreground">
              Your account is protected by a password that should be kept confidential. You are responsible for maintaining the confidentiality of your password and are responsible for all activities that occur under your account.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. You can request deletion of your data at any time by contacting us, subject to certain legal and operational requirements.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Access:</strong> You have the right to access the personal information we hold about you</li>
              <li><strong>Correction:</strong> You can request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> You can opt out of certain data processing activities</li>
              <li><strong>Data Portability:</strong> You may request a copy of your data in a portable format</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can control cookie preferences through your browser settings. Disabling cookies may affect the functionality of our website.
            </p>
            <p className="text-muted-foreground">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand website usage</li>
              <li><strong>Advertising Cookies:</strong> Used to serve personalized advertisements</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information and terminate the child's account immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you of any material changes by updating the "Last updated" date at the top of this policy. Your continued use of our website following the posting of changes constitutes your acceptance of those changes.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
              <p className="mb-2"><strong>cvnest</strong></p>
              <p className="mb-2">Email: privacy@cvnest.com</p>
              <p>We will respond to your inquiry within 30 days of receipt.</p>
            </div>
          </section>

          {/* GDPR and CCPA */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. GDPR and CCPA Compliance</h2>
            <p className="text-muted-foreground mb-4">
              <strong>For EU Users (GDPR):</strong> If you are located in the European Union, we process your personal data in accordance with the General Data Protection Regulation (GDPR). You have the rights described in Section 7 of this policy.
            </p>
            <p className="text-muted-foreground">
              <strong>For California Users (CCPA):</strong> If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, and opt-out of the sale of your personal information.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By using our website and services, you acknowledge that you have read this Privacy Policy and agree to its terms and conditions. If you do not agree with any part of this policy, please do not use our website.
            </p>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-border bg-background mt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} cvnest. Free forever.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
