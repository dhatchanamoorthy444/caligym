'use client';

import React from 'react';
import { Dumbbell, Heart, Target, Zap, Globe, Brain, Shield, Footprints, Award, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    icon: Target,
    title: 'Relative Strength',
    description: 'Build strength proportional to your body weight — the most functional strength there is.'
  },
  {
    icon: Footprints,
    title: 'Body Control',
    description: 'Develop complete awareness and command of your body in space through skill progressions.'
  },
  {
    icon: Brain,
    title: 'Coordination',
    description: 'Complex movements train your nervous system to fire muscles in perfect sequence.'
  },
  {
    icon: Heart,
    title: 'Joint Health',
    description: 'Natural movement patterns build resilient joints and connective tissue when progressed properly.'
  },
  {
    icon: Zap,
    title: 'Core Strength',
    description: 'Nearly every calisthenics movement demands intense core engagement from start to finish.'
  },
  {
    icon: Globe,
    title: 'Train Anywhere',
    description: 'A bar, some floor space, and gravity — that\'s all you need to build an impressive physique.'
  },
  {
    icon: Shield,
    title: 'Mobility',
    description: 'Full-range bodyweight movements build strength through complete ranges of motion.'
  },
  {
    icon: Award,
    title: 'Skill Acquisition',
    description: 'Learn impressive physical skills that carry over to every other sport and activity.'
  },
  {
    icon: Sparkles,
    title: 'Minimal Equipment',
    description: 'No gym membership required. Your body provides all the resistance you need.'
  }
];

export const WhyCalisthenics: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Why <span className="text-amber-400">Calisthenics</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The most natural, effective, and accessible form of training — used by athletes, soldiers, and gymnasts for centuries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                <benefit.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCalisthenics;