'use client';

import { SkillCard } from './SkillCard';

interface Skill {
  id: string;
  name: string;
  difficulty: number;
  description: string;
  tier: 'free' | 'email' | 'paid';
  unlocked: boolean;
}

interface SkillCardGridProps {
  title: string;
  subtitle: string;
  skills: Skill[];
  tier: 'free' | 'email' | 'paid';
  icon: string;
  color: string;
  onSkillAction?: (action: 'view' | 'unlock', skillId: string) => void;
}

export default function SkillCardGrid({
  title,
  subtitle,
  skills,
  tier,
  icon,
  color,
  onSkillAction,
}: SkillCardGridProps) {
  return (
    <section className="skill-tier mb-12">
      <div className="tier-header flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className={`tier-badge px-3 py-1 rounded-full text-sm font-semibold text-white ${color}`}
        >
          {tier === 'free' ? 'Free' : tier === 'email' ? 'Email Unlock' : 'Membership'}
        </span>
      </div>

      <p className="text-slate-400 mb-6">{subtitle}</p>

      <div className="skills-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            {...skill}
            onViewTutorial={(id) => onSkillAction?.('view', id)}
            onUnlock={(id) => onSkillAction?.('unlock', id)}
          />
        ))}
      </div>
    </section>
  );
}