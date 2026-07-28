import { products, type FragranceFamily, type Gender, type Product } from '@/data/products';
import { availableSizes, startingPrice } from './format';

/** Look up a single product by slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getBestSellers(limit?: number): Product[] {
  const list = products.filter((p) => p.bestSeller);
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function getNewArrivals(limit?: number): Product[] {
  const list = products.filter(
    (p) => p.newArrival || p.category === 'new-arrivals',
  );
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function getFeatured(limit?: number): Product[] {
  const list = products.filter((p) => p.featured);
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

/**
 * Related products: same fragrance family first, then same category,
 * excluding the current product. Falls back to same category only.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  const scored = others
    .map((p) => {
      let score = 0;
      if (product.family && p.family === product.family) score += 2;
      if (p.category === product.category) score += 1;
      if (p.status === 'available') score += 0.5;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.p);
}

// ---------------------------------------------------------------------------
// Filtering & sorting for the Shop page
// ---------------------------------------------------------------------------

export type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name';

export interface ProductFilters {
  query?: string;
  categories?: string[];
  genders?: Gender[];
  families?: FragranceFamily[];
  /** Only include products with a starting price ≤ this value. */
  maxPrice?: number;
  /** Hide products that cannot be ordered right now. */
  inStockOnly?: boolean;
  sort?: SortKey;
}

export function filterAndSortProducts(
  all: Product[],
  filters: ProductFilters,
): Product[] {
  const { query, categories, genders, families, maxPrice, inStockOnly, sort } = filters;

  let list = all.filter((p) => {
    if (inStockOnly && p.status !== 'available') return false;
    if (categories?.length && !categories.includes(p.category)) return false;
    if (genders?.length && (!p.gender || !genders.includes(p.gender))) return false;
    if (families?.length && (!p.family || !families.includes(p.family))) return false;
    if (typeof maxPrice === 'number') {
      const from = startingPrice(p.prices);
      if (from === null || from > maxPrice) return false;
    }
    if (query) {
      const q = query.trim().toLowerCase();
      const haystack = `${p.name} ${p.description ?? ''} ${p.family ?? ''} ${p.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  list = sortProducts(list, sort ?? 'featured');
  return list;
}

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort(
        (a, b) => (startingPrice(a.prices) ?? Infinity) - (startingPrice(b.prices) ?? Infinity),
      );
    case 'price-desc':
      return copy.sort(
        (a, b) => (startingPrice(b.prices) ?? -Infinity) - (startingPrice(a.prices) ?? -Infinity),
      );
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return copy.sort(
        (a, b) => Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival)),
      );
    case 'featured':
    default:
      return copy.sort((a, b) => rank(b) - rank(a));
  }
}

/** Merchandising rank used for the default "featured" sort. */
function rank(p: Product): number {
  let r = 0;
  if (p.featured) r += 4;
  if (p.bestSeller) r += 3;
  if (p.newArrival) r += 1;
  if (p.status === 'available') r += 0.5;
  return r;
}

/** The max starting price across the catalogue — used to bound the price slider. */
export function priceCeiling(): number {
  return products.reduce((max, p) => {
    const from = startingPrice(p.prices);
    return from && from > max ? from : max;
  }, 0);
}

/** Distinct fragrance families present in the catalogue, for filter UIs. */
export function usedFamilies(): FragranceFamily[] {
  return Array.from(
    new Set(products.map((p) => p.family).filter((f): f is FragranceFamily => Boolean(f))),
  ).sort();
}

/** Sizes/availability helpers re-exported for convenience. */
export { availableSizes };
