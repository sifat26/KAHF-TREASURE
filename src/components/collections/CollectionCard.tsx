import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Collection } from '@/data/collections';
import type { FragranceFamily } from '@/data/products';
import { toBanglaDigits } from '@/lib/format';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { cn } from '@/lib/utils';

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
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-canvas shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-lux)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductBottle
          name={collection.title}
          family={COLLECTION_FAMILY[collection.slug]}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-xl text-ink">{collection.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {collection.tagline}
            {typeof count === 'number' && ` · ${toBanglaDigits(count)}টি সুগন্ধি`}
          </p>
        </div>
        <ArrowUpRight
          size={22}
          className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-gold-deep)]"
        />
      </div>
    </Link>
  );
}
