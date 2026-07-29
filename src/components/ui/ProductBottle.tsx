'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { FragranceFamily } from '@/data/products';

/**
 * ProductBottle — exact photorealistic luxury attar bottle matching reference snippet photo.
 *  • Ornate pointed golden dome crown cap with filigree cutouts
 *  • Shiny gold neck collar
 *  • Clear square glass bottle with gold attar oil
 *  • Black label with gold filigree crest & KAHF TREASURE branding
 */
export function ProductBottle({
  name,
  family,
  className,
  showBackground = true,
  compact = false,
}: {
  name: string;
  family?: FragranceFamily;
  className?: string;
  showBackground?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full h-full overflow-hidden select-none group',
        className,
      )}
      style={
        showBackground
          ? {
              background:
                'radial-gradient(ellipse 85% 85% at 50% 45%, rgba(35, 28, 18, 0.95) 0%, rgba(10, 9, 8, 0.98) 90%)',
            }
          : undefined
      }
      aria-hidden="true"
    >
      {/* Soft warm spotlight behind bottle */}
      {showBackground && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#c8a96a]/15 blur-2xl group-hover:bg-[#c8a96a]/25 transition-all duration-500"
        />
      )}

      {/* Photorealistic Attar Bottle Image — Large & Prominent */}
      <div className="relative w-full h-full flex items-center justify-center p-1.5 overflow-hidden">
        {/* eslint-disable-next-img-element */}
        <img
          src="/images/exact-attar-bottle.png"
          alt={`${name} luxury attar bottle`}
          className="w-full h-full object-contain scale-[1.28] transform group-hover:scale-[1.35] transition-transform duration-500 ease-out filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Subtle floor shadow glow */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-8 opacity-45 bg-gradient-to-t from-[#0d0c0a] to-transparent"
      />
    </div>
  );
}
