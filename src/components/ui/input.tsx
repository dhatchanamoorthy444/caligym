'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="form-row">
        {label && (
          <label className="block text-sm font-medium text-offwhite mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 bg-darkbg border border-slate-800 rounded-md',
            'text-offwhite placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export { CustomInput };