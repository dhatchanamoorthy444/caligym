'use client';

import { motion } from 'framer-motion';
import { CustomButton } from '@/components/ui/button';
import { HeroVideo } from './HeroVideo';

export default function Hero() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="hero grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="slide-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Master Bodyweight Mastery in 90 Days
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg">
              Evidence-based calisthenics progression with AI coaching. Track your skills, unlock new exercises, and train with confidence.
            </p>
            <CustomButton
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Free Trial
            </CustomButton>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            role="img"
            aria-label="Athlete performing a pull-up exercise demonstration"
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}