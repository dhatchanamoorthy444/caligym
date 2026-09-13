'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-12 sm:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Your Next Skill<br />
              <span className="text-amber-400">Is Waiting.</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10">
              Join thousands of athletes mastering their bodyweight. Free to start. No equipment required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-lg hover:bg-amber-400 transition-colors shadow-xl shadow-amber-500/20"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold text-lg hover:border-amber-500/50 transition-all"
              >
                Take Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;