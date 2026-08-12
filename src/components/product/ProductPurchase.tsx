'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { StockBadge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import type { Product, ProductSize } from '@/data/products';
import { availableSizes, formatPrice, formatSize, isOrderable, toBanglaDigits } from '@/lib/format';
import { productLabel } from '@/lib/products';
import { cn } from '@/lib/utils';
import { orderProductUrl } from '@/lib/whatsapp';
import { ProductShareButton } from '@/components/product/ProductShareModal';
import { Check, Heart, Minus, Plus, Share2 } from 'lucide-react';
import * as React from 'react';

/**
 * Purchase panel — size selector, quantity, add-to-bag, WhatsApp order,
 * wishlist and share. Used both in the PDP column and (condensed) in the
 * mobile sticky bar.
 */
export function ProductPurchase({ product }: { product: Product }) {
  const sizes = availableSizes(product);
  const orderable = isOrderable(product);
  const [size, setSize] = React.useState<ProductSize | undefined>(sizes[0]);
  const [qty, setQty] = React.useState(1);
  const [copied, setCopied] = React.useState(false);

  const { addItem, toggleWishlist, isWishlisted } = useEnquiryBag();
  const wished = isWishlisted(product.slug);
  const currentPrice = size ? product.prices[size] : undefined;

  // Bangla digit spans explicitly use Noto Serif Bengali so ১ never
  // renders as a glyph that looks like ৯ via a Latin font fallback.
  const bnNum: React.CSSProperties = {
    fontFamily: 'var(--font-bn-serif), var(--font-bn-sans), sans-serif',
  };

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const data = {
      title: productLabel(product),
      text: `${productLabel(product)} — KAHF Treasure`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard unavailable */
      }
    }
  }

  return (
    <div>
      {/* Price */}
      <div className='flex items-baseline gap-3'>
        <span className='font-display text-3xl text-ink sm:text-4xl'>
          {currentPrice ? formatPrice(currentPrice) : 'দাম জানতে যোগাযোগ করুন'}
        </span>
        {size && <span className='text-sm text-muted' style={bnNum} translate='no'>/ {formatSize(size)}</span>}
      </div>

      <div className='mt-2'>
        <StockBadge status={product.status} size='md' />
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className='mt-6'>
          <div className='mb-2 flex items-center justify-between gap-3'>
            <span className='block text-xs font-medium tracking-[0.06em] text-muted'>সাইজ</span>
            {size && (
              <span className='text-xs font-medium tracking-[0.06em]' style={{ color: 'var(--color-gold)', ...bnNum }} translate='no'>
                বেছে নেওয়া হয়েছে: {formatSize(size)}
              </span>
            )}
          </div>
          {/* translate="no" prevents Chrome auto-translate from rewriting Bangla digits */}
          <div className='flex flex-wrap gap-2' translate='no'>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  'relative flex flex-col items-center border px-4 py-2.5 pr-8 text-left transition-all duration-300',
                  size === s
                    ? 'border-line text-ink shadow-[0_0_0_1px_var(--color-accent-tint)]'
                    : 'border-line bg-transparent text-ink-soft',
                )}
                style={{
                  minWidth: '4.5rem',
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: size === s ? 'var(--color-gold-tint)' : 'transparent',
                  borderColor: size === s ? 'var(--color-gold)' : 'var(--color-border)',
                }}
              >
                {size === s && (
                  <span
                    className='absolute right-2 top-2 rounded-full p-1'
                    style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-background)' }}
                  >
                    <Check size={10} />
                  </span>
                )}
                <span className='text-sm font-medium' style={bnNum}>{formatSize(s)}</span>
                <span className={cn('text-xs', size === s ? 'text-ink-soft' : 'text-muted')} style={bnNum}>
                  {formatPrice(product.prices[s]!)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + actions */}
      {orderable && size && (
        <div className='mt-6 flex flex-col gap-3'>
          <div className='flex items-center gap-4'>
            <span className='text-xs font-medium tracking-[0.06em] text-muted'>পরিমাণ</span>
            <div className='flex items-center rounded-full border border-line bg-canvas' translate='no'>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label='পরিমাণ কমান'
                className='flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-ink'
              >
                <Minus size={16} />
              </button>
              <span className='w-8 text-center text-sm font-medium' style={bnNum}>{toBanglaDigits(qty)}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label='পরিমাণ বাড়ান'
                className='flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-ink'
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className='flex gap-3'>
            <Button full size='lg' onClick={() => addItem(product, size, qty)}>
              তালিকায় যোগ করুন
            </Button>
          </div>
          <ButtonLink href={orderProductUrl(product, size)} external variant='gold' size='lg' full>
            <WhatsAppIcon size={18} /> WhatsApp-এ অর্ডার করুন
          </ButtonLink>
        </div>
      )}

      {!orderable && (
        <div className='mt-6'>
          <ButtonLink href={orderProductUrl(product)} external variant='secondary' size='lg' full>
            <WhatsAppIcon size={18} /> স্টক আছে কিনা জেনে নিন
          </ButtonLink>
        </div>
      )}

      {/* Secondary actions */}
      <div className='mt-4 flex items-center gap-5 text-sm'>
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          className='inline-flex items-center gap-2 text-muted transition-colors hover:text-ink'
        >
          <Heart
            size={16}
            className={cn(wished && 'fill-current')}
            style={wished ? { color: 'var(--color-gold)' } : undefined}
          />
          {wished ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
        </button>
        <ProductShareButton
          title={productLabel(product)}
          description={product.description}
          price={currentPrice}
          image={product.images?.[0]}
          slug={product.slug}
        />
      </div>
    </div>
  );
}
