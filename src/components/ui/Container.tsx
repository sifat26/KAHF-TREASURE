import * as React from 'react';
import { cn } from '@/lib/utils';

/** Centered max-width wrapper with consistent gutters. */
export function Container({
  className,
  size = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: 'default' | 'wide' | 'narrow' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        size === 'wide' && 'max-w-[1440px]',
        size === 'default' && 'max-w-7xl',
        size === 'narrow' && 'max-w-3xl',
        className,
      )}
      {...props}
    />
  );
}
