'use client';
import React from 'react';
import { Users, Trophy, Flame, MessageCircle } from 'lucide-react';

const POSTS = [
  { id: 1, user: 'Alex M.', avatar: 'A', action: 'Unlocked', achievement: 'First Pull-Up', time: '2h ago', likes: 24 },
  { id: 2, user: 'Priya S.', avatar: 'P', action: 'Completed', achievement: '7-Day Push-Up Challenge', time: '5h ago', likes: 18 },
  { id: 3, user: 'Daniel K.', avatar: 'D', action: 'Hit PR', achievement: '10 Strict Pull-Ups', time: '8h ago', likes: 31 },
  { id: 4, user: 'Sarah L.', avatar: 'S', action: 'Started', achievement: 'Handstand Month', time: '1d ago', likes: 12 },
  { id: 5, user: 'Mike R.', avatar: 'M', action: 'Completed', achievement: 'Core Control Challenge', time: '1d ago', likes: 9 }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><Users className="w-3.5 h-3.5" /> Community</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">The <span className="text-amber-400">Movement</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Celebrate progress. Share wins. Stay accountable.</p>
        </div>

        <div className="space-y-4">
          {POSTS.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-sm font-black text-amber-400 shrink-0">{post.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1"><span className="text-white font-bold text-sm">{post.user}</span><span className="text-slate-500 text-xs">{post.time}</span></div>
                  <p className="text-slate-300 text-sm"><span className="text-amber-400 font-semibold">{post.action}</span> — <span className="font-semibold">{post.achievement}</span></p>
                  <div className="flex items-center gap-4 mt-3"><button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"><Flame className="w-3.5 h-3.5" />{post.likes}</button><button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"><MessageCircle className="w-3.5 h-3.5" />Celebrate</button></div>
                </div>
                <Trophy className="w-5 h-5 text-amber-400/50 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}