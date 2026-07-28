import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';

/**
 * Horizontal, snap-scrolling rail for use on mobile / dense sections.
 * Cards keep a fixed min-width and scroll horizontally without a visible bar.
 */
export function ProductRail({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0',
        className,
      )}
    >
      {products.map((product) => (
        <div key={product.slug} className="w-[70%] shrink-0 snap-start sm:w-[280px]">
          <ProductCard product={product} className="h-full" />
        </div>
      ))}
    </div>
  );
}
