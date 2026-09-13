'use client';

import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasIcon = leftIcon || rightIcon;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-400 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm
              transition-all duration-150 ease-spring
              focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500' : 'border-slate-800'}
              ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
          >
            {children}
          </input>
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';