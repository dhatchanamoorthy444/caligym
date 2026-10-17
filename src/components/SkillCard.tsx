'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomButton } from '@/components/ui/button';
import { CustomCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  id: string;
  name: string;
  difficulty: number;
  description: string;
  imageUrl?: string;
  tier: 'free' | 'email' | 'paid';
  unlocked: boolean;
  onViewTutorial?: (id: string) => void;
  onUnlock?: (id: string) => void;
}

const SkillCard = ({
  id,
  name,
  difficulty,
  description,
  tier,
  unlocked,
  onViewTutorial,
  onUnlock,
}: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.svg
          key={i}
          className={cn(
            'w-3 h-3',
            i <= difficulty ? 'text-orange fill-orange' : 'text-slate-600'
          )}
          viewBox="0 0 20 20"
          initial={{ scale: 1 }}
          animate={{ scale: i <= difficulty ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className={cn('h-full')}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <CustomCard
        className={cn(
          'h-full',
          'skill-card',
          !unlocked && 'locked'
        )}
        accent={!unlocked && tier === 'paid'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Lock overlay for locked skills */}
          {!unlocked && (
            <motion.div
              className={cn(
                'absolute inset-0',
                'bg-darkbg/80 backdrop-blur-sm',
                'flex items-center justify-center',
                'z-10 rounded-lg'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={cn(
                  'flex items-center gap-2',
                  'px-4 py-2',
                  'bg-navy/90 backdrop-blur',
                  'rounded-full',
                  'border border-orange/30'
                )}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 text-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-sm font-medium text-orange">
                  {tier === 'email' ? 'Unlock with Email' : 'Membership Required'}
                </span>
              </motion.div>
            </motion.div>
          )}

          <div className="relative mb-4">
            <div className="skill-img h-32 bg-navy rounded-md flex items-center justify-center text-slate-500 font-medium">
              {name} Demo
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-offwhite mb-2">
                {name}
              </h3>
              <div className="star-rating flex gap-1 mb-2">
                {getDifficultyStars()}
              </div>
            </div>

            <p className="text-sm text-slate-400 line-clamp-2">
              {description}
            </p>

            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {unlocked ? (
                <CustomButton
                  size="sm"
                  className="w-full"
                  onClick={() => onViewTutorial?.(id)}
                >
                  View Tutorial
                </CustomButton>
              ) : tier === 'email' ? (
                <CustomButton
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => onUnlock?.(id)}
                >
                  <svg
                    className="w-4 h-4 mr-2 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Unlock Now
                </CustomButton>
              ) : (
                <CustomButton
                  className="w-full bg-orange/20 text-orange border border-orange/30 cursor-not-allowed"
                  disabled
                >
                  Upgrade to Unlock
                </CustomButton>
              )}
            </motion.div>
          </div>
        </div>
      </CustomCard>
    </motion.div>
  );
};

export { SkillCard };