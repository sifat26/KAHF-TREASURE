import type { Collection } from '@/data/collections';

/**
 * Per-collection artwork and seal-emblem styling.
 *
 * The seal gradients are theme-aware: `seal-*` classes are defined in
 * globals.css against --t-seal-* tokens that are redefined per theme, so the
 * emblems stay legible on both the dark and the ivory page.
 */
export interface CollectionMedia {
  bgImage: string;
  /** Theme-aware gradient class from globals.css. */
  sealBg: string;
  sealBorder: string;
}

const FALLBACK: CollectionMedia = {
  bgImage: '/images/collection-oud.png',
  sealBg: 'seal-oud',
  sealBorder: 'border-[var(--color-accent)]/70',
};

const collectionMedia: Record<string, CollectionMedia> = {
  oud: {
    bgImage: '/images/collection-oud.png',
    sealBg: 'seal-oud',
    sealBorder: 'border-[var(--color-accent)]/70',
  },
  floral: {
    bgImage: '/images/collection-floral.png',
    sealBg: 'seal-floral',
    sealBorder: 'border-[var(--color-seal-floral-edge)]/70',
  },
  fruity: {
    bgImage: '/images/collection-fruity.png',
    sealBg: 'seal-fruity',
    sealBorder: 'border-[var(--color-seal-fruity-edge)]/70',
  },
  fresh: {
    bgImage: '/images/collection-fresh.png',
    sealBg: 'seal-fresh',
    sealBorder: 'border-[var(--color-seal-fresh-edge)]/70',
  },
  arabian: {
    bgImage: '/images/collection-arabian.png',
    sealBg: 'seal-oud',
    sealBorder: 'border-[var(--color-accent)]/80',
  },
  woody: {
    bgImage: '/images/collection-woody.png',
    sealBg: 'seal-woody',
    sealBorder: 'border-[var(--color-accent)]/60',
  },
};

export function getCollectionMedia(slug: Collection['slug']): CollectionMedia {
  return collectionMedia[slug] ?? FALLBACK;
}
