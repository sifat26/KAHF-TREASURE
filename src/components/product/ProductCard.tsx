'use client';

import { defaultSize, useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { StockBadge } from '@/components/ui/Badge';
import { ProductBottle } from '@/components/ui/ProductBottle';
import type { Product } from '@/data/products';
import { isOrderable } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Heart, Plus, Star } from 'lucide-react';
import Link from 'next/link';

/**
 * ProductCard — luxury vertical card design with a large, prominent bottle image.
 * Matches top luxury fragrance brand presentation (Creed, Kahf Treasure, Diptyque).
 * Responsive and optimized for mobile grids & desktop showcases.
 */

/** Derive a stable pseudo-rating from the slug string. */
function pseudoRating(slug: string): { rating: number; count: number } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  const count = 60 + (Math.abs(hash) % 80); // 60–139
  const rating = 4.2 + (Math.abs(hash >> 8) % 9) * 0.1; // 4.2–5.0
  return { rating: Math.round(rating * 10) / 10, count };
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem, toggleWishlist, isWishlisted } = useEnquiryBag();
  const orderable = isOrderable(product);
  const size = defaultSize(product);
  const wished = isWishlisted(product.slug);
  const href = `/products/${product.slug}`;
  const { rating, count } = pseudoRating(product.slug);

  const topBadge = product.bestSeller
    ? { label: 'BEST SELLER' }
    : product.newArrival
      ? { label: 'NEW ARRIVAL' }
      : product.unique
        ? { label: 'UNIQUE' }
        : null;

  const minPrice = product.prices['3ml'] ?? product.prices['6ml'] ?? 200;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-gold)]/45 hover:shadow-[var(--shadow-card-hover)] select-none',
        className,
      )}
    >
      {/* ── Top Badges & Wishlist Button ── */}
      {topBadge && (
        <div className='absolute left-2.5 top-2.5 z-10 sm:left-3.5 sm:top-3.5'>
          <span className='inline-flex items-center rounded-full bg-[var(--color-gold-tint)] px-2.5 py-0.5 text-[0.58rem] sm:px-3 sm:py-1 sm:text-[0.62rem] font-bold uppercase tracking-wider text-[var(--color-text-primary)] shadow-lg'>
            {topBadge.label}
          </span>
        </div>
      )}

      <button
        type='button'
        onClick={() => toggleWishlist(product.slug)}
        aria-pressed={wished}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className='absolute right-2.5 top-2.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md text-[var(--color-gold)] transition-all hover:scale-110 hover:border-[var(--color-gold)]'
      >
        <Heart
          size={14}
          className={cn(
            'transition-colors sm:w-[15px] sm:h-[15px]',
            wished
              ? 'fill-[var(--color-gold)] text-[var(--color-gold)]'
              : 'text-[var(--color-gold)]/80 hover:text-[var(--color-gold)]',
          )}
        />
      </button>

      {/* ── Large Media Container (Bottle occupies full upper section) ── */}
      <Link
        href={href}
        className='relative block w-full aspect-[4/5] overflow-hidden bg-[var(--color-background)] pt-3 sm:pt-4 sm:aspect-[3/4]'
        tabIndex={-1}
        aria-hidden='true'
      >
        <ProductBottle name={product.name} family={product.family} showBackground={true} className='h-full w-full' />
      </Link>

      {/* ── Bottom Card Details Section ── */}
      <div className='flex flex-1 flex-col border-t border-[var(--color-border)] bg-[var(--color-background)] p-3 sm:p-5'>
        {/* Fragrance Family Category */}
        <span className='mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)] sm:text-[0.7rem] sm:tracking-[0.18em]'>
          {product.family ?? 'ATTAR'}
        </span>

        {/* Product Title */}
        <h3 className='font-serif text-sm sm:text-lg font-bold leading-snug sm:leading-tight text-[var(--color-text-primary)] transition-colors truncate group-hover:text-[var(--color-gold)]'>
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>

        {/* 5-Star Rating Row */}
        <div className='mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5'>
          <div className='flex text-[var(--color-gold)]' aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className='fill-[var(--color-gold)] text-[var(--color-gold)] sm:w-[13px] sm:h-[13px]' strokeWidth={1} />
            ))}
          </div>
          <span className='text-[0.65rem] sm:text-[0.7rem] font-medium text-[var(--color-gold)]'>({count})</span>
        </div>

        {/* Price & Add to Bag Row */}
        <div className='mt-3 sm:mt-4 flex items-center justify-between gap-1.5 border-t border-[var(--color-border)] pt-2.5 sm:pt-3 min-w-0'>
          <div className='flex flex-col shrink-0 min-w-0'>
            <span className='mb-0.5 text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-wider leading-none text-[var(--color-muted)]'>
              From
            </span>
            <span className='whitespace-nowrap text-sm sm:text-lg font-bold leading-none text-[var(--color-text-primary)]'>
              ৳ {minPrice}
            </span>
          </div>

          {orderable && size ? (
            <button
              type='button'
              onClick={() => addItem(product, size)}
              aria-label={`Add ${product.name} to enquiry bag`}
              className='relative z-10 inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[var(--color-gold)] px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[0.58rem] sm:text-[0.68rem] font-bold uppercase tracking-wider text-[var(--color-background)] shadow-md shadow-[rgba(200,169,106,0.2)] transition-all hover:scale-105 active:scale-95'
            >
              <Plus size={12} className='shrink-0 sm:w-[13px] sm:h-[13px]' />
              <span>ADD TO BAG</span>
            </button>
          ) : (
            <StockBadge status={product.status} size='sm' />
          )}
        </div>
      </div>
    </article>
  );
}
