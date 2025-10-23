import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Disclaimer = () => {
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Disclaimer</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: October 16, 2025</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">General Information</h2>
            <p>The information provided by HR Leave Tracker Solutions Pvt. Ltd. ("we," "us," or "our") on our platform is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">No Professional Advice</h2>
            <p>The platform and its content do not constitute professional advice. For specific legal, financial, HR, or other professional advice, you should consult with appropriate qualified professionals.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Limitation of Liability</h2>
            <p className="mb-3">UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE PLATFORM OR RELIANCE ON ANY INFORMATION PROVIDED. YOUR USE OF THE PLATFORM AND YOUR RELIANCE ON ANY INFORMATION IS SOLELY AT YOUR OWN RISK.</p>
            <p>This includes but is not limited to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Data loss or corruption</li>
              <li>Business interruption</li>
              <li>Loss of profits or revenue</li>
              <li>Inaccurate leave calculations or attendance records</li>
              <li>Missed deadlines or notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">External Links Disclaimer</h2>
            <p>The platform may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Errors and Omissions</h2>
            <p>While we strive to provide accurate and up-to-date information, the platform may contain technical inaccuracies or typographical errors. We reserve the right to make changes, corrections, and improvements at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Service Availability</h2>
            <p>We do not warrant that the platform will be available at all times or that it will be free from errors, viruses, or other harmful components. Service interruptions may occur due to maintenance, updates, or unforeseen technical issues.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Compliance Disclaimer</h2>
            <p>While our platform is designed to help you manage HR processes, it is your responsibility to ensure compliance with all applicable labor laws, regulations, and company policies. We do not guarantee that use of our platform will ensure compliance with all legal requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Data Backup</h2>
            <p>While we implement regular backup procedures, you are responsible for maintaining your own backups of critical data. We shall not be liable for any data loss.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Fair Use</h2>
            <p>Our platform is intended for legitimate HR management purposes. Any misuse, including but not limited to attempts to breach security, overload systems, or use automated tools excessively, may result in immediate termination of access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Consent</h2>
            <p>By using our platform, you hereby consent to this disclaimer and agree to its terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Updates</h2>
            <p>We may update this disclaimer from time to time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of the updated disclaimer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Contact</h2>
            <p>If you have questions about this disclaimer, contact us at:<br /><strong>Email:</strong> legal@hrleavetracker.com<br /><strong>Address:</strong> TIDEL Park, Chennai - 600113, India</p>
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

export default Disclaimer;
