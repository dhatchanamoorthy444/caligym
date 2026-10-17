import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CaliGym',
  description: 'CaliGym privacy policy explaining data collection, usage, and your rights.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-4xl mx-auto section-padding">
        <nav className="mb-8">
          <a href="/" className="text-slate-400 hover:text-orange transition-colors">
            ← Back to Home
          </a>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: October 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              CaliGym LLC (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data.
              This privacy policy explains what data we collect, why we collect it, and how we handle it in compliance with GDPR and CCPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data Minimization & Collection</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              In accordance with our data minimization principle, we collect ONLY the information necessary to provide our calisthenics coaching service:
            </p>
            <ul className="list-arrows space-y-2 text-slate-300">
              <li>Email address (for account identification and coaching updates)</li>
              <li>Name (for profile personalization)</li>
              <li>Fitness level (beginner, intermediate, advanced)</li>
              <li>Age (strictly to verify minimum age requirement of 18+)</li>
              <li>Workout logs (sets, reps, duration, and notes you input)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Third-Party SDKs and Services</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We integrate with trusted third-party services for payments and analytics:
            </p>
            <ul className="list-arrows space-y-2 text-slate-300">
              <li>
                <strong>Stripe:</strong> Secure payment processing. We never store credit card numbers on our servers.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Anonymous page view and performance metrics.
              </li>
              <li>
                <strong>Supabase:</strong> Secure database hosting with encryption at rest.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Retention & Deletion</h2>
            <p className="text-slate-300 leading-relaxed">
              Your personal data is retained for as long as your account remains active. You have the right to request full data deletion at any time under GDPR Article 17 and CCPA.
              To request deletion, submit a request via your{' '}
              <a href="/settings" className="text-orange hover:underline">
                Settings page
              </a>{' '}
              or email us directly at{' '}
              <a href="mailto:support@caligym.io" className="text-orange hover:underline">
                support@caligym.io
              </a>
              . Deletion requests are processed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
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