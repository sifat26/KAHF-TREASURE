'use client';

import type { Product } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cartSlice';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DynamicProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [wished, setWished] = useState(false);

  const minPrice = product.variants && product.variants.length > 0
    ? Math.min(...product.variants.map(v => v.priceOverride || product.basePrice))
    : product.basePrice;

  const firstVariant = product.variants?.[0];
  const inStock = product.variants?.some(v => v.stock > 0) ?? true;

  const categoryName = typeof product.categoryId === 'object'
    ? product.categoryId?.name
    : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = firstVariant;
    const price = variant?.priceOverride || product.basePrice;
    dispatch(addToCart({
      productId: product._id,
      title: product.title,
      image: product.images?.[0] || '',
      basePrice: product.basePrice,
      price,
      quantity: 1,
      variantId: variant?._id,
      variantLabel: variant?.label,
      slug: product.slug,
      maxStock: variant?.stock,
      availableVariants: product.variants?.map(v => ({
        _id: v._id, label: v.label, stock: v.stock, priceOverride: v.priceOverride
      })),
    }));
    dispatch(openCart());
  };

  const topBadge = product.newArrival
    ? 'নতুন এসেছে'
    : product.isFeatured
      ? 'ফিচার্ড'
      : product.isOnOffer
        ? 'বিশেষ অফার'
        : null;

  return (
    <article className="group relative flex flex-col min-w-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-gold)]/50 hover:shadow-2xl hover:shadow-[var(--color-gold)]/10 select-none">
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
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(!wished); }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-stone-900/60 backdrop-blur-md text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-stone-900/90"
        >
          <Heart size={15} className={cn('transition-colors', wished ? 'fill-amber-400 text-amber-400' : 'text-amber-400/80')} />
        </button>

        {/* Image Link with Hover Zoom */}
        <Link href={`/products/${product.slug}`} className="relative block h-full w-full">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <ProductBottle name={product.title} family={undefined} showBackground={true} className="h-full w-full" />
          )}
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 bg-[var(--color-background)]">
        <div>
          {/* Category Tag */}
          <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            {categoryName || 'প্রিমিয়াম আতর'}
          </p>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-gold)] truncate">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Rating */}
          {(product.averageRating ?? 0) > 0 && (
            <div className="mt-1.5 flex items-center gap-1">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={cn(i < Math.round(product.averageRating || 0) ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-stone-700')} />
                ))}
              </div>
              <span className="text-[0.68rem] font-semibold text-amber-600 dark:text-amber-400">({product.reviewCount || 0})</span>
            </div>
          )}
        </div>

        {/* Price & Action Section */}
        <div className="mt-4 border-t border-[var(--color-border)]/60 pt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-extrabold text-[var(--color-text-primary)]">
                ৳{minPrice.toLocaleString()}
              </span>
              {Boolean(product.compareAtPrice) && Number(product.compareAtPrice) > minPrice && (
                <span className="text-xs text-[var(--color-muted)] line-through">
                  ৳{Number(product.compareAtPrice).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {inStock ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="relative z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-600/20 active:scale-95 shrink-0"
            >
              <ShoppingBag size={13} />
              কার্টে যোগ
            </button>
          ) : (
            <span className="rounded-full bg-red-100 dark:bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
              স্টক শেষ
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
