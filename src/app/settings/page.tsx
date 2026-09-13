'use client';
import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, LogOut } from 'lucide-react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { profile } = useCalisthenics();
  const { signOut } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => { await signOut(); router.push('/login'); };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-4"><SettingsIcon className="w-3.5 h-3.5" /> Settings</div>
          <h1 className="text-3xl font-black text-white tracking-tight">Your Settings</h1>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><User className="w-5 h-5 text-amber-400" /> Profile</h2>
            <div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-400">Name</span><span className="text-white font-semibold">{profile.name}</span></div><div className="flex justify-between"><span className="text-slate-400">Username</span><span className="text-white font-semibold">@{profile.username}</span></div><div className="flex justify-between"><span className="text-slate-400">Level</span><span className="text-amber-400 font-bold">Level {profile.levels.overall}</span></div></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-amber-400" /> Notifications</h2>
            <div className="flex items-center justify-between"><span className="text-sm text-slate-400">Daily training reminders</span><button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-amber-500' : 'bg-slate-700'}`}><div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} /></button></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-amber-400" /> Account</h2>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold hover:bg-rose-500/20 transition-colors"><LogOut className="w-4 h-4" />Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}