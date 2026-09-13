'use client';

import React, { useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';

interface TimelinePeriod {
  period: string;
  title: string;
  story: string;
  keyDevelopment: string;
  icon: string;
}

const TIMELINE_DATA: TimelinePeriod[] = [
  {
    period: 'Ancient Greece',
    title: 'The Birth of Gymnastics',
    story: 'The word "gymnastics" comes from the Greek "gymnazein" — to train naked. Ancient Greek athletes used bodyweight exercises as the foundation of physical education.',
    keyDevelopment: 'Systematic bodyweight training as education',
    icon: '🏛️'
  },
  {
    period: '19th Century',
    title: 'Friedrich Jahn & The Turnverein',
    story: 'Friedrich Ludwig Jahn established the first open-air gymnasium in Germany. He created apparatus still used today — parallel bars, horizontal bar, and vaulting horse.',
    keyDevelopment: 'Invention of modern gymnastics apparatus',
    icon: '🇩🇪'
  },
  {
    period: 'Early 1900s',
    title: 'Global Gymnastics Movement',
    story: 'Gymnastics spread worldwide through schools, military training, and athletic clubs. The sport became an Olympic event in 1896.',
    keyDevelopment: 'Olympic recognition and global spread',
    icon: '🌍'
  },
  {
    period: '1960s–1970s',
    title: 'Street Culture Meets Fitness',
    story: 'In urban America, athletes began using playground equipment for strength training. The "muscle beach" tradition evolved into street workout.',
    keyDevelopment: 'Birth of street workout culture',
    icon: '🏙️'
  },
  {
    period: '1990s–2000s',
    title: 'The Internet Era',
    story: 'Online forums and early video platforms connected bodyweight athletes worldwide. Communities shared progressions, making advanced skills accessible.',
    keyDevelopment: 'Global online calisthenics community',
    icon: '💻'
  },
  {
    period: '2010s–Present',
    title: 'The Modern Movement',
    story: 'Street workout became a competitive sport with world championships. Social media brought calisthenics to billions of people worldwide.',
    keyDevelopment: 'Competitive street workout and social media era',
    icon: '🚀'
  }
];

export const CalisthenicsTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TIMELINE_DATA[activeIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-amber-500/10">
            <Clock className="w-3.5 h-3.5" />
            The History
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Centuries of <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Body Mastery</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            From ancient Greek gymnasiums to modern street workout championships.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {TIMELINE_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-900/80 border border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-md hover:shadow-amber-500/10 backdrop-blur-sm'
              }`}
            >
              {item.period}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-950/50 border border-slate-800/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-slate-950/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/30 to-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-700/40 to-slate-950/10 rounded-full blur-2xl -ml-24 -mb-24" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl drop-shadow-lg animate-pulse">{active.icon}</span>
                <div>
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent text-sm font-black uppercase tracking-wider">{active.period}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{active.title}</h3>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">{active.story}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/30 to-amber-600/20 border border-amber-500/50 text-white shadow-xl shadow-amber-500/20 backdrop-blur-sm">
                <ChevronRight className="w-4 h-4 text-amber-300" />
                <span className="text-amber-300 text-sm font-bold">{active.keyDevelopment}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex items-center gap-1">
            {TIMELINE_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  idx <= activeIndex ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalisthenicsTimeline;