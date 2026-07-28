'use client';

import * as React from 'react';
import { Heart, Minus, Plus, Share2, Check } from 'lucide-react';
import type { Product, ProductSize } from '@/data/products';
import { availableSizes, formatPrice, formatSize, isOrderable } from '@/lib/format';
import { orderProductUrl } from '@/lib/whatsapp';
import { Button, ButtonLink } from '@/components/ui/Button';
import { StockBadge } from '@/components/ui/Badge';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { cn } from '@/lib/utils';

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

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const data = { title: product.name, text: `${product.name} — KAHF Treasure`, url };
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
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl text-ink">
          {currentPrice ? formatPrice(currentPrice) : 'Price on request'}
        </span>
        {size && <span className="text-sm text-muted">/ {formatSize(size)}</span>}
      </div>

      <div className="mt-2">
        <StockBadge status={product.status} size="md" />
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className="mt-6">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Size
          </span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  'flex min-w-[4.5rem] flex-col items-center rounded-[var(--radius-btn)] border px-4 py-2.5 transition-colors',
                  size === s
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-ink-soft hover:border-ink',
                )}
              >
                <span className="text-sm font-medium">{formatSize(s)}</span>
                <span className={cn('text-xs', size === s ? 'text-white/70' : 'text-muted')}>
                  {formatPrice(product.prices[s]!)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + actions */}
      {orderable && size && (
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Qty</span>
            <div className="flex items-center rounded-full border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center text-muted hover:text-ink"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center text-muted hover:text-ink"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button full size="lg" onClick={() => addItem(product, size, qty)}>
              Add to Enquiry Bag
            </Button>
          </div>
          <ButtonLink
            href={orderProductUrl(product, size)}
            external
            variant="gold"
            size="lg"
            full
          >
            <WhatsAppIcon size={18} /> Order on WhatsApp
          </ButtonLink>
        </div>
      )}

      {!orderable && (
        <div className="mt-6">
          <ButtonLink
            href={orderProductUrl(product)}
            external
            variant="secondary"
            size="lg"
            full
          >
            <WhatsAppIcon size={18} /> Ask about availability
          </ButtonLink>
        </div>
      )}

      {/* Secondary actions */}
      <div className="mt-4 flex items-center gap-5 text-sm">
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          <Heart size={16} className={cn(wished && 'fill-[var(--color-gold)] text-[var(--color-gold)]')} />
          {wished ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={share}
          className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? 'Link copied' : 'Share'}
        </button>
      </div>
    </div>
  );
}
