'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { WorkoutMascot } from '../../components/WorkoutMascot';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { getMissingSupabaseEnv } from '../../lib/supabase-browser';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, resetPassword, configured, loading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartTime = React.useRef<number>(0);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setIsSubmitting(true);

    if (honeypot) {
      setError('Suspicious activity detected. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const elapsed = Date.now() - formStartTime.current;
    if (elapsed < 2000) {
      setError('Request submitted too quickly. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const signInResult = await signIn(emailOrUsername, password);
      if (signInResult.success) {
        if (signInResult.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(signInResult.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [emailOrUsername, password, honeypot, signIn, router]);

  const handleForgotPassword = useCallback(async () => {
    setError('');
    setNotice('');
    const value = (emailOrUsername || '').trim();
    if (!value.includes('@')) {
      setError('Enter your email address first to receive a reset link.');
      return;
    }
    try {
      const result = await resetPassword(value);
      if (result.success) {
        setNotice('Password reset link sent! Check your inbox.');
      } else {
        setError(result.error || 'Failed to send reset email.');
      }
    } catch {
      setError('Failed to send reset email.');
    }
  }, [emailOrUsername, resetPassword]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto">
            <WorkoutMascot exercise="pushup" size="lg" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Welcome to CaliGym</h1>
            <p className="text-sm text-slate-400 mt-2">Log in with your email or username and password</p>
          </div>
        </div>

        {/* Status Alerts */}
        {error && (
          <Alert variant="error" title="Sign In Failed">
            {error}
          </Alert>
        )}
        {notice && (
          <Alert variant="success" title="Check Your Inbox">
            {notice}
          </Alert>
        )}

        {/* Login Card */}
        <Card variant="elevated" padding="xl" hover={false}>
          <CardHeader>
            <CardTitle>Sign In to Your Account</CardTitle>
            <CardDescription>Access your workout plans, progress, and skill tree</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email or Username"
                type="text"
                required
                autoComplete="username"
                placeholder="you@example.com or alex_athlete"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                disabled={isSubmitting || loading}
                error={undefined}
              />

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-400">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isSubmitting || loading}
                    className="text-xs text-amber-400 hover:underline font-semibold disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting || loading}
                  error={undefined}
                />
              </div>

              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="new-password"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute left-[-5000px] top-auto w-0 h-0 overflow-hidden"
                aria-hidden="true"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? 'Please wait...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-xs text-slate-400 w-full">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-amber-400 font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-slate-500">
            Secure authentication powered by Supabase
          </p>
          {!configured && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <p className="text-xs text-amber-400 font-semibold">
                Supabase authentication is not configured yet.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Missing in your environment: {getMissingSupabaseEnv().join(', ')}.
                Add them in Vercel → Settings → Environment Variables (Production), then redeploy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}