'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

const MOTIVATIONAL_MESSAGES = [
  { text: "One more rep.", sub: "That's all it takes." },
  { text: "Your future skill is built by today's boring reps.", sub: "Discipline over motivation." },
  { text: "Strength is earned.", sub: "Not given. Not bought." },
  { text: "Consistency beats intensity.", sub: "Every single time." },
  { text: "Master the basics.", sub: "The rest will follow." },
  { text: "Your body is the only equipment you need.", sub: "Everything else is a bonus." },
  { text: "Progress is invisible until it's undeniable.", sub: "Keep showing up." },
  { text: "The hardest rep is the first one.", sub: "After that, you're already moving." },
  { text: "Train smart.", sub: "Recover harder." },
  { text: "Build the impossible.", sub: "One session at a time." },
  { text: "Earned, not given.", sub: "That's the calisthenics way." },
  { text: "Motion creates emotion.", sub: "Move how you want to feel." },
];

export const DailyMotivation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const today = new Date().getDate();
    setCurrentIndex(today % MOTIVATIONAL_MESSAGES.length);
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOTIVATIONAL_MESSAGES.length);
      setIsAnimating(false);
    }, 300);
  };

  const current = MOTIVATIONAL_MESSAGES[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          Daily Motivation
        </div>
        
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
            {current.text}
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 font-medium">
            {current.sub}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
          Next message
        </button>
      </div>
    </section>
  );
};

export default DailyMotivation;