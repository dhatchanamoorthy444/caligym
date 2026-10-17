'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  ({ src, fallback, size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-24 h-24 text-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full',
          'flex items-center justify-center',
          'bg-slate-700',
          'overflow-hidden',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className="hidden text-white font-medium">
          {fallback}
        </div>
      </div>
    );
  }
);

CustomAvatar.displayName = 'CustomAvatar';

export { CustomAvatar };