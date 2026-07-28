import * as React from 'react';
import { cn } from '@/lib/utils';
import type { FragranceFamily } from '@/data/products';

/**
 * ProductBottle — a branded CSS placeholder for product imagery.
 *
 * The catalogue has no product photography yet (BRAND_GUIDELINES.md specifies
 * 1:1, 1200px+ images — "future assets"). Rather than ship fake photos, we
 * render an elegant, on-brand attar-bottle illustration tinted by fragrance
 * family. Swap this for <Image> once real 1:1 photography exists.
 */

const FAMILY_TINT: Record<FragranceFamily, string> = {
  fresh: '#dbe7e4',
  aquatic: '#d6e3ec',
  citrus: '#ece4c9',
  woody: '#e3d6c4',
  oud: '#d8c8b4',
  oriental: '#e6d3c0',
  sweet: '#ecd9d9',
  fruity: '#eddad0',
  floral: '#ecd9e4',
};

export function ProductBottle({
  name,
  family,
  className,
  compact = false,
}: {
  name: string;
  family?: FragranceFamily;
  className?: string;
  compact?: boolean;
}) {
  const tint = family ? FAMILY_TINT[family] : '#e7ddcd';
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className,
      )}
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${tint} 0%, #ffffff 72%)`,
      }}
      aria-hidden="true"
    >
      {/* soft floor shadow */}
      <div className="absolute bottom-[14%] h-4 w-1/3 rounded-[50%] bg-ink/10 blur-md" />

      <svg
        viewBox="0 0 120 180"
        className={cn('relative drop-shadow-sm', compact ? 'h-[62%]' : 'h-[68%]')}
        role="img"
        aria-label={`${name} bottle`}
      >
        {/* cap */}
        <rect x="48" y="6" width="24" height="20" rx="3" fill="#0b0b0b" />
        <rect x="46" y="24" width="28" height="8" rx="2" fill="#1e1e1e" />
        {/* neck */}
        <rect x="52" y="30" width="16" height="12" fill="#efe9df" />
        {/* body */}
        <path
          d="M30 54c0-8 8-14 18-16h24c10 2 18 8 18 16v96c0 12-9 20-30 20s-30-8-30-20V54z"
          fill="#fbf8f2"
          stroke="#e2d8c6"
          strokeWidth="1.5"
        />
        {/* liquid */}
        <path
          d="M34 96c0 0 0 0 0 0v54c0 9 7 16 26 16s26-7 26-16V96c-8 5-18 7-26 7s-18-2-26-7z"
          fill={tint}
          opacity="0.9"
        />
        {/* highlight */}
        <rect x="40" y="66" width="6" height="70" rx="3" fill="#ffffff" opacity="0.6" />
        {/* label */}
        <rect x="44" y="112" width="32" height="34" rx="4" fill="#ffffff" opacity="0.85" stroke="#e2d8c6" />
        <text
          x="60"
          y="133"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="12"
          fill="#0b0b0b"
          letterSpacing="0.5"
        >
          {initials || 'KT'}
        </text>
      </svg>
    </div>
  );
}
