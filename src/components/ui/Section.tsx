import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

/**
 * Section — vertical rhythm wrapper. Generous whitespace is a core brand
 * principle (BRAND_GUIDELINES.md » Visual Identity).
 */
export function Section({
  className,
  containerSize,
  bleed = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  containerSize?: 'default' | 'wide' | 'narrow';
  /** When true, no inner Container is applied (full-bleed content). */
  bleed?: boolean;
}) {
  return (
    <section className={cn('py-16 sm:py-20 lg:py-28', className)} {...props}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  /** Optional right-aligned action (e.g. "View all"). Only in left align. */
  action?: React.ReactNode;
  id?: string;
}

/** Consistent section heading: eyebrow kicker + display title + optional intro. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  action,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        align === 'center' ? 'text-center max-w-2xl mx-auto' : 'flex items-end justify-between gap-6',
        className,
      )}
    >
      <div className={cn(align === 'center' && 'flex flex-col items-center')}>
        {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
        <h2
          id={id}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-ink"
        >
          {title}
        </h2>
        {align === 'center' && <span className="gold-rule mt-5 w-16" aria-hidden="true" />}
        {description && (
          <p className="mt-4 text-muted text-base leading-relaxed">{description}</p>
        )}
      </div>
      {action && align === 'left' && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
