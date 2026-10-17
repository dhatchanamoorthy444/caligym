'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'chart' | 'avatar';
  count?: number;
}

const LoadingSkeleton = ({ className, variant = 'text', count = 1 }: LoadingSkeletonProps) => {
  const variants = {
    text: 'h-4 bg-gradient-to-r from-slate-700 to-slate-600',
    card: 'h-32 bg-gradient-to-r from-slate-700 to-slate-600',
    chart: 'h-48 bg-gradient-to-r from-slate-700 to-slate-600',
    avatar: 'w-12 h-12 rounded-full bg-gradient-to-r from-slate-700 to-slate-600',
  };

  return (
    <div className={cn('animate-pulse', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn('rounded', variants[variant])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
};

export { LoadingSkeleton };