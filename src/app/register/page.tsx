'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { getMissingSupabaseEnv } from '../../lib/supabase-browser';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, configured } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartTime = React.useRef<number>(0);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      const signUpResult = await signUp({
        name,
        username,
        email,
        password,
        avatarFile,
      });
      if (signUpResult.success) {
        if (signUpResult.needsConfirmation) {
          setError('Almost there! Check your inbox to confirm your email, then sign in.');
        } else {
          router.push('/assessment');
        }
      } else {
        setError(signUpResult.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, username, email, password, confirmPassword, avatarFile, honeypot, signUp, router]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mx-auto">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Join CaliGym</h1>
            <p className="text-sm text-slate-400 mt-2">Start your bodyweight skill progression game</p>
          </div>
        </div>

        {/* Status Alert */}
        {error && (
          <Alert
            variant={error.includes('Almost there') || error.includes('Check your inbox') ? 'success' : 'error'}
            title={error.includes('Almost there') ? 'Check Your Email' : 'Registration Failed'}
          >
            {error}
          </Alert>
        )}

        {/* Registration Card */}
        <Card variant="elevated" padding="xl" hover={false}>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Fill in your details to begin your calisthenics journey</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                required
                autoComplete="name"
                placeholder="Alex Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />

              <Input
                label="Username"
                type="text"
                required
                autoComplete="username"
                placeholder="alex_athlete"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                hint="3-20 characters, lowercase letters, numbers, underscores only"
              />

              <Input
                label="Email"
                type="email"
                required
                autoComplete="email"
                placeholder="alex@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Profile Picture (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    setAvatarFile(file || null);
                  }}
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm file:border-slate-600 file:rounded-lg file:px-3 file:py-1.5 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 transition-colors"
                />
              </div>

              <Input
                label="Password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                hint="At least 8 characters"
              />

              <Input
                label="Confirm Password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />

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
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create Account & Start Diagnostic'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-xs text-slate-400 w-full">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-400 font-bold hover:underline">
                Sign In
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