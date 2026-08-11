import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';

/** Responsive grid of product cards with staggered reveal. */
export function ProductGrid({
  products,
  className,
  columns = 4,
}: {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}) {
  return (
    <RevealGroup
      className={cn(
        'grid grid-cols-2 gap-3 sm:gap-6',
        columns === 4 ? 'lg:grid-cols-4 md:grid-cols-3' : 'lg:grid-cols-3 md:grid-cols-3',
        className,
      )}
    >
      {products.map((product) => (
        <RevealItem key={product.slug} className='flex'>
          <ProductCard product={product} className='w-full' />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
