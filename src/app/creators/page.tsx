'use client';

import React, { useState } from 'react';
import { Users, MapPin, Play, Globe } from 'lucide-react';

interface Creator { name: string; handle: string; country: string; focus: string; description: string; followers: string; category: string; }

const CREATORS: Creator[] = [
  { name: 'FitnessFAQs', handle: 'FitnessFAQs', country: 'Australia', focus: 'Skills & Technique', description: 'In-depth tutorials on calisthenics skills and exercise science.', followers: '2.1M', category: 'Skills' },
  { name: 'Caliverse', handle: 'Caliverse', country: 'Germany', focus: 'Beginner Education', description: 'Making calisthenics accessible to complete beginners.', followers: '890K', category: 'Beginner' },
  { name: 'Tom Merrick', handle: 'TomMerrick', country: 'UK', focus: 'Movement & Mobility', description: 'Movement specialist focusing on mobility and body control.', followers: '1.5M', category: 'Mobility' },
  { name: 'MOVE', handle: 'MOVE', country: 'Germany', focus: 'Freestyle', description: 'Freestyle calisthenics showcasing creative combinations.', followers: '1.2M', category: 'Freestyle' },
  { name: 'Simonster', handle: 'Simonster', country: 'USA', focus: 'Strength', description: 'Advanced calisthenics strength training and progressions.', followers: '750K', category: 'Strength' },
  { name: 'Sondur', handle: 'Sondur', country: 'India', focus: 'Street Workout', description: 'Indian street workout athlete sharing training tips.', followers: '520K', category: 'Street Workout' },
  { name: 'Voyen', handle: 'Voyen', country: 'Algeria', focus: 'Strength & Skills', description: 'Known for incredible strength and skill combos.', followers: '680K', category: 'Strength' },
  { name: 'Osvaldo', handle: 'Osvaldo', country: 'Brazil', focus: 'Motivation', description: 'Content focused on motivation and transformation.', followers: '430K', category: 'Motivation' }
];

const CATEGORIES = ['All', 'Skills', 'Beginner', 'Mobility', 'Freestyle', 'Strength', 'Street Workout', 'Motivation'];

export default function CreatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filtered = selectedCategory === 'All' ? CREATORS : CREATORS.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><Users className="w-3.5 h-3.5" /> The Movement</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Creators & <span className="text-amber-400">Educators</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">The educators and creators making calisthenics accessible worldwide.</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'}`}>{cat}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((creator) => (
            <div key={creator.handle} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-2xl font-black text-amber-400 mb-4">{creator.name.charAt(0)}</div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors mb-1">{creator.name}</h3>
              <p className="text-amber-400/70 text-sm font-semibold mb-2">@{creator.handle}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3"><MapPin className="w-3 h-3" />{creator.country}<span className="w-1 h-1 rounded-full bg-slate-700" /><span>{creator.followers}</span></div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{creator.description}</p>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">{creator.focus}</span>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"><Play className="w-4 h-4" /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-pink-400 transition-colors"><Globe className="w-4 h-4" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}