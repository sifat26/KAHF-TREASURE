'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

/** Sun/moon control that flips the site between dark and light. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={isDark ? 'লাইট মোডে পরিবর্তন করুন' : 'ডার্ক মোডে পরিবর্তন করুন'}
      title={isDark ? 'লাইট মোড' : 'ডার্ক মোড'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full',
        'border border-[var(--color-border)] text-[var(--color-accent)]',
        'transition-colors duration-200 hover:border-[var(--color-border-strong)]',
        'hover:bg-[var(--color-accent-tint)]',
        className,
      )}
    >
      {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  );
}
