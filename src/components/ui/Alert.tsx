import React, { forwardRef } from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  icon?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const variants = {
      error: {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        defaultIcon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        ),
      },
      success: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        defaultIcon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.803a1 1 0 00-1.414-1.414L9 9.586 6.707 7.293a1 1 0 00-1.414 1.414L7.586 10l-2.293 2.293a1 1 0 001.414 1.414L9 11.414l2.293 2.293a1 1 0 001.414-1.414L10.414 10l2.293-2.293z" clipRule="evenodd" />
          </svg>
        ),
      },
      warning: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        defaultIcon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.73 1.282-.513 2.775-2.01 2.775H4.688c-1.498 0-2.74-1.493-2.01-2.775l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ),
      },
      info: {
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30',
        text: 'text-indigo-300',
        defaultIcon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 002 0v3a1 1 0 00-2 0V9z" clipRule="evenodd" />
          </svg>
        ),
      },
    };

    const v = variants[variant];

    return (
      <div
        ref={ref}
        className={`
          p-4 rounded-xl border ${v.bg} ${v.border}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        <div className="flex gap-3">
          <span className={`flex-shrink-0 ${v.text}`}>
            {icon || v.defaultIcon}
          </span>
          <div className="flex-1">
            {title && (
              <h4 className={`font-bold text-sm ${v.text} mb-1`}>{title}</h4>
            )}
            <div className={`text-sm ${v.text} opacity-90`}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';