'use client';
import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

const A = [
  { s: 'what-is-calisthenics', t: 'What Is Calisthenics?', c: 'Calisthenics 101', r: '5 min', e: 'The complete beginner\'s guide to understanding calisthenics.', f: true },
  { s: 'relative-strength', t: 'How Relative Strength Works', c: 'Strength', r: '7 min', e: 'Why being strong at your body weight matters.', f: true },
  { s: 'pullup-progression', t: 'Why Pull-Ups Are Hard', c: 'Skills', r: '6 min', e: 'The biomechanics of the pull-up.' },
  { s: 'muscleup-guide', t: 'How to Build Your First Muscle-Up', c: 'Skills', r: '10 min', e: 'Roadmap from pull-ups to muscle-up.' },
  { s: 'skill-progressions', t: 'Understanding Skill Progressions', c: 'Training Science', r: '8 min', e: 'Why you can\'t skip steps.' },
  { s: 'rest-recovery', t: 'How Rest Affects Performance', c: 'Recovery', r: '5 min', e: 'Why muscles grow during rest.' },
  { s: 'calisthenics-vs-weights', t: 'Calisthenics vs Weight Training', c: 'Training Science', r: '9 min', e: 'An honest comparison.' },
  { s: 'wrist-mobility', t: 'Wrist Preparation for Handstands', c: 'Mobility', r: '4 min', e: 'Essential wrist mobility.' },
  { s: 'nutrition-basics', t: 'Nutrition for Bodyweight Athletes', c: 'Nutrition', r: '7 min', e: 'Fuel your training and build muscle.' },
  { s: 'mindset-mastery', t: 'The Mindset of Mastery', c: 'Mindset', r: '6 min', e: 'Patience and consistency beat intensity.' }
];

const CATS = ['All', 'Calisthenics 101', 'Strength', 'Skills', 'Mobility', 'Recovery', 'Nutrition', 'Training Science', 'Mindset'];

export default function LearnPage() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const list = A.filter(a => { const c = cat === 'All' || a.c === cat; const s = a.t.toLowerCase().includes(q.toLowerCase()) || a.e.toLowerCase().includes(q.toLowerCase()); return c && s; });
  const feat = list.filter(a => a.f);
  const reg = list.filter(a => !a.f);
  const Card = ({ a }: { a: typeof A[0] }) => (
    <Link href={`/learn/${a.s}`} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all">
      <div className="flex items-center gap-2 mb-3"><span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">{a.c}</span><span className="flex items-center gap-1 text-slate-500 text-xs"><Clock className="w-3 h-3" />{a.r}</span></div>
      <h3 className="text-lg font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{a.t}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{a.e}</p>
      <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold">Read <ArrowRight className="w-4 h-4" /></span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><BookOpen className="w-3.5 h-3.5" /> Education Hub</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Learn the <span className="text-amber-400">Craft</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Premium editorial content on calisthenics, strength, and performance.</p>
        </div>
        <div className="max-w-md mx-auto mb-8"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input type="text" placeholder="Search articles..." value={q} onChange={(e) => setQ(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none text-sm" /></div></div>
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">{CATS.map((c) => (<button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cat === c ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'}`}>{c}</button>))}</div>
        {feat.length > 0 && (<div className="mb-12"><h2 className="text-xl font-black text-white mb-6">Featured</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{feat.map((a) => (<div key={a.s} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all"><div className="flex items-center gap-2 mb-3"><span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">{a.c}</span><span className="flex items-center gap-1 text-slate-500 text-xs"><Clock className="w-3 h-3" />{a.r}</span></div><h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{a.t}</h3><p className="text-slate-400 text-sm leading-relaxed mb-4">{a.e}</p><span className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold">Read <ArrowRight className="w-4 h-4" /></span></div>))}</div></div>)}
        {reg.length > 0 && (<div><h2 className="text-xl font-black text-white mb-6">All Articles</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{reg.map((a) => (<Card key={a.s} a={a} />))}</div></div>)}
        {list.length === 0 && <div className="text-center py-16"><p className="text-slate-400 text-lg">No articles found.</p></div>}
      </div>
    </div>
  );
}