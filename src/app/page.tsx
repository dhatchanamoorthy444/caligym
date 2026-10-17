'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { CustomCard } from '@/components/ui/card';
import { SkillCard } from '@/components/SkillCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [showPricing, setShowPricing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      name: 'Structured Progressions',
      description: 'Evidence-based progressions backed by exercise science, not guesswork',
      icon: '🏗️',
    },
    {
      name: 'AI Coaching',
      description: 'Personalized recommendations based on your level and performance',
      icon: '🤖',
    },
    {
      name: 'Skill Tree',
      description: 'Clear milestones and motivation with unlockable achievements',
      icon: '🌳',
    },
  ];

  const testimonials = [
    {
      name: 'Marcus R.',
      avatar: 'MR',
      color: 'bg-slate-500',
      progress: '20 pull-ups',
      quote: 'From 0 pull-ups to 20 strict pull-ups in 12 weeks following the progression system. The AI form feedback caught details I was missing.',
    },
    {
      name: 'Sadie L.',
      avatar: 'SL',
      color: 'bg-emerald-600',
      progress: 'Beginner to muscle-up',
      quote: 'The skill tree kept me accountable. I unlocked my first muscle-up after 6 months of structured training.',
    },
    {
      name: 'Jordan D.',
      avatar: 'JD',
      color: 'bg-orange-600',
      progress: 'Handstand mastery',
      quote: 'Clear progressions, no gimmicks. The freestanding handstand program is the most logical one I have found.',
    },
  ];

  return (
    <div className="min-h-screen bg-darkbg noise-bg">
      {/* Age Verification Modal */}
      <div className="modal-overlay" id="age-modal">
        <div className="modal-box slide-up">
          <h2 className="text-2xl font-bold mb-4">Age Verification</h2>
          <p className="text-slate-400 mb-6">
            By accessing CaliGym, you confirm you are 18 years or older.
          </p>
          <div className="flex gap-4 justify-center">
            <CustomButton
              variant="primary"
              onClick={() => {
                document.cookie = 'caligym_age_verified=true; max-age=31536000';
                document.getElementById('age-modal')?.classList.add('hidden');
              }}
            >
              I Confirm
            </CustomButton>
            <CustomButton
              variant="secondary"
              onClick={() => window.location.href = 'https://www.google.com'}
            >
              Leave
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <div className="cookie-banner" id="cookie-banner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-250px">
            <p className="text-sm mb-2">
              We use cookies to improve your experience. Choose which cookies you allow.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <label className="flex items-center gap-1 text-slate-400">
                <input type="checkbox" checked disabled /> Functional (required)
              </label>
              <label className="flex items-center gap-1 text-slate-400">
                <input type="checkbox" id="cookie-analytics" /> Analytics
              </label>
              <label className="flex items-center gap-1 text-slate-400">
                <input type="checkbox" id="cookie-marketing" /> Marketing
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <CustomButton
              variant="primary"
              size="sm"
              onClick={() => {
                const consent = {
                  functional: true,
                  analytics: (document.getElementById('cookie-analytics') as HTMLInputElement).checked,
                  marketing: (document.getElementById('cookie-marketing') as HTMLInputElement).checked,
                  timestamp: new Date().toISOString(),
                };
                localStorage.setItem('caligym_cookie_consent', JSON.stringify(consent));
                document.getElementById('cookie-banner')?.style.setProperty('display', 'none');
              }}
            >
              Accept Selected
            </CustomButton>
            <CustomButton
              variant="secondary"
              size="sm"
              onClick={() => {
                const consent = { functional: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
                localStorage.setItem('caligym_cookie_consent', JSON.stringify(consent));
                document.getElementById('cookie-banner')?.style.setProperty('display', 'none');
              }}
            >
              Decline Optional
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Problem/Solution Section */}
      <section className="section-padding bg-navy">
        <div className="max-w-7xl mx-auto">
          <div className="problem-solution grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="card p-8 flex items-center justify-center"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-slate-500 font-medium">Problem illustration</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Why Most People Plateau</h2>
              <ul className="list-arrows space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={feature.name}
                    className="text-lg text-offwhite"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="text-orange mr-2">{feature.icon}</span>
                    <strong>{feature.name}:</strong> {feature.description}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="section-padding" id="skills">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Build Real Strength, Step by Step</h2>
          <p className="text-slate-400 text-center mb-12">
            Start with foundational skills and progress to advanced calisthenics
          </p>

          <div className="skills-grid grid grid-cols-1 md:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  variant="card"
                  className="h-64"
                />
              ))
            ) : (
              [
                { id: 'pull-ups', name: 'Pull-ups', difficulty: 3, tier: 'free', unlocked: true, description: 'Upper body strength and lat development' },
                { id: 'push-ups', name: 'Push-ups', difficulty: 1, tier: 'free', unlocked: true, description: 'Builds upper body foundational strength' },
                { id: 'squats', name: 'Squats', difficulty: 1, tier: 'free', unlocked: true, description: 'Foundation for all lower-body strength' },
                { id: 'handstand', name: 'Handstand', difficulty: 2, tier: 'paid', unlocked: false, description: 'Shoulder stability and balance' },
              ].map((skill) => (
                <SkillCard
                  key={skill.id}
                  {...skill}
                  onViewTutorial={(id) => console.log('View tutorial:', id)}
                  onUnlock={(id) => console.log('Unlock:', id)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="section-padding bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Interactive Exercise Demo</h2>
          <p className="text-slate-400 mb-8">
            Explore form and muscle activation in 3D
          </p>
          <motion.div
            className="demo-canvas min-h-[400px] rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-slate-500">Three.js canvas loads here</span>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Pricing Section */}
      <section className="section-padding bg-navy" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Straightforward Pricing</h2>
          <p className="text-slate-400 mb-8">No hidden fees. Cancel anytime.</p>

          <div className="pricing-toggle flex justify-center mb-8">
            <button
              className={cn(
                'px-6 py-2 rounded-full border border-slate-800 transition-colors',
                'active-bg-orange active-text-white',
                'text-slate-400 hover:text-offwhite'
              )}
              onClick={() => setShowPricing(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                'px-6 py-2 rounded-full border border-slate-800 transition-colors',
                'text-slate-400 hover:text-offwhite'
              )}
              onClick={() => setShowPricing(true)}
            >
              Annual
            </button>
          </div>

          <div className="pricing-cards grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coach Plan */}
            <motion.div
              className="card rounded-lg p-8 text-left"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl font-bold">Coach</h3>
                <span className="bg-slate-800 text-orange px-3 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              </div>
              <p className="text-3xl font-bold mb-6">
                ${showPricing ? '7.99' : '9.99'}<span className="text-lg text-slate-400">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'All beginner and intermediate skills',
                  'AI coaching feedback',
                  'Progress tracking dashboard',
                  'Email support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-orange">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <CustomButton className="w-full">Choose Coach</CustomButton>
            </motion.div>

            {/* Master Plan */}
            <motion.div
              className="card card-accent rounded-lg p-8 text-left"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Master</h3>
              <p className="text-3xl font-bold mb-6">
                ${showPricing ? '15.99' : '19.99'}<span className="text-lg text-slate-400">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Coach',
                  'Advanced skills (muscle-up, planche)',
                  '3D interactive exercise demos',
                  'Priority coaching response',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-orange">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <CustomButton className="w-full">Choose Master</CustomButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                question: 'What fitness level do I need to start?',
                answer: 'CaliGym is designed for all levels. Beginner skills start with wall push-ups and assisted squats. The AI coaching adapts recommendations to your current ability, so you always train at the right intensity.',
              },
              {
                question: 'How does the AI coaching work?',
                answer: 'After each workout log, our AI reviews your rep counts, session frequency, and self-reported difficulty. It then suggests whether to progress, maintain, or deload for the next session. Recommendations are evidence-based and personalized.',
              },
              {
                question: 'Can I cancel my subscription?',
                answer: 'Yes, cancel at any time from your Settings page. You will retain access until the end of your billing period. See our refund policy for details on our 14-day money-back guarantee.',
              },
              {
                question: 'Do I need equipment?',
                answer: 'Most beginner and intermediate exercises require no equipment. For pull-ups and dips, you will need a pull-up bar and parallel bars (or sturdy furniture). The skill pages note equipment requirements for each exercise.',
              },
              {
                question: 'How is my data handled?',
                answer: 'We collect only what is necessary: email, name, age, fitness level, workout logs. Your data is stored securely and never sold. You can request full data deletion at any time.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="faq-question w-full text-left p-4 flex justify-between items-center"
                  onClick={(e) => {
                    const answer = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('span');
                    if (answer && icon) {
                      answer.classList.toggle('open');
                      icon.textContent = answer.classList.contains('open') ? '−' : '+';
                    }
                  }}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className="text-2xl">+</span>
                </button>
                <div className="faq-answer bg-navy p-4 hidden">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding bg-navy border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Cali<span className="text-orange">Gym</span>
              </div>
              <p className="text-sm text-slate-400 mb-2">CaliGym LLC</p>
              <p className="text-sm text-slate-400 mb-2">123 Fitness Ave, Austin, TX 78701</p>
              <p className="text-sm text-slate-400 mb-2">Phone: (512) 555-0142</p>
              <p className="text-sm text-slate-400">Email: support@caligym.io</p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-offwhite">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'].map((link) => (
                  <li key={link}>
                    <a href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-400 hover:text-orange transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-offwhite">Product</h4>
              <ul className="space-y-2">
                {['Skills', 'Dashboard', 'Settings'].map((link) => (
                  <li key={link}>
                    <a href={`/${link.toLowerCase()}`} className="text-sm text-slate-400 hover:text-orange transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-offwhite">Stay Updated</h4>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite"
                />
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="email-consent-footer" className="mt-1" />
                  <label htmlFor="email-consent-footer" className="text-xs text-slate-400">
                    I agree to receive marketing emails. You can{' '}
                    <a href="/settings" className="text-orange hover:underline">
                      unsubscribe
                    </a>{' '}
                    anytime.
                  </label>
                </div>
                <CustomButton size="sm" className="w-full">
                  Subscribe
                </CustomButton>
              </form>
              <div className="flex gap-4 mt-4">
                {[
                  { href: 'https://github.com/caligym', icon: 'github' },
                  { href: 'https://twitter.com/caligym', icon: 'twitter' },
                  { href: 'https://youtube.com/@caligym', icon: 'youtube' },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    className="text-slate-400 hover:text-orange transition-colors"
                    aria-label={`${social.icon} link`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon === 'github' && (
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      )}
                      {social.icon === 'twitter' && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      )}
                      {social.icon === 'youtube' && (
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; 2026 CaliGym LLC. All rights reserved. Powered by evidence-based exercise science.
          </div>
        </div>
      </footer>
    </div>
  );
}