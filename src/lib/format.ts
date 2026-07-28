import type { PriceBySize, Product, ProductSize } from '@/data/products';

/** All sizes in display order. */
export const SIZE_ORDER: ProductSize[] = ['3ml', '6ml', '12ml'];

/** Format a BDT amount as e.g. "৳350". */
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-US')}`;
}

/** Human-readable size label, e.g. "3ml" → "3 ml". */
export function formatSize(size: ProductSize): string {
  return size.replace('ml', ' ml');
}

/** The lowest available price across sizes, for "from ৳X" displays. */
export function startingPrice(prices: PriceBySize): number | null {
  const values = SIZE_ORDER.map((s) => prices[s]).filter(
    (v): v is number => typeof v === 'number',
  );
  return values.length ? Math.min(...values) : null;
}

/** Sizes that actually have a price, in order. */
export function availableSizes(product: Product): ProductSize[] {
  return SIZE_ORDER.filter((s) => typeof product.prices[s] === 'number');
}

/** Whether a product can currently be ordered. */
export function isOrderable(product: Product): boolean {
  return product.status === 'available' && availableSizes(product).length > 0;
}

const STATUS_LABEL: Record<Product['status'], string> = {
  available: 'In Stock',
  'out-of-stock': 'Out of Stock',
  'coming-soon': 'Coming Soon',
};

export function statusLabel(status: Product['status']): string {
  return STATUS_LABEL[status];
}
