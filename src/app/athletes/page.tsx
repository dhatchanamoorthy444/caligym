'use client';
import React, { useState } from 'react';
import { Award, MapPin, Play, Globe } from 'lucide-react';

const ATHLETES = [
  { slug: 'hannibal', name: 'Hannibal For King', country: 'USA', disc: 'Street Workout', spec: 'Freestyle & Strength', bio: 'Influential figure in modern street workout. Known for athleticism and motivational content.', hl: ['Pioneer of modern street workout', 'Explosive freestyle combinations'], era: '2010s–Present', cat: 'Freestyle' },
  { slug: 'frank', name: 'Frank Medrano', country: 'USA', disc: 'Calisthenics', spec: 'Explosive Skills', bio: 'Renowned for explosive calisthenics skills. His videos went viral worldwide.', hl: ['Viral calisthenics pioneer', 'Human flag specialist'], era: '2000s–2010s', cat: 'Strength' },
  { slug: 'maksim', name: 'Maksim Trukhonovets', country: 'Belarus', disc: 'Street Workout', spec: 'Strength Elements', bio: 'Multiple world champion known for strength elements and one-arm pull-ups.', hl: ['Multiple World Champion', 'One-arm pull-up mastery'], era: '2010s–Present', cat: 'Strength' },
  { slug: 'alain', name: 'Alain Haller', country: 'France', disc: 'Calisthenics', spec: 'Planche & Lever', bio: 'Known for planche and front lever combinations.', hl: ['Planche specialist', 'Front lever combinations'], era: '2010s–Present', cat: 'Skill' },
  { slug: 'marcello', name: 'Marcello Barros', country: 'Brazil', disc: 'Street Workout', spec: 'Freestyle', bio: 'Brazilian legend known for creative freestyle and technical precision.', hl: ['Technical freestyle pioneer', 'Creative combinations'], era: '2010s–Present', cat: 'Freestyle' },
  { slug: 'dennis', name: 'Dennis Peters', country: 'Netherlands', disc: 'Calisthenics', spec: 'Skill Mastery', bio: 'Dutch athlete known for handstand and planche skill mastery.', hl: ['Handstand specialist', 'Planche progression master'], era: '2010s–Present', cat: 'Skill' }
];

const CATS = ['All', 'Freestyle', 'Strength', 'Skill'];

export default function AthletesPage() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? ATHLETES : ATHLETES.filter(a => a.cat === cat);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><Award className="w-3.5 h-3.5" /> The Legends</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Masters of <span className="text-amber-400">the Craft</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">The athletes who pushed the boundaries of human performance.</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-12">
          {CATS.map((c) => (<button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cat === c ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'}`}>{c}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <div key={a.slug} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-2xl font-black text-amber-400 shrink-0">{a.name.charAt(0)}</div>
                <div><h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">{a.name}</h3><div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="w-3 h-3" />{a.country}</div></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">{a.disc}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">{a.spec}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{a.bio}</p>
              <div className="space-y-1.5 mb-4">{a.hl.map((h, i) => (<div key={i} className="flex items-center gap-2 text-xs text-slate-500"><div className="w-1 h-1 rounded-full bg-amber-500" />{h}</div>))}</div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">{a.era}</span>
                <div className="flex items-center gap-2">
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"><Play className="w-3.5 h-3.5" /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-pink-400 transition-colors"><Globe className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}