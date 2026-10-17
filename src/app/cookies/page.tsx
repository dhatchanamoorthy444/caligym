import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — CaliGym',
  description: 'CaliGym cookie policy explaining what cookies we use and how you can manage them.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-4xl mx-auto section-padding">
        <nav className="mb-8">
          <a href="/" className="text-slate-400 hover:text-orange transition-colors">
            ← Back to Home
          </a>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: October 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-slate-300 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and understand how you use CaliGym.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We use the following categories of cookies:
            </p>
            <ul className="list-arrows space-y-3 text-slate-300">
              <li>
                <strong className="text-offwhite">Functional Cookies (Required):</strong> Essential for session management, authentication, and cookie consent preferences.
                <br />
                <span className="text-xs text-slate-500">Retained for 1 year.</span>
              </li>
              <li>
                <strong className="text-offwhite">Analytics Cookies (Optional):</strong> Used via Vercel Analytics to measure site traffic and performance anonymously.
                <br />
                <span className="text-xs text-slate-500">Retained for 30 days.</span>
              </li>
              <li>
                <strong className="text-offwhite">Marketing Cookies (Optional):</strong> Used to measure the effectiveness of our campaigns.
                <br />
                <span className="text-xs text-slate-500">Retained for 90 days.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Managing Cookie Preferences</h2>
            <p className="text-slate-300 leading-relaxed">
              You can change your cookie preferences at any time through our cookie banner that appears on first visit or via your browser settings. Declining optional cookies will not affect core site functionality.
              The banner includes toggles for Analytics and Marketing cookies while keeping Functional cookies enabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              CaliGym LLC, 123 Fitness Ave, Austin, TX 78701. Email:{' '}
              <a href="mailto:support@caligym.io" className="text-orange hover:underline">
                support@caligym.io
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/privacy" className="text-slate-400 hover:text-orange transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-slate-400 hover:text-orange transition-colors">
              Terms
            </a>
            <a href="/refund" className="text-slate-400 hover:text-orange transition-colors">
              Refunds
            </a>
            <a href="/cookies" className="text-slate-400 hover:text-orange transition-colors">
              Cookies
            </a>
          </div>
          <div className="text-center mt-6 text-xs text-slate-500">
            &copy; 2026 CaliGym LLC. All rights reserved. | Powered by evidence-based exercise science.
          </div>
        </div>
      </footer>
    </div>
  );
}