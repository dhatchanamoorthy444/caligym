'use client';

import React, { useState } from 'react';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SkillNode {
  name: string;
  level: number;
  unlocked: boolean;
  current?: boolean;
}

interface SkillPath {
  name: string;
  color: string;
  skills: SkillNode[];
}

const SKILL_PATHS: SkillPath[] = [
  {
    name: 'PUSH PATH',
    color: 'amber',
    skills: [
      { name: 'Push-Up', level: 1, unlocked: true },
      { name: 'Diamond Push-Up', level: 2, unlocked: true },
      { name: 'Pseudo Planche Push-Up', level: 3, unlocked: false, current: true },
      { name: 'Tuck Planche', level: 4, unlocked: false },
      { name: 'Straddle Planche', level: 5, unlocked: false },
      { name: 'Full Planche', level: 6, unlocked: false },
    ]
  },
  {
    name: 'PULL PATH',
    color: 'emerald',
    skills: [
      { name: 'Dead Hang', level: 1, unlocked: true },
      { name: 'Pull-Up', level: 2, unlocked: true },
      { name: 'Archer Pull-Up', level: 3, unlocked: false, current: true },
      { name: 'Muscle-Up', level: 4, unlocked: false },
      { name: 'One-Arm Pull-Up', level: 5, unlocked: false },
      { name: 'Front Lever', level: 6, unlocked: false },
    ]
  },
  {
    name: 'HANDSTAND PATH',
    color: 'violet',
    skills: [
      { name: 'Pike Push-Up', level: 1, unlocked: true },
      { name: 'Wall Handstand', level: 2, unlocked: true },
      { name: 'Freestanding Handstand', level: 3, unlocked: false, current: true },
      { name: 'Handstand Push-Up', level: 4, unlocked: false },
      { name: 'Press Handstand', level: 5, unlocked: false },
      { name: 'One-Arm Handstand', level: 6, unlocked: false },
    ]
  }
];

export const SkillTreePreview: React.FC = () => {
  const [activePath, setActivePath] = useState(0);
  const path = SKILL_PATHS[activePath];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            The Skill <span className="text-amber-400">Tree</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Every skill has a path. Every path has progressions. See exactly where you are and what comes next.
          </p>
        </div>

        {/* Path Selector */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {SKILL_PATHS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setActivePath(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
                idx === activePath
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Skill Tree Visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4">
            {path.skills.map((skill, idx) => (
              <React.Fragment key={skill.name}>
                <div
                  className={`flex flex-col items-center min-w-[100px] sm:min-w-[120px] p-4 rounded-2xl border transition-all ${
                    skill.unlocked
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : skill.current
                      ? 'bg-amber-500/10 border-amber-500/30 ring-2 ring-amber-500/20'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    skill.unlocked
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : skill.current
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-800 text-slate-600'
                  }`}>
                    {skill.unlocked ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : skill.current ? (
                      <ArrowRight className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-xs sm:text-sm font-bold text-center ${
                    skill.unlocked
                      ? 'text-emerald-400'
                      : skill.current
                      ? 'text-amber-400'
                      : 'text-slate-500'
                  }`}>
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-slate-600 mt-1">L{skill.level}</span>
                </div>
                {idx < path.skills.length - 1 && (
                  <div className={`w-4 sm:w-8 h-0.5 ${
                    skill.unlocked ? 'bg-emerald-500/40' : 'bg-slate-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/skill-tree"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold hover:border-amber-500/40 transition-all"
          >
            Explore Full Skill Tree
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillTreePreview;