'use client';

import { useState } from 'react';
import { CustomButton } from '@/components/ui/button';
import { CustomInput } from '@/components/ui/input';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.username || !formData.password) {
        setError('Please enter both username and password');
        return;
      }
      // Login logic - would connect to auth backend
      setError('');
      alert('Login successful! Welcome to CaliGym.');
    } else {
      // Signup logic - requires email and phone for reset
      if (!formData.username || !formData.password || !formData.email || !formData.phone) {
        setError('Please fill all fields: username, password, email, and phone');
        return;
      }
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email for password reset');
        return;
      }
      // Phone validation basic check
      if (formData.phone.length < 7) {
        setError('Please enter a valid phone number for account recovery');
        return;
      }
      setError('');
      alert('Account created! Check your email for verification. Phone number saved for password reset.');
    }
  };

  return (
    <div className="min-h-screen bg-darkbg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold text-offwhite">
            Cali<span className="text-orange">Gym</span>
          </a>
          <p className="text-slate-400 mt-2">
            {isLogin ? 'Welcome back. Sign in to continue training.' : 'Create your account. Start your 90-day journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {!isLogin && (
            <>
              <CustomInput
                label="Email Address"
                type="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <CustomInput
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <p className="text-xs text-slate-500 -mt-2">
                Email and phone are required for account recovery and password reset.
              </p>
            </>
          )}

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-900/50 rounded-md text-sm text-red-400">
              {error}
            </div>
          )}

          <CustomButton type="submit" className="w-full mt-2 btn-primary glow-hover">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CustomButton>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-orange hover:underline"
          >
            {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            By signing in or creating an account, you agree to our{' '}
            <a href="/terms" className="text-orange hover:underline">Terms of Service</a>{' '}
            and confirm you are{' '}
            <span className="text-offwhite font-medium">18 years or older</span>.
          </p>
        </div>
      </div>
    </div>
  );
}