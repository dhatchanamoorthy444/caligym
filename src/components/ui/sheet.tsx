'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CustomSheetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

const CustomSheet = forwardRef<HTMLDivElement, CustomSheetProps>(
  ({ className, children, open = false, onOpenChange, side = 'right', ...props }, ref) => {
    if (!open) return null;

    const sideStyles = {
      left: 'left-0 h-full border-r',
      right: 'right-0 h-full border-l',
      top: 'top-0 w-full border-b',
      bottom: 'bottom-0 w-full border-t',
    };

    return (
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => onOpenChange?.(false)}
        {...props}
      >
        <div
          className={cn(
            'absolute bg-darkbg p-6 overflow-y-auto',
            'transition-transform duration-300 ease-in-out',
            sideStyles[side],
            side === 'left' ? 'left-0 top-0 h-full w-80' : '',
            side === 'right' ? 'right-0 top-0 h-full w-80' : '',
            side === 'top' ? 'top-0 left-0 w-full h-64' : '',
            side === 'bottom' ? 'bottom-0 left-0 w-full h-64' : '',
            open
              ? side === 'left' ? 'translate-x-0' :
                side === 'right' ? 'translate-x-0' :
                side === 'top' ? 'translate-y-0' : 'translate-y-0'
              : side === 'left' ? '-translate-x-full' :
                side === 'right' ? 'translate-x-full' :
                side === 'top' ? '-translate-y-full' : 'translate-y-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => onOpenChange?.(false)}
              className="p-2 hover:bg-slate-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
);

CustomSheet.displayName = 'CustomSheet';

export { CustomSheet };