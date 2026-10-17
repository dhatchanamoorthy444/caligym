import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CaliGym',
  description: 'CaliGym terms of service outlining user obligations, liability, and service conditions.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-4xl mx-auto section-padding">
        <nav className="mb-8">
          <a href="/" className="text-slate-400 hover:text-orange transition-colors">
            ← Back to Home
          </a>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: October 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using CaliGym, you agree to be bound by these Terms of Service. If you do not agree, do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Age Verification (18+)</h2>
            <p className="text-slate-300 leading-relaxed">
              You must be at least 18 years of age to register for an account and use CaliGym. By accessing this platform, you confirm that you meet this age requirement.
              A cookie is set upon confirmation to remember your age verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Obligations & Health Disclaimer</h2>
            <p className="text-slate-300 leading-relaxed">
              Calisthenics and physical training involve inherent risks of injury. You consult your physician before starting any exercise program. CaliGym provides evidence-based educational content and AI coaching assistance, but does not provide medical advice. You agree to use our platform at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Membership & Cancellation</h2>
            <p className="text-slate-300 leading-relaxed">
              Memberships auto-renew monthly or annually depending on your selection. You may cancel your subscription at any time from your{' '}
              <a href="/settings" className="text-orange hover:underline">
                Settings page
              </a>
              . Access continues until the end of the current billing cycle. All payments are processed through Stripe and are non-refundable except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
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