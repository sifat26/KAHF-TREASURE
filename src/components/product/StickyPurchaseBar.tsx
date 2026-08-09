'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { ButtonLink } from '@/components/ui/Button';
import type { Product } from '@/data/products';
import { availableSizes, formatPrice, isOrderable, startingPrice } from '@/lib/format';
import { productLabel } from '@/lib/products';
import { cn } from '@/lib/utils';
import { orderProductUrl } from '@/lib/whatsapp';
import * as React from 'react';

/**
 * Mobile sticky purchase bar (BRAND_GUIDELINES/REDESIGN » sticky Add To Cart).
 * Reveals after the user scrolls past the hero purchase panel.
 */
export function StickyPurchaseBar({ product }: { product: Product }) {
  const [visible, setVisible] = React.useState(false);
  const { addItem } = useEnquiryBag();
  const size = availableSizes(product)[0];
  const orderable = isOrderable(product);
  const from = startingPrice(product.prices);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!orderable || !size) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-lg transition-transform duration-300 ease-lux lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className='flex items-center gap-3'>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium text-ink'>{productLabel(product)}</p>
          {from !== null && <p className='text-xs text-muted'>{formatPrice(from)} থেকে</p>}
        </div>
        <button
          onClick={() => addItem(product, size)}
          aria-label={`${productLabel(product)} তালিকায় যোগ করুন`}
          className='h-11 rounded-(--radius-btn) border border-(--color-gold) px-4 text-sm font-medium text-ink'
        >
          যোগ করুন
        </button>
        <ButtonLink href={orderProductUrl(product, size)} external variant='gold' className='h-11 px-4'>
          <WhatsAppIcon size={16} /> অর্ডার
        </ButtonLink>
      </div>
    </div>
  );
}
