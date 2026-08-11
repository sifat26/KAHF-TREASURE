'use client';

import { ProductBottle } from '@/components/ui/ProductBottle';
import { cn } from '@/lib/utils';
import { addToCart, openCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import type { Product } from '@/types/product';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function DynamicProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [wished, setWished] = useState(false);

  const firstVariant = product.variants?.[0];
  const minPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.priceOverride || product.basePrice))
      : product.basePrice;

  const comparePrice = firstVariant?.compareAtPrice ?? product.compareAtPrice;
  const hasDiscount = Boolean(comparePrice && Number(comparePrice) > minPrice);

  const inStock = product.variants?.some((v) => v.stock > 0) ?? true;

  const categoryName = typeof product.categoryId === 'object' ? product.categoryId?.name : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = firstVariant;
    const price = variant?.priceOverride || product.basePrice;
    const itemComparePrice = variant?.compareAtPrice || product.compareAtPrice;
    dispatch(
      addToCart({
        productId: product._id,
        title: product.title,
        image: product.images?.[0] || '',
        basePrice: product.basePrice,
        price,
        compareAtPrice: itemComparePrice,
        quantity: 1,
        variantId: variant?._id,
        variantLabel: variant?.label,
        slug: product.slug,
        maxStock: variant?.stock,
        availableVariants: product.variants?.map((v) => ({
          _id: v._id,
          label: v.label,
          stock: v.stock,
          priceOverride: v.priceOverride,
          compareAtPrice: v.compareAtPrice,
        })),
      }),
    );
    dispatch(openCart());
  };

  const topBadge = product.newArrival
    ? 'নতুন এসেছে'
    : product.isFeatured
      ? 'ফিচার্ড'
      : product.isOnOffer || hasDiscount
        ? 'বিশেষ অফার'
        : null;

  return (
    <article className='group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-gold)]/50 hover:shadow-2xl hover:shadow-[var(--color-gold)]/10 select-none sm:rounded-2xl'>
      {/* Media Box */}
      <div className='relative aspect-[3/4] w-full overflow-hidden bg-stone-950/90 sm:aspect-[4/5]'>
        {/* Floating Gold Foil Badge */}
        {topBadge && (
          <div className='absolute left-3 top-3 z-10'>
            <span className='inline-flex items-center gap-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-[var(--color-gold)]/40 px-3 py-1 text-[0.62rem] font-bold tracking-wider text-[var(--color-gold)] shadow-md'>
              <Sparkles size={10} />
              {topBadge}
            </span>
          </div>
        )}

        {/* Floating Wishlist Button */}
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWished(!wished);
          }}
          className='absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-stone-900/60 backdrop-blur-md text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-stone-900/90'
        >
          <Heart
            size={15}
            className={cn('transition-colors', wished ? 'fill-amber-400 text-amber-400' : 'text-amber-400/80')}
          />
        </button>

        {/* Image Link with Hover Zoom */}
        <Link href={`/products/${product.slug}`} className='relative block h-full w-full'>
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108'
            />
          ) : (
            <ProductBottle name={product.title} family={undefined} showBackground={true} className='h-full w-full' />
          )}
          {/* Subtle gradient vignette overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60' />
        </Link>
      </div>

      {/* Product Information */}
      <div className='flex flex-1 flex-col justify-between bg-[var(--color-background)] p-3.5 sm:p-5'>
        <div>
          {/* Category Tag */}
          <p className='mb-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-[0.62rem]'>
            {categoryName || 'প্রিমিয়াম আতর'}
          </p>

          {/* Title */}
          <h3 className='font-serif text-sm font-bold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-gold)] line-clamp-2 sm:text-lg sm:line-clamp-1'>
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>

          {/* Rating */}
          {(product.averageRating ?? 0) > 0 && (
            <div className='mt-1.5 flex items-center gap-0.5 sm:gap-1'>
              <div className='flex text-amber-400'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={cn(
                      i < Math.round(product.averageRating || 0)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300 dark:text-stone-700',
                    )}
                  />
                ))}
              </div>
              <span className='text-[0.64rem] font-semibold text-amber-600 dark:text-amber-400 sm:text-[0.68rem]'>
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Section */}
        <div className='mt-3 flex flex-col gap-3 border-t border-[var(--color-border)]/60 pt-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-4'>
          <div className='flex flex-col'>
            <div className='flex items-baseline gap-1.5'>
              <span className='font-serif text-base font-extrabold text-[var(--color-text-primary)] sm:text-xl'>
                ৳{minPrice.toLocaleString()}
              </span>
              {Boolean(comparePrice) && Number(comparePrice) > minPrice && (
                <span className='text-xs text-[var(--color-muted)] line-through'>
                  ৳{Number(comparePrice).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {inStock ? (
            <button
              type='button'
              onClick={handleAddToCart}
              className='relative z-10 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-600/20 active:scale-95 shrink-0 sm:w-auto'
            >
              <ShoppingBag size={13} />
              কার্টে যোগ
            </button>
          ) : (
            <span className='rounded-full bg-red-100 dark:bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400'>
              স্টক শেষ
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
