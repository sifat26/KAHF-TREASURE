'use client';

import * as React from 'react';
import type { FragranceFamily } from '@/data/products';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { cn } from '@/lib/utils';

/**
 * Product gallery — large view + thumbnails with a subtle hover-zoom.
 *
 * Real photography is not yet available (BRAND_GUIDELINES » future assets), so
 * we present the branded ProductBottle placeholder in three framings. When 1:1
 * images exist, swap the panes for <Image> and keep the same thumbnail UX.
 */
export function ProductGallery({
  name,
  family,
}: {
  name: string;
  family?: FragranceFamily;
}) {
  const views = ['front', 'angle', 'detail'] as const;
  const [active, setActive] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 sm:flex-col">
        {views.map((view, i) => (
          <button
            key={view}
            onClick={() => setActive(i)}
            aria-label={`View ${view}`}
            aria-pressed={active === i}
            className={cn(
              'relative h-20 w-20 overflow-hidden rounded-[var(--radius-image)] border bg-canvas transition-colors',
              active === i ? 'border-ink' : 'border-line hover:border-muted',
            )}
          >
            <ProductBottle name={name} family={family} className="h-full w-full" compact />
          </button>
        ))}
      </div>

      {/* Main view */}
      <div
        className="relative flex-1 overflow-hidden rounded-[var(--radius-image)] border border-line bg-canvas"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <ProductBottle
          name={name}
          family={family}
          className={cn(
            'aspect-square w-full transition-transform duration-500 ease-[var(--ease-lux)]',
            zoom ? 'scale-110' : 'scale-100',
          )}
        />
      </div>
    </div>
  );
}
