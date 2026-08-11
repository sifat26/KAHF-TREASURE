'use client';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { cn } from '@/lib/utils';
import { productServices } from '@/services/product.services';
import { addToCart, openCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import type { Product, ProductVariant } from '@/types/product';
import { Clock, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export function DynamicProductDetail({ slug, initialProduct }: { slug: string; initialProduct?: Product | null }) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const selectDefaultVariant = useCallback((nextProduct: Product) => {
    setSelectedVariant(nextProduct.variants?.[0] || null);
  }, []);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      selectDefaultVariant(initialProduct);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    productServices
      .getProduct(slug)
      .then((res) => {
        if (res.success && res.data) {
          setProduct(res.data);
          selectDefaultVariant(res.data);
        } else {
          setError('পণ্য পাওয়া যায়নি');
        }
      })
      .catch(() => setError('পণ্য লোড করা যায়নি'))
      .finally(() => setLoading(false));
  }, [initialProduct, selectDefaultVariant, slug]);

  if (loading) {
    return (
      <div className='min-h-screen pt-24'>
        <Container className='py-10'>
          <div className='animate-pulse grid gap-8 lg:grid-cols-2'>
            <div className='aspect-[3/4] rounded-3xl bg-[var(--color-surface)]' />
            <div className='space-y-4'>
              <div className='h-8 w-2/3 rounded bg-[var(--color-surface)]' />
              <div className='h-4 w-1/3 rounded bg-[var(--color-surface)]' />
              <div className='h-20 rounded bg-[var(--color-surface)]' />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='min-h-screen pt-24'>
        <Container className='py-20 text-center'>
          <p className='text-lg font-medium text-[var(--color-text-secondary)]'>{error || 'পণ্য পাওয়া যায়নি'}</p>
          <Link
            href='/shop'
            className='mt-4 inline-block rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-[var(--color-on-accent)]'
          >
            শপে ফিরুন
          </Link>
        </Container>
      </div>
    );
  }

  const price = selectedVariant?.priceOverride ?? product.basePrice;
  const comparePrice = selectedVariant?.compareAtPrice ?? (selectedVariant ? undefined : product.compareAtPrice);
  const hasDiscount = Boolean(comparePrice && Number(comparePrice) > price);
  const discountPercent = hasDiscount ? Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100) : 0;

  const stock = selectedVariant?.stock ?? 0;
  const inStock = stock > 0;
  const hasVariants = (product.variants?.length ?? 0) > 0;
  const canAddToCart = Boolean(selectedVariant && inStock);
  const ctaLabel = !hasVariants
    ? 'স্টক শেষ'
    : !selectedVariant
      ? 'একটি সাইজ বেছে নিন'
      : inStock
        ? 'কার্টে যোগ করুন'
        : 'স্টক শেষ';

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        title: product.title,
        image: product.images?.[0] || '',
        basePrice: product.basePrice,
        price,
        compareAtPrice: comparePrice,
        quantity,
        variantId: selectedVariant?._id,
        variantLabel: selectedVariant?.label,
        slug: product.slug,
        maxStock: stock,
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

  const attrs = (product.attributes as Record<string, string>) || {};

  return (
    <div className='min-h-screen bg-[var(--color-background)] pt-24 pb-16'>
      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'শপ', href: '/shop' },
            { name: product.title, href: `/products/${product.slug}` },
          ]}
          className='mb-6 text-xs text-[var(--color-text-secondary)]'
        />

        <div className='grid gap-8 lg:grid-cols-2'>
          {/* Image */}
          <div className='relative'>
            <div className='sticky top-24 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)]'>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  className='aspect-square w-full object-contain p-6 transition-all duration-300'
                />
              ) : (
                <div className='aspect-square w-full'>
                  <ProductBottle
                    name={product.title}
                    family={undefined}
                    showBackground={true}
                    className='h-full w-full'
                  />
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <div className='flex flex-wrap gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]/50'>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type='button'
                      onClick={() => setSelectedImageIndex(i)}
                      className={cn(
                        'h-16 w-16 overflow-hidden rounded-xl border-2 transition-all cursor-pointer',
                        selectedImageIndex === i
                          ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30 scale-105'
                          : 'border-[var(--color-border)] opacity-70 hover:opacity-100',
                      )}
                    >
                      <img src={img} alt={`${product.title} ${i + 1}`} className='h-full w-full object-cover' />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className='space-y-5'>
            <div>
              {product.isFeatured && (
                <span className='mb-2 inline-block rounded-full bg-[var(--color-gold-tint)] px-3 py-0.5 text-xs font-bold text-[var(--color-text-primary)]'>
                  ফিচার্ড
                </span>
              )}
              <h1 className='font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]'>
                {product.title}
              </h1>
              {product.brand && <p className='mt-1 text-sm text-[var(--color-text-tertiary)]'>{product.brand}</p>}
            </div>

            {/* Rating */}
            {Boolean(product.averageRating) && (product.averageRating || 0) > 0 && (
              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < Math.round(product.averageRating!)
                          ? 'fill-[var(--color-gold)] text-[var(--color-gold)]'
                          : 'text-[var(--color-border)]',
                      )}
                    />
                  ))}
                </div>
                <span className='text-sm text-[var(--color-text-tertiary)]'>
                  {product.averageRating} ({product.reviewCount} রিভিউ)
                </span>
              </div>
            )}

            {/* Price Display with Discount */}
            <div className='flex items-baseline gap-3 flex-wrap'>
              <span className='text-3xl font-extrabold text-[var(--color-text-primary)]'>৳{price}</span>
              {hasDiscount && <span className='text-lg text-[var(--color-muted)] line-through'>৳{comparePrice}</span>}
              {hasDiscount && (
                <span className='rounded-full bg-red-500/10 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-600 dark:text-red-400'>
                  {discountPercent}% ছাড়
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className='text-sm leading-relaxed text-[var(--color-text-secondary)]'>{product.description}</p>
            )}

            {/* Attributes */}
            {Object.keys(attrs).length > 0 && (
              <div className='grid grid-cols-2 gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4'>
                {attrs.family && <Attr label='ফ্যামিলি' value={attrs.family} />}
                {attrs.gender && <Attr label='ধরণ' value={attrs.gender} />}
                {attrs.longevity && <Attr label='স্থায়িত্ব' value={attrs.longevity} />}
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <label className='text-sm font-semibold text-[var(--color-text-primary)]'>সাইজ নির্বাচন করুন</label>
                  {selectedVariant && (
                    <span className='text-xs font-semibold text-[var(--color-gold)]'>
                      বাছাইকৃত: {selectedVariant.label}
                    </span>
                  )}
                </div>
                <div className='flex flex-wrap gap-2.5'>
                  {product.variants.map((variant) => {
                    const vPrice = variant.priceOverride ?? product.basePrice;
                    const vComparePrice = variant.compareAtPrice ?? product.compareAtPrice;
                    const vHasDiscount = Boolean(vComparePrice && Number(vComparePrice) > vPrice);
                    const isSelected = selectedVariant?._id === variant._id || selectedVariant?.label === variant.label;

                    return (
                      <button
                        key={variant._id || variant.label}
                        type='button'
                        onClick={() => {
                          setSelectedVariant(variant);
                          setQuantity(1);
                        }}
                        disabled={variant.stock === 0}
                        className={cn(
                          'flex flex-col items-center justify-center min-w-[5rem] rounded-xl border px-3.5 py-2.5 text-center transition shadow-sm',
                          isSelected
                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent-strong)] ring-2 ring-[var(--color-accent)]/30 font-bold'
                            : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]',
                          variant.stock === 0 && 'cursor-not-allowed opacity-40 line-through',
                        )}
                      >
                        <span className='text-sm font-semibold'>{variant.label}</span>
                        <div className='flex items-baseline gap-1 mt-1'>
                          <span
                            className={cn(
                              'text-xs font-bold',
                              isSelected ? 'text-[var(--color-accent-strong)]' : 'text-[var(--color-text-primary)]',
                            )}
                          >
                            ৳{vPrice}
                          </span>
                          {vHasDiscount && (
                            <span className='text-[10px] text-[var(--color-muted)] line-through'>৳{vComparePrice}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex items-center rounded-full border border-[var(--color-border)]'>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className='flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                >
                  <Minus size={16} />
                </button>
                <span className='min-w-[40px] text-center font-semibold text-[var(--color-text-primary)]'>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(stock || 99, q + 1))}
                  className='flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className='flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-3 text-sm font-bold text-[var(--color-on-accent)] shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <ShoppingBag size={18} />
                {ctaLabel}
              </button>
            </div>

            {/* Trust badges */}
            <div className='grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-4'>
              <div className='flex flex-col items-center gap-1 text-center'>
                <Truck className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>সারা দেশে ডেলিভারি</span>
              </div>
              <div className='flex flex-col items-center gap-1 text-center'>
                <ShieldCheck className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>১০০% অরিজিনাল</span>
              </div>
              <div className='flex flex-col items-center gap-1 text-center'>
                <Clock className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>দ্রুত ডেলিভারি</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-muted)]'>{label}</p>
      <p className='text-sm font-medium text-[var(--color-text-primary)]'>{value}</p>
    </div>
  );
}
