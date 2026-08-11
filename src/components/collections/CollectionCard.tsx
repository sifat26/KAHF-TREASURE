import { ProductBottle } from '@/components/ui/ProductBottle';
import type { Collection } from '@/data/collections';
import type { FragranceFamily } from '@/data/products';
import { toBanglaDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

/** Rough family tint per collection, for the placeholder visual. */
const COLLECTION_FAMILY: Record<string, FragranceFamily> = {
  'most-wanted': 'aquatic',
  'new-arrivals': 'fresh',
  oud: 'oud',
  floral: 'floral',
  fruit: 'fruity',
  'best-sellers': 'woody',
};

export function CollectionCard({
  collection,
  count,
  className,
}: {
  collection: Collection;
  count?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-canvas shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-lux)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:rounded-[var(--radius-card)]',
        className,
      )}
    >
      <div className='relative aspect-[4/3] overflow-hidden sm:aspect-[4/3]'>
        <ProductBottle
          name={collection.title}
          family={COLLECTION_FAMILY[collection.slug]}
          className='h-full w-full transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      <div className='flex flex-1 flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5'>
        <div>
          <h3 className='font-display text-lg text-ink sm:text-xl'>{collection.title}</h3>
          <p className='mt-1 text-xs leading-relaxed text-muted sm:text-sm'>
            {collection.tagline}
            {typeof count === 'number' && ` · ${toBanglaDigits(count)}টি সুগন্ধি`}
          </p>
        </div>
        <ArrowUpRight
          size={20}
          className='shrink-0 self-end text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-gold-deep)] sm:self-auto'
        />
      </div>
    </Link>
  );
}
