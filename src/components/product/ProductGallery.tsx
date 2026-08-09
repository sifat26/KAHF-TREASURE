'use client';

import { ProductBottle } from '@/components/ui/ProductBottle';
import type { FragranceFamily } from '@/data/products';
import { cn } from '@/lib/utils';
import * as React from 'react';

/**
 * Product gallery — large view + thumbnails with a subtle hover-zoom.
 *
 * Real photography is not yet available (BRAND_GUIDELINES » future assets), so
 * we present the branded ProductBottle placeholder in three framings. When 1:1
 * images exist, swap the panes for <Image> and keep the same thumbnail UX.
 */
export function ProductGallery({ name, family }: { name: string; family?: FragranceFamily }) {
  // `id` stays Latin (it is the React key); `label` is what the customer hears.
  const views = [
    { id: 'front', label: 'সামনে থেকে' },
    { id: 'angle', label: 'কোণ থেকে' },
    { id: 'detail', label: 'কাছ থেকে' },
  ] as const;
  const [active, setActive] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);

  return (
    <div className='flex flex-col gap-4'>
      {/* Main view */}
      <div
        className='relative overflow-hidden rounded-[var(--radius-image)] border border-line bg-[radial-gradient(circle_at_top,var(--color-accent-tint),transparent_24%),var(--color-canvas)] shadow-[var(--shadow-card)]'
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <div className='absolute inset-0 bg-[linear-gradient(180deg,var(--t-sheen-top),transparent_20%,transparent_80%,var(--t-sheen-bottom))]' />
        <ProductBottle
          name={name}
          family={family}
          className={cn(
            'aspect-square w-full transition-transform duration-500 ease-[var(--ease-lux)]',
            zoom ? 'scale-110' : 'scale-100',
          )}
        />
      </div>

      {/* Thumbnails */}
      <div className='flex gap-3'>
        {views.map((view, i) => (
          <button
            key={view.id}
            onClick={() => setActive(i)}
            aria-label={`${view.label} দেখুন`}
            aria-pressed={active === i}
            className={cn(
              'relative h-20 w-20 overflow-hidden rounded-[var(--radius-image)] border bg-canvas transition-all duration-300',
              active === i
                ? 'border-[var(--color-gold)] shadow-[0_8px_24px_var(--t-shadow-fab)]'
                : 'border-line hover:border-[var(--color-gold)]/50',
            )}
          >
            <ProductBottle name={name} family={family} className='h-full w-full' compact />
          </button>
        ))}
      </div>
    </div>
  );
}
