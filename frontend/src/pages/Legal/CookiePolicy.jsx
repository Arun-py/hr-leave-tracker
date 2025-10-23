import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const CookiePolicy = () => {
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Cookie Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Effective Date: October 1, 2025</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🔐 Essential Cookies</h3>
                <p>Required for the platform to function. These enable core functionality like security, authentication, and session management.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Analytics Cookies</h3>
                <p>Help us understand how visitors interact with our platform by collecting anonymous information about usage patterns.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">⚙️ Functional Cookies</h3>
                <p>Remember your preferences (language, theme, layout) to provide enhanced functionality and personalization.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎯 Performance Cookies</h3>
                <p>Collect information about how you use our platform to improve performance and user experience.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">How We Use Cookies</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Authentication and security</li>
              <li>Remembering user preferences and settings</li>
              <li>Analyzing site traffic and usage patterns</li>
              <li>Improving platform performance</li>
              <li>Providing personalized content and features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Managing Cookies</h2>
            <p className="mb-3">You can control and manage cookies in several ways:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies</li>
              <li><strong>Opt-Out Tools:</strong> Use browser extensions to block tracking cookies</li>
              <li><strong>Platform Settings:</strong> Manage preferences in your account settings</li>
            </ul>
            <p className="mt-4 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <strong>Note:</strong> Disabling essential cookies may affect platform functionality and your ability to use certain features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Third-Party Cookies</h2>
            <p>We may use third-party service providers (analytics, support tools) that set their own cookies. These are subject to the respective privacy policies of these external services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Updates to This Policy</h2>
            <p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Contact Us</h2>
            <p><strong>Email:</strong> privacy@hrleavetracker.com<br /><strong>Address:</strong> TIDEL Park, Chennai - 600113, India</p>
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

export default CookiePolicy;
