import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ProductStatus } from '@/data/products';

/**
 * Badge — subtle, elegant labels (BRAND_GUIDELINES.md » Badge Style).
 * Kept understated: thin borders, muted fills, uppercase micro-type.
 */
const badge = cva(
  'inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-[0.12em] leading-none',
  {
    variants: {
      variant: {
        gold: 'bg-[var(--color-gold-soft)]/60 text-[var(--color-gold-deep)] border border-[var(--color-gold)]/30',
        ink: 'bg-ink text-white',
        neutral: 'bg-surface text-muted border border-line',
        outline: 'bg-transparent text-ink-soft border border-line',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/25',
        warning: 'bg-[var(--color-warning)]/10 text-[#8a5a00] border border-[var(--color-warning)]/30',
        muted: 'bg-surface text-muted',
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
