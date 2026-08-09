'use client';

import { defaultSize, useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { StockBadge } from '@/components/ui/Badge';
import { ProductBottle } from '@/components/ui/ProductBottle';
import type { Product } from '@/data/products';
import { familyLabel, formatPrice, isOrderable, toBanglaDigits } from '@/lib/format';
import { productLabel } from '@/lib/products';
import { cn } from '@/lib/utils';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

/** Derive a stable pseudo-rating from the slug string. */
function pseudoRating(slug: string): { rating: number; count: number } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  const count = 60 + (Math.abs(hash) % 80);
  const rating = 4.2 + (Math.abs(hash >> 8) % 9) * 0.1;
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
    ? 'সবচেয়ে জনপ্রিয়'
    : product.newArrival
      ? 'নতুন এসেছে'
      : product.unique
        ? 'অনন্য'
        : null;

  const minPrice = Math.min(
    ...(['3ml', '6ml', '12ml', '24ml', '50ml'] as const)
      .map(s => product.prices[s])
      .filter((p): p is number => typeof p === 'number' && p > 0)
  ) || 0;

  return (
    <article
      className={cn(
        'group relative flex flex-col min-w-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-gold)]/50 hover:shadow-2xl hover:shadow-[var(--color-gold)]/10 select-none',
        className,
      )}
    >
      {/* Media Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950/90">
        {/* Floating Gold Foil Badge */}
        {topBadge && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-[var(--color-gold)]/40 px-3 py-1 text-[0.62rem] font-bold tracking-wider text-[var(--color-gold)] shadow-md">
              <Sparkles size={10} />
              {topBadge}
            </span>
          </div>
        )}

        {/* Floating Wishlist Button */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.slug); }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-stone-900/60 backdrop-blur-md text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-stone-900/90"
        >
          <Heart size={15} className={cn('transition-colors', wished ? 'fill-amber-400 text-amber-400' : 'text-amber-400/80')} />
        </button>

        {/* Image / Bottle */}
        <Link href={href} className="relative block h-full w-full">
          <ProductBottle name={productLabel(product)} family={product.family} showBackground={true} className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
        </Link>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 bg-[var(--color-background)]">
        <div>
          <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            {product.family ? familyLabel(product.family) : 'আতর'}
          </p>

          <h3 className="font-serif text-base sm:text-lg font-bold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-gold)] truncate">
            <Link href={href}>
              {productLabel(product)}
            </Link>
          </h3>

          <div className="mt-1.5 flex items-center gap-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[0.68rem] font-semibold text-amber-600 dark:text-amber-400">({toBanglaDigits(count)})</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 border-t border-[var(--color-border)]/60 pt-3 flex items-center justify-between gap-2">
          <span className="font-serif text-lg sm:text-xl font-extrabold text-[var(--color-text-primary)]">
            {minPrice > 0 ? `${formatPrice(minPrice)} থেকে` : 'শীঘ্রই'}
          </span>

          {orderable && size ? (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product, size); }}
              className="relative z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-600/20 active:scale-95 shrink-0"
            >
              <ShoppingBag size={13} />
              তালিকায় যোগ
            </button>
          ) : (
            <StockBadge status={product.status} size="sm" />
          )}
        </div>
      </div>
    </article>
  );
}
