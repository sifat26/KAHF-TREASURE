import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ProductStatus } from '@/data/products';

/**
 * Badge — subtle, elegant labels (BRAND_GUIDELINES.md » Badge Style).
 * Dark luxury edition: thin borders, warm fills, uppercase micro-type.
 */
const badge = cva(
  'inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-[0.12em] leading-none',
  {
    variants: {
      variant: {
        gold:
          'bg-[var(--color-accent-tint)] text-[var(--color-accent)] border border-[var(--color-border-strong)]',
        ink:
          'bg-[var(--color-text-primary)] text-[var(--color-background)]',
        neutral:
          'bg-[var(--color-card)] text-[var(--color-muted)] border border-[var(--color-border)]',
        outline:
          'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)]',
        success:
          'bg-[color-mix(in srgb, var(--color-success) 12%, transparent)] text-[var(--color-success)] border border-[color-mix(in srgb, var(--color-success) 25%, transparent)]',
        warning:
          'bg-[color-mix(in srgb, var(--color-warning) 12%, transparent)] text-[var(--color-warning)] border border-[color-mix(in srgb, var(--color-warning) 25%, transparent)]',
        muted:
          'bg-[var(--color-card)] text-[var(--color-muted)]',
      },
      size: {
        sm: 'text-[0.6rem] px-2 py-1',
        md: 'text-[0.65rem] px-2.5 py-1.5',
      },
    },
    defaultVariants: { variant: 'gold', size: 'sm' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant, size }), className)} {...props} />;
}

/** Stock badge derived from product status (single mapping, used everywhere). */
export function StockBadge({
  status,
  className,
  size,
}: {
  status: ProductStatus;
  className?: string;
  size?: 'sm' | 'md';
}) {
  if (status === 'available') {
    return (
      <Badge variant="success" size={size} className={className}>
        In Stock
      </Badge>
    );
  }
  if (status === 'coming-soon') {
    return (
      <Badge variant="neutral" size={size} className={className}>
        Coming Soon
      </Badge>
    );
  }
  return (
    <Badge variant="warning" size={size} className={className}>
      Out of Stock
    </Badge>
  );
}
