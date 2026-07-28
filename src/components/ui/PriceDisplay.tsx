import { formatPrice, startingPrice } from '@/lib/format';
import type { PriceBySize } from '@/data/products';
import { cn } from '@/lib/utils';

/** "from ৳X" price line for cards; full price for detail. */
export function PriceDisplay({
  prices,
  className,
  showFrom = true,
}: {
  prices: PriceBySize;
  className?: string;
  showFrom?: boolean;
}) {
  const from = startingPrice(prices);
  if (from === null) {
    return <span className={cn('text-sm text-muted', className)}>Price on request</span>;
  }
  return (
    <span className={cn('inline-flex items-baseline gap-1', className)}>
      {showFrom && <span className="text-xs text-muted">from</span>}
      <span className="font-medium text-ink">{formatPrice(from)}</span>
    </span>
  );
}
