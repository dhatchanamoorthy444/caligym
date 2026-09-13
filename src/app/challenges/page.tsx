'use client';
import React, { useState } from 'react';
import { Trophy, Clock, Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const C = [
  { id: '1', t: '7-Day Push-Up Challenge', d: '7 Days', diff: 'Beginner', xp: 500, de: 'Build your push-up foundation with progressive daily targets.', p: 2847, b: 'Push-Up Initiate', o: ['Day 1-3: Knee & incline push-ups', 'Day 4: Recovery', 'Day 5-7: Standard push-ups progression'] },
  { id: '2', t: '30-Day Pull-Up Journey', d: '30 Days', diff: 'Intermediate', xp: 1500, de: 'From dead hang to your first strict pull-up.', p: 1923, pr: 65, b: 'Pull-Up Warrior', o: ['Week 1: Dead hangs + negatives', 'Week 2-3: Assisted pull-ups', 'Week 4: Full strict pull-ups'] },
  { id: '3', t: 'First Muscle-Up Challenge', d: '21 Days', diff: 'Advanced', xp: 2000, de: 'Complete progression to your first bar muscle-up.', p: 876, b: 'Muscle-Up Master', o: ['Week 1: Explosive pull-ups + dips', 'Week 2: Transition drills', 'Week 3: Full attempts'] },
  { id: '4', t: 'Handstand Month', d: '30 Days', diff: 'Intermediate', xp: 1200, de: 'Wall walks to freestanding handstand.', p: 1456, pr: 30, b: 'Handstand Hero', o: ['Week 1: Wall walks', 'Week 2: Wall holds', 'Week 3: Freestanding attempts', 'Week 4: Freestanding holds'] },
  { id: '5', t: 'Core Control Challenge', d: '14 Days', diff: 'Beginner', xp: 800, de: 'Build an iron core with hollow body progressions.', p: 3241, b: 'Core Crusher', o: ['Days 1-4: Hollow body', 'Days 5-8: Plank variations', 'Days 9-14: L-sit progressions'] },
  { id: '6', t: '100 Rep Weekend', d: '2 Days', diff: 'Intermediate', xp: 600, de: 'Complete 100 reps over one weekend.', p: 1876, b: 'Century Club', o: ['Saturday: 50 reps', 'Sunday: 50 reps'] }
];

const DC: Record<string, string> = { Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };

export default function ChallengesPage() {
  const [f, setF] = useState('all');
  const [ex, setEx] = useState<string | null>(null);
  const list = f === 'all' ? C : C.filter(c => c.diff === f);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><Trophy className="w-3.5 h-3.5" /> Challenges</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Test Your <span className="text-amber-400">Limits</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Structured challenges with daily objectives, XP rewards, and badges.</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-10">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((x) => (<button key={x} onClick={() => setF(x)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${f === x ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-500/40'}`}>{x === 'all' ? 'All' : x}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${DC[c.diff]}`}>{c.diff}</span><div className="flex items-center gap-1 text-amber-400"><Zap className="w-3.5 h-3.5" /><span className="text-xs font-bold">{c.xp} XP</span></div></div>
                <h3 className="text-xl font-black text-white mb-2">{c.t}</h3>
                <p className="text-slate-400 text-sm mb-4">{c.de}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4"><div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.d}</div><div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.p.toLocaleString()}</div></div>
                {c.pr !== undefined && (<div className="mb-4"><div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-400">Progress</span><span className="text-amber-400 font-bold">{c.pr}%</span></div><div className="w-full h-2 bg-slate-800 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${c.pr}%` }} /></div></div>)}
                <button onClick={() => setEx(ex === c.id ? null : c.id)} className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-bold hover:border-amber-500/40 flex items-center justify-center gap-2">{ex === c.id ? 'Hide' : 'View'}<ArrowRight className={`w-4 h-4 text-amber-400 transition-transform ${ex === c.id ? 'rotate-90' : ''}`} /></button>
              </div>
              {ex === c.id && (<div className="border-t border-slate-800 p-6 bg-slate-950/50"><h4 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-3">Objectives</h4>{c.o.map((o, i) => (<div key={i} className="flex items-center gap-3 mb-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span className="text-slate-300 text-sm">{o}</span></div>))}<div className="pt-3 mt-3 border-t border-slate-800 text-sm"><span className="text-slate-400">Reward: </span><span className="text-amber-400 font-bold">{c.b}</span></div></div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}