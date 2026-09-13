'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Alert } from './ui/Alert';

export interface AICoachProps {
  provider?: 'gemini' | 'deepseek' | 'opencode';
  onProviderChange?: (provider: 'gemini' | 'deepseek' | 'opencode') => void;
  defaultProvider?: 'gemini' | 'deepseek' | 'opencode';
  className?: string;
}

export const AICoach: React.FC<AICoachProps> = ({
  provider: controlledProvider,
  onProviderChange,
  defaultProvider = 'gemini',
  className = '',
}) => {
  const [provider, setProvider] = useState<'gemini' | 'deepseek' | 'opencode'>(() => controlledProvider || defaultProvider);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use controlled value if provided, otherwise use internal state
  const effectiveProvider = controlledProvider ?? provider;

  // Sync internal state when controlledProvider changes (for uncontrolled mode)
  useEffect(() => {
    if (controlledProvider === undefined) {
      // Only update if we're in uncontrolled mode
      // This effect runs when controlledProvider changes from defined to undefined
    }
  }, [controlledProvider]);

  // Update internal state when controlledProvider is provided and we're switching to uncontrolled
  const handleProviderChange = useCallback((newProvider: 'gemini' | 'deepseek' | 'opencode') => {
    if (controlledProvider === undefined) {
      setProvider(newProvider);
    }
    onProviderChange?.(newProvider);
  }, [controlledProvider, onProviderChange]);

  const handleSend = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a question for your AI coach.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const apiPath = effectiveProvider === 'gemini' 
        ? '/api/chat' 
        : effectiveProvider === 'deepseek' 
          ? '/api/ai/deepseek' 
          : '/api/ai/opencode';

      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to get AI response. Please try again.');
        return;
      }

      setResponse(data.text || '');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('AI Coach error:', err);
    } finally {
      setLoading(false);
    }
  }, [prompt, effectiveProvider]);

  const handleClear = useCallback(() => {
    setPrompt('');
    setResponse('');
    setError('');
  }, []);

  const handleSuggestion = useCallback((suggestion: string) => {
    setPrompt(suggestion);
  }, []);

  const suggestions = [
    'How do I progress from tuck planche to advanced tuck?',
    'What is the best routine for front lever progression?',
    'How many sets and reps should I do for muscle-up training?',
    'What are the key cues for a proper handstand hold?',
    'How do I prevent shoulder injury while training planche?',
  ];

  return (
    <Card variant="elevated" padding="lg" hover={false} className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Coach</CardTitle>
            <CardDescription>Get personalized calisthenics guidance</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-800">
            {(['gemini', 'deepseek', 'opencode'] as const).map((p) => (
              <button
                key={p}
                onClick={() => handleProviderChange(p)}
                className={`
                  px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize
                  ${effectiveProvider === p 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}

        {response && (
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold text-amber-400 capitalize">{effectiveProvider} Coach</span>
            </div>
            <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {response}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400">
            Ask your AI coach anything
          </label>
          <Input
            type="text"
            placeholder="e.g., How do I progress from tuck planche to advanced tuck?"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
            disabled={loading}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs text-slate-500 font-semibold">Quick suggestions:</span>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors disabled:opacity-50"
              >
                {suggestion.length > 40 ? suggestion.slice(0, 40) + '...' : suggestion}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
            loading={loading}
            disabled={loading || !prompt.trim()}
            className="flex-1"
          >
            {loading ? 'Thinking...' : 'Ask Coach'}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

AICoach.displayName = 'AICoach';