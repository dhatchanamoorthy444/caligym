'use client';

import { useState } from 'react';
import { CustomButton } from '@/components/ui/button';
import { CustomCard } from '@/components/ui/card';

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailFrequency: 'weekly',
    publicProgress: false,
    analyticsOptOut: false,
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-4xl mx-auto section-padding">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="settings-grid grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navigation */}
          <nav className="md:col-span-1">
            <ul className="settings-nav space-y-2">
              {[
                { id: 'preferences', label: 'Preferences' },
                { id: 'account', label: 'Account' },
                { id: 'privacy', label: 'Privacy' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="settings-nav-item block px-4 py-2 rounded-md text-sm transition-colors active:bg-navy active:text-offwhite text-slate-400 hover:text-offwhite"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById(`section-${item.id}`);
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Settings Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Preferences Section */}
            <section id="section-preferences" className="settings-section active">
              <CustomCard className="rounded-lg">
                <h2 className="text-lg font-semibold mb-6">Preferences</h2>

                <div className="space-y-4">
                  <div className="toggle-row flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                      <div className="toggle-label font-medium">Workout reminder notifications</div>
                      <div className="toggle-sub text-sm text-slate-500">Receive a daily nudge at your preferred time</div>
                    </div>
                    <label className="toggle-switch relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                        className="sr-only"
                      />
                      <span className="slider absolute inset-0 bg-slate-600 rounded-full transition-colors cursor-pointer"></span>
                    </label>
                  </div>

                  <div className="px-4 py-3">
                    <div className="toggle-label font-medium mb-2">Email frequency</div>
                    <select
                      value={preferences.emailFrequency}
                      onChange={(e) => handlePreferenceChange('emailFrequency', e.target.value)}\n                      className="w-full max-w-xs p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="off">Off</option>
                    </select>
                  </div>

                  <div className="px-4 py-3 mt-4">
                    <a
                      href="mailto:support@caligym.io?subject=Unsubscribe%20Request"
                      className="text-orange hover:underline text-sm"
                    >
                      Unsubscribe from all marketing emails
                    </a>
                    <p className="text-xs text-slate-500 mt-1">GDPR/CCPA compliant. Takes effect immediately.</p>
                  </div>
                </div>
              </CustomCard>
            </section>

            {/* Account Section */}
            <section id="section-account" className="settings-section">
              <CustomCard className="rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-6">Change Password</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Current password</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">New password</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite"
                      required
                      minLength={12}
                    />
                    <p className="text-xs text-slate-500 mt-1">Minimum 12 characters. Include numbers and symbols.</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Confirm new password</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite"
                      required
                    />
                  </div>
                  <CustomButton size="sm">Update Password</CustomButton>
                </form>
              </CustomCard>

              <CustomCard className="rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-3">Two-Factor Authentication</h2>
                <p className="text-sm text-slate-400 mb-4">Add an extra layer of security to your account.</p>
                <CustomButton variant="secondary" size="sm">Enable 2FA</CustomButton>
              </CustomCard>

              <CustomCard className="rounded-lg danger-zone border border-red-900/50">
                <h2 className="text-lg font-semibold text-red-400 mb-3">Data Deletion Request</h2>
                <p className="text-sm text-slate-400 mb-4">
                  You have the right to request deletion of all your personal data (GDPR Article 17, CCPA 1798.105).
                  This is irreversible and will cancel your membership.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Confirm your email"
                    required
                    className="w-full p-2 bg-darkbg border border-red-900/50 rounded text-sm text-offwhite"
                  />
                  <p className="text-xs text-slate-500">
                    A deletion request will be sent to support@caligym.io and processed within 30 days.
                  </p>
                  <CustomButton
                    className="bg-red-900 text-red-100 hover:bg-red-800"
                    size="sm"
                  >
                    Request Deletion
                  </CustomButton>
                </form>
              </CustomCard>
            </section>

            {/* Privacy Section */}
            <section id="section-privacy" className="settings-section">
              <CustomCard className="rounded-lg">
                <h2 className="text-lg font-semibold mb-6">Privacy Controls</h2>

                <div className="space-y-4">
                  <div className="toggle-row flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                      <div className="toggle-label font-medium">Share progress publicly</div>
                      <div className="toggle-sub text-sm text-slate-500">Allow others to see your skill progress on leaderboards</div>
                    </div>
                    <label className="toggle-switch relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        checked={preferences.publicProgress}
                        onChange={(e) => handlePreferenceChange('publicProgress', e.target.checked)}
                        className="sr-only"
                      />
                      <span className="slider absolute inset-0 bg-slate-600 rounded-full transition-colors cursor-pointer"></span>
                    </label>
                  </div>

                  <div className="toggle-row flex items-center justify-between py-3 border-b border-slate-800">
                    <div>
                      <div className="toggle-label font-medium">Analytics opt-out</div>
                      <div className="toggle-sub text-sm text-slate-500">Disable usage analytics (Vercel Analytics, session data)</div>
                    </div>
                    <label className="toggle-switch relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        checked={preferences.analyticsOptOut}
                        onChange={(e) => handlePreferenceChange('analyticsOptOut', e.target.checked)}
                        className="sr-only"
                      />
                      <span className="slider absolute inset-0 bg-slate-600 rounded-full transition-colors cursor-pointer"></span>
                    </label>
                  </div>

                  <div className="px-4 py-4 mt-4 bg-navy rounded-lg">
                    <p className="text-sm text-slate-400 mb-2">Data we collect: email, name, age, fitness level, workout logs.</p>
                    <p className="text-sm text-slate-400">
                      See our{' '}
                      <a href="/privacy" className="text-orange hover:underline">
                        Privacy Policy
                      </a>{' '}
                      for full details.
                    </p>
                  </div>
                </div>
              </CustomCard>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}