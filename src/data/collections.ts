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
    slug: 'oud',
    title: 'OUD',
    tagline: 'Deep, rich and luxurious agarwood',
    description: 'Rich oud compositions with warmth and depth — refined fragrances for those who love a lasting trail.',
    kind: 'category',
    category: 'oud',
    order: 1,
  },
  {
    slug: 'floral',
    title: 'FLORAL',
    tagline: 'Soft, elegant and velvet rose',
    description: 'Delicate florals inspired by royal gardens and tradition — graceful scents for every occasion.',
    kind: 'category',
    category: 'floral',
    order: 2,
  },
  {
    slug: 'fruity',
    title: 'FRUITY',
    tagline: 'Bright, sweet and playful accords',
    description: 'Juicy, uplifting fruit accords that feel vibrant, light, and cheerful.',
    kind: 'category',
    category: 'fruit',
    order: 3,
  },
  {
    slug: 'fresh',
    title: 'FRESH',
    tagline: 'Crisp citrus and crushed mint',
    description: 'Invigorating fresh daily wear attars crafted for clean, uplifting energy.',
    kind: 'category',
    category: 'new-arrivals',
    order: 4,
  },
  {
    slug: 'arabian',
    title: 'ARABIAN',
    tagline: 'Traditional Middle Eastern splendor',
    description: 'Opulent oriental blends inspired by historic Arabian perfume craftsmanship.',
    kind: 'category',
    category: 'most-wanted',
    order: 5,
  },
  {
    slug: 'woody',
    title: 'WOODY',
    tagline: 'Warm sandalwood and cedarwood',
    description: 'Earthy, ground sandalwood and smoky cedarwood profiles for sophisticated fragrance lovers.',
    kind: 'category',
    category: 'unique',
    order: 6,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** Resolve which products belong to a collection. */
export function collectionMatcher(collection: Collection): (product: Product) => boolean {
  switch (collection.slug) {
    case 'most-wanted':
    case 'best-sellers':
      return (product) => Boolean(product.bestSeller);
    case 'new-arrivals':
      return (product) => Boolean(product.newArrival) || product.category === 'new-arrivals';
    case 'oud':
      return (product) =>
        product.family === 'oud' ||
        product.category === 'oud' ||
        product.name.toLowerCase().includes('oud');
    case 'floral':
      return (product) =>
        product.family === 'floral' ||
        product.category === 'floral' ||
        product.name.toLowerCase().includes('rose') ||
        product.name.toLowerCase().includes('jasmine');
    case 'fruity':
      return (product) =>
        product.family === 'fruity' ||
        product.category === 'fruit' ||
        product.name.toLowerCase().includes('apple') ||
        product.name.toLowerCase().includes('orange');
    case 'fresh':
      return (product) =>
        product.family === 'fresh' ||
        product.family === 'aquatic' ||
        product.name.toLowerCase().includes('fresh') ||
        product.name.toLowerCase().includes('blue');
    case 'arabian':
      return (product) =>
        product.family === 'oriental' ||
        product.family === 'oud' ||
        product.category === 'most-wanted' ||
        product.category === 'oud';
    case 'woody':
      return (product) =>
        product.family === 'woody' ||
        product.category === 'unique' ||
        product.name.toLowerCase().includes('wood');
    default:
      return (product) => product.category === collection.category;
  }
}
