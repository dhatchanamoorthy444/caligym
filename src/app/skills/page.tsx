'use client';

import { useState } from 'react';
import { SkillCard } from '@/components/SkillCard';

export default function SkillsPage() {
  const [activeTier, setActiveTier] = useState('all');
  const [userProgress] = useState({
    unlocked: ['pull-ups', 'push-ups', 'squats', 'plank'],
    emailUnlocked: ['handstand-hold', 'dips'],
    paidUnlocked: [],
  });

  const skillTiers = {
    free: {
      title: 'Beginner',
      icon: '🔓',
      color: 'bg-emerald-600',
      skills: [
        { id: 'pull-ups', name: 'Pull-ups', difficulty: 3, description: 'Upper body strength and lat development', tier: 'free' },
        { id: 'push-ups', name: 'Push-ups', difficulty: 1, description: 'Builds upper body foundational strength', tier: 'free' },
        { id: 'squats', name: 'Squats', difficulty: 1, description: 'Foundation for all lower-body strength', tier: 'free' },
        { id: 'plank', name: 'Plank', difficulty: 1, description: 'Core stability baseline', tier: 'free' },
      ],
    },
    email: {
      title: 'Intermediate',
      icon: '📧',
      color: 'bg-orange-600',
      skills: [
        { id: 'handstand-hold', name: 'Handstand', difficulty: 2, description: 'Shoulder stability and balance', tier: 'email' },
        { id: 'dips', name: 'Dips', difficulty: 3, description: 'Triceps and chest strength', tier: 'email' },
      ],
    },
    paid: {
      title: 'Advanced',
      icon: '💎',
      color: 'bg-purple-600',
      skills: [
        { id: 'muscle-up', name: 'Muscle-up', difficulty: 4, description: 'The gateway elite skill', tier: 'paid' },
        { id: 'planche', name: 'Planche', difficulty: 5, description: 'Elite full-body tension and strength', tier: 'paid' },
        { id: 'handstand-pushup', name: 'Handstand Push-up', difficulty: 5, description: 'Peak pressing strength and balance', tier: 'paid' },
      ],
    },
  };

  const isSkillUnlocked = (skill: any, progress: any) => {
    if (progress.unlocked.includes(skill.id)) return true;
    if (skill.tier === 'email' && progress.emailUnlocked.includes(skill.id)) return true;
    if (skill.tier === 'paid' && progress.paidUnlocked.includes(skill.id)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-7xl mx-auto section-padding">
        <h1 className="text-3xl font-bold mb-2">Skill Library</h1>
        <p className="text-slate-400 mb-8">
          Progress through tiers: free, email-unlocked, and membership skills.
        </p>

        {/* Tier Navigation */}
        <div className="flex gap-4 mb-8">
          {['all', 'free', 'email', 'paid'].map((tier) => (
            <button
              key={tier}
              className={`px-4 py-2 rounded-full border transition-colors {
                activeTier === tier
                  ? 'bg-orange text-white border-orange'
                  : 'bg-navy text-slate-400 border-slate-800 hover:text-offwhite'
              }`}
              onClick={() => setActiveTier(tier)}
            >
              {tier === 'all' ? 'All Skills' : skillTiers[tier as keyof typeof skillTiers]?.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillTiers).map(([tierKey, tier]) => {
            if (activeTier !== 'all' && activeTier !== tierKey) return null;

            return (
              <div key={tierKey} className="skill-tier mb-12">
                <div className="tier-header flex items-center gap-3 mb-6">
                  <span className="text-2xl">{tier.icon}</span>
                  <h2 className="text-2xl font-bold">{tier.title}</h2>
                  <span className={`tier-badge px-3 py-1 rounded-full text-sm font-semibold text-white ${tier.color}`}
                  >
                    {tierKey === 'free' ? 'Free' : tierKey === 'email' ? 'Email Unlock' : 'Membership'}
                  </span>
                </div>

                <div className="skills-row grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tier.skills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      {...skill}
                      unlocked={isSkillUnlocked(skill, userProgress)}
                      onViewTutorial={(id) => console.log('View tutorial:', id)}
                      onUnlock={(id) => console.log('Unlock:', id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}