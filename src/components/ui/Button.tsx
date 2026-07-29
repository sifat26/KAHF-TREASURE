import Link from 'next/link';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — single source of truth for all button styling.
 * Dark luxury edition — BRAND_GUIDELINES.md » Buttons:
 *   primary  = dark surface + warm text
 *   gold     = soft gold fill + dark text (no glow)
 *   secondary= transparent + gold border
 *   outline  = thin border, transparent
 *   ghost    = no border, subtle hover
 *   link     = gold text, no padding
 *   danger   = error red
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-medium tracking-wide transition-all duration-200 ease-[var(--ease-lux)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-card)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] shadow-[var(--shadow-card)]',
        secondary:
          'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]',
        gold:
          'bg-[var(--color-accent)] text-[var(--color-background)] font-semibold hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-card)]',
        outline:
          'border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]',
        ghost:
          'text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)]',
        link:
          'text-[var(--color-accent)] underline-offset-4 hover:underline hover:text-[var(--color-accent-hover)] px-0',
        danger:
          'bg-[var(--color-error)] text-white hover:opacity-90',
      },
      size: {
        sm:   'h-9 px-4 text-xs',
        md:   'h-11 px-6 text-sm',
        lg:   'h-13 px-8 text-sm md:text-base',
        icon: 'h-11 w-11',
      },
      full: { true: 'w-full', false: '' },
    },
    defaultVariants: { variant: 'primary', size: 'md', full: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, ...props }, ref) => (
    <button ref={ref} className={cn(button({ variant, size, full }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof button> & { external?: boolean };

/** Anchor styled as a button. Use for navigation / external links (e.g. WhatsApp). */
export function ButtonLink({
  className,
  variant,
  size,
  full,
  external,
  ...props
}: ButtonLinkProps) {
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Link className={cn(button({ variant, size, full }), className)} {...extra} {...props} />
  );
}

export { button as buttonVariants };
