'use client';

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="form-row">
        {label && (
          <label className="block text-sm font-medium text-offwhite mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 bg-darkbg border border-slate-800 rounded-md',
            'text-offwhite focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent',
            error && 'border-red-500',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export { CustomSelect };