'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'orange' | 'emerald' | 'slate' | 'navy' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

const CustomBadge = forwardRef<HTMLSpanElement, CustomBadgeProps>(
  ({ className, children, variant = 'orange', size = 'md', ...props }, ref) => {
    const variantStyles = {
      orange: 'bg-orange/20 text-orange border-orange/30',
      emerald: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
      slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      navy: 'bg-navy text-offwhite border-slate-800',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center',
          'rounded-full',
          'border',
          'font-medium',
          'transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CustomBadge.displayName = 'CustomBadge';

export { CustomBadge };