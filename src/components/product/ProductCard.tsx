'use client';

import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { isOrderable } from '@/lib/format';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { Badge, StockBadge } from '@/components/ui/Badge';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { defaultSize, useEnquiryBag } from '@/components/bag/EnquiryBagProvider';

/**
 * ProductCard — the canonical catalogue card (BRAND_GUIDELINES.md » Product
 * Card Style): image, name, price, stock badge, wishlist, quick add; hover
 * lift + soft zoom. One component used on home, shop, collections and PDP.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem, toggleWishlist, isWishlisted } = useEnquiryBag();
  const orderable = isOrderable(product);
  const size = defaultSize(product);
  const wished = isWishlisted(product.slug);
  const href = `/products/${product.slug}`;

  const topBadge = product.bestSeller
    ? { label: 'Best Seller', variant: 'gold' as const }
    : product.newArrival
      ? { label: 'New', variant: 'ink' as const }
      : product.unique
        ? { label: 'Unique', variant: 'outline' as const }
        : null;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-canvas shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-lux)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        className,
      )}
    >
      {/* Media */}
      <Link href={href} className="relative block aspect-square overflow-hidden" tabIndex={-1} aria-hidden="true">
        <ProductBottle
          name={product.name}
          family={product.family}
          className="h-full w-full transition-transform duration-500 ease-[var(--ease-lux)] group-hover:scale-[1.05]"
        />
      </Link>

      {/* Top-left merchandising badge */}
      {topBadge && (
        <div className="absolute left-3 top-3">
          <Badge variant={topBadge.variant}>{topBadge.label}</Badge>
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => toggleWishlist(product.slug)}
        aria-pressed={wished}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/90 backdrop-blur transition-colors hover:border-[var(--color-gold)]"
      >
        <Heart
          size={16}
          className={cn(
            'transition-colors',
            wished ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : 'text-muted',
          )}
        />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            {product.family ?? 'Attar'}
          </span>
          <StockBadge status={product.status} />
        </div>

        <h3 className="font-display text-lg leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>

        {product.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between gap-2 pt-2">
          <PriceDisplay prices={product.prices} />

          {orderable && size && (
            <button
              type="button"
              onClick={() => addItem(product, size)}
              aria-label={`Add ${product.name} (${size}) to enquiry bag`}
              className="relative z-10 inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-gold-deep)]"
            >
              <Plus size={14} />
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
