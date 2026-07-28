import Link from 'next/link';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — the single source of truth for all button styling.
 * BRAND_GUIDELINES.md » Buttons: primary = ink bg / white text / gold on hover;
 * secondary = white bg / ink border / light-gray hover; radius 12px.
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-medium tracking-wide transition-all duration-200 ease-[var(--ease-lux)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-deep)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-white hover:bg-[var(--color-gold-deep)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]',
        secondary:
          'bg-canvas text-ink border border-ink hover:bg-surface',
        gold: 'bg-gold text-white hover:bg-[var(--color-gold-deep)] shadow-[var(--shadow-card)]',
        outline:
          'border border-line text-ink-soft bg-transparent hover:border-ink hover:text-ink',
        ghost: 'text-ink-soft hover:bg-surface',
        link: 'text-ink underline-offset-4 hover:underline hover:text-[var(--color-gold-deep)] px-0',
        danger: 'bg-[var(--color-error)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-sm md:text-base',
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
