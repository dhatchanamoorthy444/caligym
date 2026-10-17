'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CustomSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

const CustomSkeleton = forwardRef<HTMLDivElement, CustomSkeletonProps>(
  ({ className, animated = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-slate-800 rounded',
          animated && 'animate-pulse',
          className
        )}
        {...props}
      />
    );
  }
);

CustomSkeleton.displayName = 'CustomSkeleton';

export { CustomSkeleton };