import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy — CaliGym',
  description: 'CaliGym refund policy outlining the 14-day money-back guarantee and cancellation terms.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-4xl mx-auto section-padding">
        <nav className="mb-8">
          <a href="/" className="text-slate-400 hover:text-orange transition-colors">
            ← Back to Home
          </a>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: October 14, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 14-Day Money-Back Guarantee</h2>
            <p className="text-slate-300 leading-relaxed">
              We want you to be fully satisfied with your CaliGym membership. If you are not satisfied, you may request a full refund within 14 days of your initial purchase.
              No questions asked. This guarantee applies to first-time purchases only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How to Request a Refund</h2>
            <p className="text-slate-300 leading-relaxed">
              To request a refund, please email our support team at{' '}
              <a href="mailto:support@caligym.io" className="text-orange hover:underline">
                support@caligym.io
              </a>{' '}
              with your account email and order reference number. Refunds are processed back to your original payment method within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Membership Renewal Cancellations</h2>
            <p className="text-slate-300 leading-relaxed">
              For subsequent subscription renewals, cancellations stop future billings but are non-refundable for the active billing period. You will retain access until the end of the current billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Contact Support</h2>
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