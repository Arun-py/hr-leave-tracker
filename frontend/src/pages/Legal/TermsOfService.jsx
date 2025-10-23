import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">HR Leave Tracker</span>
          </Link>
          <Link to="/legal" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">← Back to Legal</Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Effective Date: October 1, 2025 | Last Updated: October 16, 2025</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using HR Leave Tracker, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">2. User Accounts</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>One person or entity may not maintain multiple accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">3. Permitted Use</h2>
            <p className="mb-2">You agree to use the platform only for lawful purposes and in accordance with these Terms. Prohibited activities include:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating another person or entity</li>
              <li>Attempting to gain unauthorized access to the system</li>
              <li>Transmitting viruses, malware, or harmful code</li>
              <li>Interfering with or disrupting the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">4. Subscription and Payments</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>Failure to pay may result in service suspension or termination</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">5. Intellectual Property</h2>
            <p>The platform, including all content, features, and functionality, is owned by HR Leave Tracker and protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">6. Data and Privacy</h2>
            <p>Your use of the service is also governed by our Privacy Policy. We collect and use data as described in our Privacy Policy to provide and improve our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">7. Service Availability</h2>
            <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the service with or without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, HR Leave Tracker shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless HR Leave Tracker from any claims, damages, or expenses arising from your violation of these Terms or your use of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">10. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">11. Governing Law</h2>
            <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">12. Contact</h2>
            <p><strong>Email:</strong> legal@hrleavetracker.com<br /><strong>Address:</strong> TIDEL Park, Chennai - 600113, India</p>
          </section>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 HR Leave Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
