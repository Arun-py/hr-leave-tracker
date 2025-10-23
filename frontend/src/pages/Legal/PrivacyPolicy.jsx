import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              HR Leave Tracker
            </span>
          </Link>
          <Link to="/legal" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
            ← Back to Legal
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Effective Date: October 1, 2025 | Last Updated: October 16, 2025</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              HR Leave Tracker Solutions Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our HR management platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">2. Information We Collect</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p><strong>Personal Information:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name, email address, phone number, and employee ID</li>
                <li>Department, designation, and employment details</li>
                <li>Leave requests, attendance records, and work schedules</li>
                <li>Profile information and preferences</li>
              </ul>
              <p className="mt-4"><strong>Automatically Collected Information:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP address, browser type, and device information</li>
                <li>Usage data, log files, and cookies</li>
                <li>Geographic location (if permitted)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li>To provide and maintain our HR management services</li>
              <li>To process leave requests and attendance tracking</li>
              <li>To communicate with you about your account and updates</li>
              <li>To improve our platform and user experience</li>
              <li>To comply with legal obligations and prevent fraud</li>
              <li>To send administrative information and notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Within Your Organization:</strong> With authorized personnel (HR, managers, admins)</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">5. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure servers, access controls, and regular security audits. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">6. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">7. Data Retention</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply 
              with legal obligations. Employee data is typically retained for 7 years after employment termination 
              as per Indian labor laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">8. Cookies and Tracking</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use cookies and similar technologies to enhance your experience. You can control cookie 
              preferences through your browser settings. See our Cookie Policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">9. Children's Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our services are not directed to individuals under 18. We do not knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">10. International Data Transfers</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your data is primarily stored in India. If transferred internationally, we ensure adequate 
              safeguards are in place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">11. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this policy periodically. We will notify you of significant changes via email 
              or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">12. Contact Us</h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <p>For privacy-related questions or to exercise your rights, contact us at:</p>
              <p><strong>Email:</strong> privacy@hrleavetracker.com</p>
              <p><strong>Address:</strong> TIDEL Park, 4th Floor, Taramani, Chennai - 600113, India</p>
              <p><strong>Data Protection Officer:</strong> dpo@hrleavetracker.com</p>
            </div>
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

export default PrivacyPolicy;
