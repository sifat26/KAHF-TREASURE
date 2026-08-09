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
    title: 'উদ',
    tagline: 'গভীর, গাঢ় আর রাজকীয় আগরকাঠ',
    description:
      'উদের উষ্ণ আর গভীর গঠন — যাঁরা চান অনেকক্ষণ থেকে যাওয়া সুবাসের এক রেশ, তাঁদের জন্য পরিমার্জিত আতর।',
    kind: 'category',
    category: 'oud',
    order: 1,
  },
  {
    slug: 'floral',
    title: 'ফুলেল',
    tagline: 'কোমল, মার্জিত আর মখমলি গোলাপ',
    description:
      'রাজবাগান আর পুরোনো ঐতিহ্যের ছোঁয়ায় গড়া কোমল ফুলেল সুবাস — যেকোনো উপলক্ষে স্নিগ্ধ আর মানানসই।',
    kind: 'category',
    category: 'floral',
    order: 2,
  },
  {
    slug: 'fruity',
    title: 'ফলের সুবাস',
    tagline: 'উজ্জ্বল, মিষ্টি আর প্রাণবন্ত',
    description: 'রসালো ফলের মিষ্টি নোট — হালকা, সজীব আর মন ভালো করে দেওয়া সুবাস।',
    kind: 'category',
    category: 'fruit',
    order: 3,
  },
  {
    slug: 'fresh',
    title: 'সজীব',
    tagline: 'টক-মিষ্টি সাইট্রাস আর পুদিনার ছোঁয়া',
    description: 'প্রতিদিনের ব্যবহারের জন্য সজীব আতর — পরিচ্ছন্ন, চনমনে আর তরতাজা অনুভব।',
    kind: 'category',
    category: 'new-arrivals',
    order: 4,
  },
  {
    slug: 'arabian',
    title: 'আরবীয়',
    tagline: 'মধ্যপ্রাচ্যের চিরচেনা আভিজাত্য',
    description: 'আরবের পুরোনো সুগন্ধিশিল্পের অনুপ্রেরণায় গাঢ় ও প্রাচ্যধাঁচের রাজকীয় মিশ্রণ।',
    kind: 'category',
    category: 'most-wanted',
    order: 5,
  },
  {
    slug: 'woody',
    title: 'কাঠের সুবাস',
    tagline: 'উষ্ণ চন্দন আর দেবদারু',
    description:
      'মাটির ঘ্রাণ মেশানো চন্দন আর ধোঁয়াটে দেবদারুর গঠন — পরিণত রুচির সুগন্ধিপ্রেমীদের জন্য।',
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
