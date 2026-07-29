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
          'bg-[rgba(200,169,106,0.12)] text-[var(--color-accent)] border border-[rgba(200,169,106,0.3)]',
        ink:
          'bg-[var(--color-text-primary)] text-[var(--color-background)]',
        neutral:
          'bg-[var(--color-card)] text-[var(--color-muted)] border border-[var(--color-border)]',
        outline:
          'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)]',
        success:
          'bg-[rgba(34,197,94,0.12)] text-[var(--color-success)] border border-[rgba(34,197,94,0.25)]',
        warning:
          'bg-[rgba(245,158,11,0.12)] text-[#d4920a] border border-[rgba(245,158,11,0.25)]',
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
