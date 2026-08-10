'use client';

import { useEffect, useState } from 'react';
import { productServices } from '@/services/product.services';
import type { Product, ProductVariant } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cartSlice';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Star, Plus, Minus, ShoppingBag, Truck, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/components/seo/GoogleAnalytics';
import Link from 'next/link';

export function DynamicProductDetail({ slug, initialProduct }: { slug: string; initialProduct?: Product | null }) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialProduct) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    productServices.getProduct(slug)
      .then(res => {
        if (res.success && res.data) {
          setProduct(res.data);
          setSelectedVariant(res.data.variants?.[0] || null);
        } else {
          setError('à¦ªà¦£à§à¦¯ à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿');
        }
      })
      .catch(() => setError('à¦ªà¦£à§à¦¯ à¦²à§‹à¦¡ à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿'))
      .finally(() => setLoading(false));
  }, [slug]);

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
          <p className='text-lg font-medium text-[var(--color-text-secondary)]'>{error || 'à¦ªà¦£à§à¦¯ à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿'}</p>
          <Link href='/shop' className='mt-4 inline-block rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-[var(--color-on-accent)]'>
            à¦¶à¦ªà§‡ à¦«à¦¿à¦°à§à¦¨
          </Link>
        </Container>
      </div>
    );
  }

  const price = selectedVariant?.priceOverride || product.basePrice;
  const stock = selectedVariant?.stock ?? 0;
  const inStock = stock > 0;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      title: product.title,
      image: product.images?.[0] || '',
      basePrice: product.basePrice,
      price,
      quantity,
      variantId: selectedVariant?._id,
      variantLabel: selectedVariant?.label,
      slug: product.slug,
      maxStock: stock,
      availableVariants: product.variants?.map(v => ({
        _id: v._id, label: v.label, stock: v.stock, priceOverride: v.priceOverride
      })),
    }));
    dispatch(openCart());
  };

  const attrs = product.attributes as Record<string, string> || {};

  return (
    <div className='min-h-screen bg-[var(--color-background)] pt-24 pb-16'>
      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'à¦¹à§‹à¦®', href: '/' },
            { name: 'à¦¶à¦ª', href: '/shop' },
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
                  <ProductBottle name={product.title} family={undefined} showBackground={true} className='h-full w-full' />
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
                          : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
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
                  à¦«à¦¿à¦šà¦¾à¦°à§à¦¡
                </span>
              )}
              <h1 className='font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]'>{product.title}</h1>
              {product.brand && <p className='mt-1 text-sm text-[var(--color-text-tertiary)]'>{product.brand}</p>}
            </div>

            {/* Rating */}
            {Boolean(product.averageRating) && (product.averageRating || 0) > 0 && (
              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={cn(i < Math.round(product.averageRating!) ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : 'text-[var(--color-border)]')} />
                  ))}
                </div>
                <span className='text-sm text-[var(--color-text-tertiary)]'>{product.averageRating} ({product.reviewCount} à¦°à¦¿à¦­à¦¿à¦‰)</span>
              </div>
            )}

            {/* Price */}
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-[var(--color-text-primary)]'>à§³{price}</span>
              {Boolean(product.compareAtPrice) && Number(product.compareAtPrice) > price && (
                <span className='text-lg text-[var(--color-muted)] line-through'>à§³{product.compareAtPrice}</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className='text-sm leading-relaxed text-[var(--color-text-secondary)]'>{product.description}</p>
            )}

            {/* Attributes */}
            {Object.keys(attrs).length > 0 && (
              <div className='grid grid-cols-2 gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4'>
                {attrs.family && <Attr label='à¦«à§à¦¯à¦¾à¦®à¦¿à¦²à¦¿' value={attrs.family} />}
                {attrs.gender && <Attr label='à¦§à¦°à¦¨' value={attrs.gender} />}
                {attrs.longevity && <Attr label='à¦¸à§à¦¥à¦¾à¦¯à¦¼à¦¿à¦¤à§à¦¬' value={attrs.longevity} />}
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className='mb-2 block text-sm font-semibold text-[var(--color-text-primary)]'>à¦¸à¦¾à¦‡à¦œ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨</label>
                <div className='flex flex-wrap gap-2'>
                  {product.variants.map(variant => (
                    <button
                      key={variant._id || variant.label}
                      onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                      disabled={variant.stock === 0}
                      className={cn(
                        'rounded-lg border px-4 py-2 text-sm font-semibold transition',
                        selectedVariant?._id === variant._id || selectedVariant?.label === variant.label
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent-strong)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]',
                        variant.stock === 0 && 'cursor-not-allowed opacity-40 line-through'
                      )}
                    >
                      {variant.label}
                      {variant.priceOverride && variant.priceOverride !== product.basePrice && (
                        <span className='ml-1 text-xs'>à§³{variant.priceOverride}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center rounded-full border border-[var(--color-border)]'>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className='flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'>
                  <Minus size={16} />
                </button>
                <span className='min-w-[40px] text-center font-semibold text-[var(--color-text-primary)]'>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(stock || 99, q + 1))} className='flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'>
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className='flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-3 text-sm font-bold text-[var(--color-on-accent)] shadow-lg transition hover:brightness-110 disabled:opacity-50'
              >
                <ShoppingBag size={18} />
                {inStock ? 'à¦•à¦¾à¦°à§à¦Ÿà§‡ à¦¯à§‹à¦— à¦•à¦°à§à¦¨' : 'à¦¸à§à¦Ÿà¦• à¦¶à§‡à¦·'}
              </button>
            </div>

            {/* Trust badges */}
            <div className='grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-4'>
              <div className='flex flex-col items-center gap-1 text-center'>
                <Truck className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>à¦¸à¦¾à¦°à¦¾ à¦¦à§‡à¦¶à§‡ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿</span>
              </div>
              <div className='flex flex-col items-center gap-1 text-center'>
                <ShieldCheck className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>à§§à§¦à§¦% à¦…à¦°à¦¿à¦œà¦¿à¦¨à¦¾à¦²</span>
              </div>
              <div className='flex flex-col items-center gap-1 text-center'>
                <Clock className='h-5 w-5 text-[var(--color-accent)]' />
                <span className='text-[0.65rem] text-[var(--color-text-tertiary)]'>à¦¦à§à¦°à§à¦¤ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿</span>
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


