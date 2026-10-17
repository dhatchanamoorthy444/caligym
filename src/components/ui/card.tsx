'use client';

import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  ({ className, children, accent = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card',
          accent && 'card-accent',
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCard.displayName = 'CustomCard';

export { CustomCard };