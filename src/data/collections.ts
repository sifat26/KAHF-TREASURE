/**
 * Collections — curated groupings shown on /collections and /collections/[slug].
 *
 * Mirrors docs/PRODUCT_CATALOG.md » Product Categories. Each collection maps to
 * either a product `category` or a merchandising flag (best sellers / new arrivals).
 */

import type { CategorySlug, Product } from './products';

export type CollectionKind = 'category' | 'best-sellers' | 'new-arrivals';

export interface Collection {
  slug: string;
  title: string;
  /** Short line shown under the title. */
  tagline: string;
  /** Longer intro for the collection landing page. */
  description: string;
  kind: CollectionKind;
  /** Present when kind === 'category'. */
  category?: CategorySlug;
  /** Ordering on the collections index. */
  order: number;
}

export const collections: Collection[] = [
  {
    slug: 'most-wanted',
    title: 'Most Wanted',
    tagline: 'The fragrances everyone is reaching for',
    description:
      'Our most-loved signatures — the scents our customers return to again and again.',
    kind: 'category',
    category: 'most-wanted',
    order: 1,
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    tagline: 'Freshly added to the collection',
    description:
      'The latest additions to the KAHF Treasure library — modern, versatile and ready for daily wear.',
    kind: 'category',
    category: 'new-arrivals',
    order: 2,
  },
  {
    slug: 'oud',
    title: 'Oud Collection',
    tagline: 'Deep, woody and luxurious',
    description:
      'Rich oud compositions with warmth and depth — refined fragrances for those who love a lasting trail.',
    kind: 'category',
    category: 'oud',
    order: 3,
  },
  {
    slug: 'floral',
    title: 'Floral Collection',
    tagline: 'Soft, elegant and timeless',
    description:
      'Delicate florals inspired by gardens and tradition — graceful scents for every day.',
    kind: 'category',
    category: 'floral',
    order: 4,
  },
  {
    slug: 'fruit',
    title: 'Fruit Collection',
    tagline: 'Bright, sweet and playful',
    description: 'Juicy, uplifting fruit accords that feel light and cheerful.',
    kind: 'category',
    category: 'fruit',
    order: 5,
  },
  {
    slug: 'best-sellers',
    title: 'Best Sellers',
    tagline: 'Customer favourites',
    description: 'The fragrances our customers rate and reorder the most.',
    kind: 'best-sellers',
    order: 6,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Resolve which products belong to a collection. */
export function collectionMatcher(collection: Collection): (product: Product) => boolean {
  switch (collection.kind) {
    case 'best-sellers':
      return (product) => Boolean(product.bestSeller);
    case 'new-arrivals':
      return (product) => Boolean(product.newArrival) || product.category === 'new-arrivals';
    case 'category':
    default:
      return (product) => product.category === collection.category;
  }
}
