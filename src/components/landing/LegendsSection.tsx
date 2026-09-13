'use client';

import React, { useState } from 'react';
import { Award } from 'lucide-react';

interface Legend {
  name: string;
  country: string;
  discipline: string;
  specialty: string;
  bio: string;
  highlights: string[];
  era: string;
}

const LEGENDS: Legend[] = [
  {
    name: 'Hannibal For King',
    country: 'USA',
    discipline: 'Street Workout',
    specialty: 'Freestyle & Strength',
    bio: 'Influential figure in modern street workout. Known for athleticism and motivational content.',
    highlights: ['Pioneer of modern street workout', 'Social media influence', 'Explosive freestyle combinations'],
    era: '2010s–Present'
  },
  {
    name: 'Frank Medrano',
    country: 'USA',
    discipline: 'Calisthenics',
    specialty: 'Explosive Skills',
    bio: 'Renowned for explosive calisthenics skills. His videos went viral worldwide.',
    highlights: ['Viral calisthenics pioneer', 'Muscle-up variations', 'Human flag specialist'],
    era: '2000s–2010s'
  },
  {
    name: 'Maksim Trukhonovets',
    country: 'Belarus',
    discipline: 'Street Workout',
    specialty: 'Strength Elements',
    bio: 'Multiple world champion known for strength elements and one-arm pull-ups.',
    highlights: ['Multiple World Champion', 'One-arm pull-up mastery', 'Front lever specialist'],
    era: '2010s–Present'
  },
  {
    name: 'Alain Haller',
    country: 'France',
    discipline: 'Calisthenics',
    specialty: 'Planche & Lever',
    bio: 'Known for planche and front lever combinations with smooth transitions.',
    highlights: ['Planche specialist', 'Front lever combinations', 'Smooth transitions'],
    era: '2010s–Present'
  },
  {
    name: 'Marcello Barros',
    country: 'Brazil',
    discipline: 'Street Workout',
    specialty: 'Freestyle',
    bio: 'Brazilian legend known for creative freestyle and technical precision.',
    highlights: ['Technical freestyle pioneer', 'South American champion', 'Creative combinations'],
    era: '2010s–Present'
  },
  {
    name: 'Dennis Peters',
    country: 'Netherlands',
    discipline: 'Calisthenics',
    specialty: 'Skill Mastery',
    bio: 'Dutch athlete known for handstand and planche skill mastery.',
    highlights: ['Handstand specialist', 'Planche progression master', 'Featured athlete'],
    era: '2010s–Present'
  }
];

export const LegendsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = LEGENDS[activeIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            The Legends
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Masters of <span className="text-amber-400">the Craft</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The athletes who pushed the boundaries of what the human body can achieve.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {LEGENDS.map((legend, idx) => (
            <button
              key={legend.name}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                idx === activeIndex
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'
              }`}
            >
              {legend.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <LegendCard legend={active} />
        </div>
      </div>
    </section>
  );
};

function LegendCard({ legend: active }: { legend: Legend }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-3xl font-black text-amber-400 shrink-0">
            {active.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">{active.name}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-amber-400 font-bold">{active.country}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="text-slate-400">{active.discipline}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="text-slate-400">{active.era}</span>
            </div>
            <p className="text-amber-400/80 text-sm font-semibold mt-1">{active.specialty}</p>
          </div>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">{active.bio}</p>
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-wider text-slate-500">Career Highlights</h4>
          {active.highlights.map((h, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-slate-300 text-sm">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LegendsSection;