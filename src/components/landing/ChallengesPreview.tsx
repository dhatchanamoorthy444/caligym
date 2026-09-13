'use client';

import React from 'react';
import { Trophy, Clock, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Challenge {
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  description: string;
  participants: number;
}

const CHALLENGES: Challenge[] = [
  {
    title: '7-Day Push-Up Challenge',
    duration: '7 Days',
    difficulty: 'Beginner',
    xp: 500,
    description: 'Build your push-up foundation with progressive daily targets.',
    participants: 2847
  },
  {
    title: '30-Day Pull-Up Journey',
    duration: '30 Days',
    difficulty: 'Intermediate',
    xp: 1500,
    description: 'From dead hang to your first strict pull-up in one month.',
    participants: 1923
  },
  {
    title: 'First Muscle-Up Challenge',
    duration: '21 Days',
    difficulty: 'Advanced',
    xp: 2000,
    description: 'The complete progression to your first bar muscle-up.',
    participants: 876
  },
  {
    title: 'Handstand Month',
    duration: '30 Days',
    difficulty: 'Intermediate',
    xp: 1200,
    description: 'Wall walks to freestanding — master the handstand in 30 days.',
    participants: 1456
  }
];

const DIFFICULTY_COLORS = {
  Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
};

export const ChallengesPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Challenges
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Test Your <span className="text-amber-400">Limits</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Structured challenges with daily objectives, XP rewards, and achievement badges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {CHALLENGES.map((challenge) => (
            <div
              key={challenge.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{challenge.xp} XP</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                {challenge.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{challenge.description}</p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {challenge.duration}
                </div>
                <span>{challenge.participants.toLocaleString()} joined</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-colors"
          >
            View All Challenges
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChallengesPreview;