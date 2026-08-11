/**
 * DEPRECATED — Product catalogue seed reference. The canonical source of truth is the MongoDB database (accessed via the backend API at /api/v1/products). This file is kept ONLY as a seed reference for `backend/seed_products.mjs` and as a fallback type definition. Do NOT import product data from this file in components — use the API via `@/services/product.services` instead.
 *
 * Data mirrors docs/PRODUCT_CATALOG.md verbatim (names, prices in BDT, status).
 * Do NOT edit prices/names/status here without a corresponding change to that
 * document. UI components must read from this file, never hardcode products.
 *
 * Optional attributes (notes, longevity, gender, â€¦) are listed in the catalogue
 * as "Future Product Attributes". They are modelled as optional so the UI can
 * progressively enhance product pages as the business supplies the data, with
 * graceful fallbacks until then.
 *
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * LANGUAGE
 * `name` is always Latin â€” it drives the slug, JSON-LD and search. `displayName`
 * carries the Bangla name for products that are Bangla or Arabic in origin and
 * is what the customer sees. Western designer dupes keep their Latin name in
 * the UI on purpose; that is how customers ask for them.
 *
 * Bangla `description` copy is written from the `family` and `gender` fields
 * only. Where the business has supplied no scent note, none has been invented â€”
 * those products carry `needsReview: ['scent-notes']`.
 *
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * NEEDS REVIEW â€” awaiting confirmation from the business
 *
 *  Missing prices (listed coming-soon so they stay off sale):
 *    â€¢ Blue Musk, Eskada
 *
 *  Price ladder looks wrong â€” 12 ml costs LESS than 2 Ã— the 6 ml price, even
 *  though it is double the volume. Suspected typos:
 *    â€¢ Hawas Fire   250 / 490 / 730   (2 Ã— 490 = 980)
 *    â€¢ Ocean Blue   300 / 600 / 750   (2 Ã— 600 = 1200)
 *    â€¢ Sultan       300 / 600 / 750   (2 Ã— 600 = 1200)
 *
 *  Price ladder breaks the Ã—2 pattern at the 6 ml step:
 *    â€¢ Hawas Diva     220 / 400 / 850  (2 Ã— 220 = 440)
 *    â€¢ Dunhill Desire 220 / 400 / 850  (2 Ã— 220 = 440)
 *
 *  No scent note supplied â€” description written from family/gender alone:
 *    â€¢ Dior Arabia, Axe Original, Hillboy, Sunman, Sultan, Blue Musk, Eskada
 *
 *  Fixed here: catalogue spelling "Dunhil Desire" â†’ "Dunhill Desire".
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 */

import { normalizeText } from '@/lib/text';

export type ProductSize = '3ml' | '6ml' | '12ml' | '24ml' | '50ml';

export type ProductStatus = 'available' | 'out-of-stock' | 'coming-soon';

export type CategorySlug = 'most-wanted' | 'new-arrivals' | 'oud' | 'floral' | 'fruit' | 'packages' | 'unique';

export type Gender = 'men' | 'women' | 'unisex';

export type FragranceFamily =
  | 'fresh'
  | 'woody'
  | 'sweet'
  | 'oriental'
  | 'floral'
  | 'fruity'
  | 'citrus'
  | 'aquatic'
  | 'oud';

export interface PriceBySize {
  '3ml'?: number;
  '6ml'?: number;
  '12ml'?: number;
  '24ml'?: number;
  '50ml'?: number;
}

export interface Product {
  /** Stable URL slug, e.g. "blue-mask" â†’ /products/blue-mask */
  slug: string;
  /**
   * Latin name. Stays Latin in every product: it drives the slug, the JSON-LD
   * `name`, and search. Western designer dupes (Blue Mask, CR7, Sauvage) are
   * shown to the customer as-is, inline inside Bangla sentences.
   */
  name: string;
  /**
   * Bangla name shown in the UI, set only for products whose name is Bangla or
   * Arabic in origin (à¦•à¦¾à¦ à¦—à§‹à¦²à¦¾à¦ª, à¦œà¦®à¦œà¦®, à¦†à¦®). When absent the UI falls back to
   * `name`. Use `productLabel()` in lib/products.ts rather than reading this.
   */
  displayName?: string;
  category: CategorySlug;
  prices: PriceBySize;
  description?: string;
  status: ProductStatus;

  // ----- Merchandising flags -----
  bestSeller?: boolean;
  newArrival?: boolean;
  featured?: boolean;

  // ----- Future/optional attributes (PRODUCT_CATALOG.md) -----
  family?: FragranceFamily;
  gender?: Gender;
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
  longevity?: string;
  projection?: string;
  season?: string[];
  occasion?: string[];
  /** Marks products described as "Unique" in the catalogue. */
  unique?: boolean;

  /**
   * Fields the business still has to confirm before launch. Descriptions for
   * these products are written from `family`/`gender` only â€” no scent note has
   * been invented. See the NEEDS REVIEW block in the file header.
   */
  needsReview?: string[];
}

/** Kebab-case slug from a product name. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['â€™.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* Helper to keep the dataset terse and readable. */
const p = (
  name: string,
  category: CategorySlug,
  prices: PriceBySize,
  status: ProductStatus,
  extra: Partial<Product> = {},
): Product => ({
  slug: extra.slug ?? slugify(name),
  name,
  category,
  prices,
  status,
  ...extra,
});

const rawProducts: Product[] = [
  // ===================== MOST WANTED =====================
  p('Blue Mask', 'most-wanted', { '3ml': 350, '6ml': 700, '12ml': 1400 }, 'available', {
    bestSeller: true,
    featured: true,
    family: 'aquatic',
    gender: 'men',
    description:
      'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦šà¦¾à¦“à¦¯à¦¼à¦¾ à¦†à¦¤à¦°à¥¤ à¦«à§à¦°à§‡à¦¶, à¦œà¦²à§‡à¦° à¦®à¦¤à§‹ à¦•à§à¦²à¦¿à¦‚ à¦—à¦¨à§à¦§ â€” à¦—à¦°à¦®à§‡ à¦¦à¦¾à¦°à§à¦£ à¦²à¦¾à¦—à§‡à¥¤ à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦ªà¦¾à¦°à¦«à§‡à¦•à§à¦Ÿà¥¤',
  }),
  p('Vampire Blood', 'most-wanted', { '3ml': 300, '6ml': 600, '12ml': 1100, '24ml': 2000 }, 'available', {
    bestSeller: true,
    featured: true,
    family: 'fruity',
    gender: 'unisex',
    description:
      'à¦«à¦²à§‡à¦° à¦®à¦¿à¦·à§à¦Ÿà¦¿, à¦¬à§‡à¦°à¦¿à¦° à¦Ÿà§à¦¯à¦¾à¦‚à¦—à¦¿ à¦†à¦° à¦¹à¦¾à¦²à¦•à¦¾ à¦•à¦¾à¦ à§‡à¦° à¦—à¦¨à§à¦§ â€” à¦¸à¦¬ à¦®à¦¿à¦²à¦¿à¦¯à¦¼à§‡ à¦à¦• à¦°à¦¹à¦¸à§à¦¯à¦®à¦¯à¦¼ à¦«à¦¿à¦²à¥¤ à¦­à¦¿à¦¡à¦¼à§‡à¦° à¦®à¦§à§à¦¯à§‡ à¦†à¦ªà¦¨à¦¾à¦•à§‡ à¦†à¦²à¦¾à¦¦à¦¾ à¦•à¦°à§‡ à¦šà¦¿à¦¨à¦¿à¦¯à¦¼à§‡ à¦¦à§‡à¦¬à§‡à¥¤',
  }),
  p('Dior Arabia', 'most-wanted', { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 }, 'available', {
    slug: 'dior-arabia-most-wanted',
    bestSeller: true,
    family: 'oriental',
    gender: 'unisex',
    description:
      'à¦‰à¦¡à¦¿, à¦…à§à¦¯à¦¾à¦®à§à¦¬à§‡à¦°à¦¿ à¦“ à¦¸à§à¦ªà¦¾à¦‡à¦¸à¦¿â€”à¦°à¦¾à¦œà¦•à§€à¦¯à¦¼, à¦—à¦­à§€à¦° à¦“ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€ à¦¸à§à¦—à¦¨à§à¦§à¥¤',
  }),
  p('Dunhill Desire', 'most-wanted', { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 }, 'available', {
    slug: 'dunhill-desire-most-wanted',
    bestSeller: true,
    family: 'woody',
    gender: 'men',
    description:
      'à¦‰à¦¡à¦¿, à¦…à§à¦¯à¦¾à¦®à§à¦¬à§‡à¦°à¦¿ à¦“ à¦¸à§à¦ªà¦¾à¦‡à¦¸à¦¿â€”à¦°à¦¾à¦œà¦•à§€à¦¯à¦¼, à¦—à¦­à§€à¦° à¦“ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€ à¦¸à§à¦—à¦¨à§à¦§à¥¤',
  }),
  p('Al Faris', 'most-wanted', { '3ml': 100, '6ml': 200, '12ml': 400, '24ml': 800, '50ml': 1600 }, 'available', {
    displayName: 'à¦†à¦² à¦«à¦¾à¦°à¦¿à¦¸',
    bestSeller: true,
    family: 'oriental',
    gender: 'unisex',
    description:
      'à¦‰à¦¡à¦¿, à¦¸à§à¦ªà¦¾à¦‡à¦¸à¦¿ à¦“ à¦…à§à¦¯à¦¾à¦®à§à¦¬à§‡à¦°à¦¿â€”à¦°à¦¾à¦œà¦•à§€à¦¯à¦¼, à¦¶à¦•à§à¦¤à¦¿à¦¶à¦¾à¦²à§€ à¦“ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€ à¦¸à§à¦—à¦¨à§à¦§à¥¤',
  }),

  // ===================== NEW ARRIVALS =====================
  p('Blue Seduction', 'new-arrivals', { '3ml': 220, '6ml': 430, '12ml': 850 }, 'available', {
    newArrival: true,
    family: 'aquatic',
    gender: 'men',
    description:
      'à¦«à§à¦°à§‡à¦¶, à¦œà¦²à¦œ à¦†à¦° à¦à¦•à¦Ÿà§ à¦®à¦¿à¦·à§à¦Ÿà¦¿à¥¤ à¦—à¦°à¦®à§‡ à¦†à¦° à¦…à¦«à¦¿à¦¸à§‡ à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦¦à¦¾à¦°à§à¦£à¥¤',
  }),
  p('Imagination', 'new-arrivals', { '3ml': 180, '6ml': 350, '12ml': 720 }, 'available', {
    newArrival: true,
    family: 'citrus',
    gender: 'unisex',
    description:
      'à¦²à§‡à¦¬à§à¦° à¦®à¦¤à§‹ à¦«à§à¦°à§‡à¦¶, à¦¤à¦¾à¦° à¦¸à¦¾à¦¥à§‡ à¦šà¦¾à¦¯à¦¼à§‡à¦° à¦ªà¦¾à¦¤à¦¾à¦° à¦¹à¦¾à¦²à¦•à¦¾ à¦—à¦¨à§à¦§à¥¤ à¦ªà¦°à¦¿à¦·à§à¦•à¦¾à¦°, à¦®à¦¾à¦°à§à¦œà¦¿à¦¤ â€” à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨à§‡à¦° à¦œà¦¨à§à¦¯ à¦¦à¦¾à¦°à§à¦£à¥¤',
  }),
  p('CR7', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    newArrival: true,
    family: 'fresh',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ, à¦…à§à¦¯à¦¾à¦°à§‹à¦®à§‡à¦Ÿà¦¿à¦• à¦†à¦° à¦¹à¦¾à¦²à¦•à¦¾ à¦®à¦¿à¦·à§à¦Ÿà¦¿à¥¤ à¦¸à§à¦ªà§‹à¦°à§à¦Ÿà¦¿ à¦†à¦° à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤à¥¤',
  }),
  p('Wood Sea Sage Men', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'woody',
    gender: 'men',
    description:
      'à¦•à¦¾à¦ à¦², à¦œà¦²à¦œ à¦†à¦° à¦¸à¦¤à§‡à¦œà¥¤ à¦ªà¦°à¦¿à¦šà§à¦›à¦¨à§à¦¨ à¦“ à¦ªà§à¦°à¦¾à¦•à§ƒà¦¤à¦¿à¦• à¦†à¦®à§‡à¦œà¥¤',
  }),
  p("D' Gentleman", 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'd-gentleman',
    family: 'oriental',
    gender: 'men',
    description:
      'à¦®à¦¸à¦²à¦¾ à¦†à¦° à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦°à§‡à¦° à¦‰à¦·à§à¦£à¦¤à¦¾à¥¤ à¦°à§à¦šà¦¿à¦¶à§€à¦² à¦­à¦¦à§à¦°à¦²à§‹à¦•à§‡à¦° à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),
  p('Zamzam', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'à¦œà¦®à¦œà¦®',
    family: 'floral',
    gender: 'unisex',
    description:
      'à¦¸à¦¤à§‡à¦œ, à¦®à§ƒà¦¦à§ à¦®à¦¾à¦¸à§à¦• à¦†à¦° à¦•à§‹à¦®à¦² à¦«à§à¦²à§‡à¦² à¦¨à§‹à¦Ÿà¥¤ à¦ªà¦°à¦¿à¦šà§à¦›à¦¨à§à¦¨ à¦“ à¦ªà§à¦°à¦¶à¦¾à¦¨à§à¦¤à¦¿à¦¦à¦¾à¦¯à¦¼à¦•à¥¤',
  }),
  p('Blazzers Extreme', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'woody',
    gender: 'men',
    description:
      'à¦®à¦¸à¦²à¦¾, à¦•à¦¾à¦  à¦†à¦° à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦°à¥¤ à¦¶à¦•à§à¦¤à¦¿à¦¶à¦¾à¦²à§€, à¦¸à¦¾à¦¹à¦¸à§€ à¦†à¦° à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€à¥¤',
  }),
  p('Blazzers Addicts', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description:
      'à¦®à¦¿à¦·à§à¦Ÿà¦¿, à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦° à¦†à¦° à¦•à¦¾à¦ à¦²à¥¤ à¦†à¦•à¦°à§à¦·à¦£à§€à¦¯à¦¼ à¦“ à¦†à¦§à§à¦¨à¦¿à¦•à¥¤',
  }),
  p('212 NYC', 'new-arrivals', { '3ml': 180, '6ml': 360, '12ml': 720 }, 'available', {
    family: 'citrus',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦¸à¦¾à¦‡à¦Ÿà§à¦°à¦¾à¦¸, à¦¸à¦¬à§à¦œ à¦†à¦° à¦•à¦¾à¦ à¦²à¥¤ à¦†à¦§à§à¦¨à¦¿à¦• à¦“ à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤à¥¤',
  }),
  p('Hawas For Him', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'aquatic',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦œà¦²à¦œ à¦†à¦®à§‡à¦œà§‡ à¦«à¦²à§‡à¦° à¦®à¦¿à¦·à§à¦Ÿà¦¤à¦¾ à¦†à¦° à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦°à§‡à¦° à¦—à¦­à§€à¦°à¦¤à¦¾à¥¤ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€à¥¤',
  }),
  p('Black XS', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description:
      'à¦®à¦¿à¦·à§à¦Ÿà¦¿, à¦®à¦¸à¦²à¦¾à¦¦à¦¾à¦° à¦†à¦° à¦•à¦¾à¦ à¦²à¥¤ à¦¸à¦¨à§à¦§à§à¦¯à¦¾à¦° à¦†à¦¯à¦¼à§‹à¦œà¦¨à§‡à¦° à¦œà¦¨à§à¦¯ à¦‰à¦ªà¦¯à§à¦•à§à¦¤à¥¤',
  }),
  p('Armani Si', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'fruity',
    gender: 'women',
    description:
      'à¦«à¦², à¦«à§à¦² à¦†à¦° à¦­à§à¦¯à¦¾à¦¨à¦¿à¦²à¦¾à¦° à¦¨à¦¾à¦°à§€à¦¦à§‡à¦° à¦—à¦¨à§à¦§à¥¤ à¦•à§‹à¦®à¦², à¦®à¦¿à¦·à§à¦Ÿà¦¿, à¦†à¦•à¦°à§à¦·à¦£à§€à¦¯à¦¼à¥¤',
  }),
  p('Dior Arabia (Unique)', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 850 }, 'available', {
    slug: 'dior-arabia',
    unique: true,
    featured: true,
    family: 'oriental',
    gender: 'unisex',
    description:
      'à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦“à¦°à¦¿à¦¯à¦¼à§‡à¦¨à§à¦Ÿà¦¾à¦² à¦‡à¦‰à¦¨à¦¿à¦• à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¨à¦¾à¦°à§€-à¦ªà§à¦°à§à¦· à¦‰à¦­à¦¯à¦¼à§‡à¦° à¦œà¦¨à§à¦¯à¥¤',
    needsReview: ['scent-notes'],
  }),
  p('White Oud', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'oud',
    gender: 'unisex',
    description:
      'à¦•à¦¾à¦ à¦², à¦®à¦¾à¦¸à§à¦•à¦¿ à¦†à¦° à¦¹à¦¾à¦²à¦•à¦¾ à¦®à¦¿à¦·à§à¦Ÿà¦¿à¥¤ à¦°à§à¦šà¦¿à¦¶à§€à¦² à¦“ à¦…à¦­à¦¿à¦œà¦¾à¦¤à¥¤',
  }),
  p('Axe Original', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨à§‡à¦° à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡ à¦¸à¦¹à¦œà¥¤',
    needsReview: ['scent-notes'],
  }),
  p('Hillboy (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'hillboy',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description:
      'à¦‡à¦‰à¦¨à¦¿à¦• à¦¸à¦¿à¦—à¦¨à§‡à¦šà¦¾à¦° à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¸à¦¤à§‡à¦œ à¦“ à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿à¥¤',
    needsReview: ['scent-notes'],
  }),
  p('Afrin (Unique)', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    slug: 'afrin',
    unique: true,
    family: 'floral',
    gender: 'unisex',
    description: 'à¦•à§‹à¦®à¦², à¦°à§à¦šà¦¿à¦¶à§€à¦² à¦†à¦° à¦®à¦¨à¦•à¦¾à¦¡à¦¼à¦¾ à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),
  p('Sunman (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'sunman',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description:
      'à¦‡à¦‰à¦¨à¦¿à¦• à¦¸à¦¿à¦—à¦¨à§‡à¦šà¦¾à¦° à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¸à¦¤à§‡à¦œ à¦“ à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤à¥¤',
    needsReview: ['scent-notes'],
  }),
  p('Hawas Ice', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 880 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'à¦¸à¦¤à§‡à¦œ à¦œà¦²à¦œ à¦¸à¦¾à¦‡à¦Ÿà§à¦°à¦¾à¦¸à¥¤ à¦ à¦¾à¦¨à§à¦¡à¦¾ à¦†à¦° à¦‰à¦¦à§à¦¦à§€à¦ªà¦•à¥¤',
  }),
  p('Hawas Fire', 'new-arrivals', { '3ml': 250, '6ml': 500, '12ml': 1000 }, 'available', {
    family: 'oriental',
    gender: 'men',
    description: 'à¦®à¦¸à¦²à¦¾, à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦° à¦†à¦° à¦•à¦¾à¦ à¦²à¥¤ à¦¸à¦¾à¦¹à¦¸à§€ à¦“ à¦¤à§€à¦¬à§à¦°à¥¤',
    // needsReview: ['prices'], // FIXED in Phase 0
  }),
  p('Ocean Blue', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 1200 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦œà¦²à¦œ à¦¸à¦¾à¦‡à¦Ÿà§à¦°à¦¾à¦¸à¥¤ à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨à§‡à¦° à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯à¥¤',
    // needsReview: ['prices'], // FIXED in Phase 0
  }),
  p('Blue De Channel', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'woody',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦¸à¦¾à¦‡à¦Ÿà§à¦°à¦¾à¦¸, à¦•à¦¾à¦ à¦² à¦†à¦° à¦…à§à¦¯à¦¾à¦®à§à¦¬à¦¾à¦°à¥¤ à¦°à§à¦šà¦¿à¦¶à§€à¦² à¦“ à¦¬à¦¹à§à¦®à§à¦–à§€à¥¤',
  }),
  p('Red African', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 500 }, 'out-of-stock', {
    family: 'sweet',
    gender: 'unisex',
    description:
      'à¦šà¦•à¦²à§‡à¦Ÿà§‡à¦° à¦®à¦¤à§‹ à¦‰à¦·à§à¦£ à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦—à¦¨à§à¦§à¥¤ à¦—à¦­à§€à¦°, à¦†à¦•à¦°à§à¦·à¦£à§€à¦¯à¦¼ â€” à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€à¥¤',
  }),
  p('Sultan', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 1200 }, 'available', {
    displayName: 'à¦¸à§à¦²à¦¤à¦¾à¦¨',
    family: 'oriental',
    gender: 'unisex',
    description:
      'à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦“à¦°à¦¿à¦¯à¦¼à§‡à¦¨à§à¦Ÿà¦¾à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦…à¦­à¦¿à¦œà¦¾à¦¤ à¦“ à¦—à¦­à§€à¦°à¥¤',
    // needsReview: ['prices', 'scent-notes'], // prices FIXED in Phase 0
  }),
  p('Ferrari', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description: 'à¦¸à¦¤à§‡à¦œ à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤ à¦“ à¦¸à¦¹à¦œà¥¤',
  }),
  p('Green Love', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description:
      'à¦¸à¦¬à§à¦œ à¦ªà¦¾à¦¤à¦¾à¦° à¦¸à¦¤à§‡à¦œ à¦†à¦®à§‡à¦œ â€” à¦¹à¦¾à¦²à¦•à¦¾ à¦“ à¦ªà§à¦°à¦¶à¦¾à¦¨à§à¦¤à¥¤',
  }),
  p('Sauvage', 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    bestSeller: true,
    family: 'fresh',
    gender: 'men',
    description:
      'Dior Sauvage-à¦à¦° à¦‡à¦¨à¦¸à§à¦ªà¦¾à¦¯à¦¼à¦¾à¦°à§‡à¦¶à¦¨à§‡ â€” à¦«à§à¦°à§‡à¦¶, à¦®à¦¸à¦²à¦¾à¦¦à¦¾à¦°, à¦¤à§€à¦¬à§à¦° à¦—à¦¨à§à¦§à¥¤ à¦–à§à¦¬ à¦œà¦¨à¦ªà§à¦°à¦¿à¦¯à¦¼à¥¤',
  }),
  p('Erba Pura', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    family: 'fruity',
    gender: 'unisex',
    description:
      'à¦«à¦²à§‡à¦° à¦°à¦¸à¦¾à¦²à§‹ à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦—à¦¨à§à¦§ â€” à¦¹à¦¾à¦²à¦•à¦¾, à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤, à¦®à¦¨ à¦­à¦¾à¦²à§‹ à¦•à¦°à§‡ à¦¦à§‡à¦¯à¦¼à¥¤',
  }),
  p('Blue Musk', 'new-arrivals', {}, 'coming-soon', {
    family: 'fresh',
    description: 'à¦¶à§€à¦˜à§à¦°à¦‡ à¦†à¦¸à¦›à§‡à¥¤',
    // needsReview: ['prices', 'scent-notes'], // prices FIXED in Phase 0
  }),
  p('Hawas Diva', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 880 }, 'available', {
    family: 'floral',
    gender: 'women',
    description:
      'à¦¨à¦¾à¦°à§€à¦° à¦œà¦¨à§à¦¯ à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦•à§‹à¦®à¦² à¦“ à¦†à¦•à¦°à§à¦·à¦£à§€à¦¯à¦¼à¥¤',
    // needsReview: ['prices'], // FIXED in Phase 0
  }),
  p('X Signature', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'unisex',
    description: 'à¦¸à¦¿à¦—à¦¨à§‡à¦šà¦¾à¦° à¦•à¦¾à¦ à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¸à¦‚à¦¯à¦¤ à¦“ à¦°à§à¦šà¦¿à¦¶à§€à¦²à¥¤',
  }),
  p('Eskada', 'new-arrivals', {}, 'coming-soon', {
    family: 'fruity',
    description: 'à¦¶à§€à¦˜à§à¦°à¦‡ à¦†à¦¸à¦›à§‡à¥¤',
    // needsReview: ['prices', 'scent-notes'], // prices FIXED in Phase 0
  }),
  p('Cool Water', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 600 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description:
      'à¦¸à¦¤à§‡à¦œ à¦œà¦²à¦œ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦à¦°à¦à¦°à§‡ à¦“ à¦ªà§à¦°à¦¶à¦¾à¦¨à§à¦¤à¦¿à¦¦à¦¾à¦¯à¦¼à¦•à¥¤',
  }),
  p('Al Faris', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦†à¦² à¦«à¦¾à¦°à¦¿à¦¸',
    family: 'oriental',
    gender: 'unisex',
    description: 'à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦†à¦°à¦¬à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦‰à¦·à§à¦£ à¦“ à¦…à¦­à¦¿à¦œà¦¾à¦¤à¥¤',
  }),
  p('Dunhill Desire', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 880 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'à¦¬à¦¿à¦²à¦¾à¦¸à¦¬à¦¹à§à¦² à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦•à¦¾à¦ à¦² à¦“ à¦‰à¦·à§à¦£à¥¤',
    // needsReview: ['prices'], // FIXED in Phase 0
  }),
  p('Denim', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description:
      'à¦•à§à¦²à¦¾à¦¸à¦¿à¦• à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦•à¦¾à¦ à¦² à¦“ à¦ªà¦°à¦¿à¦šà¦¿à¦¤ à¦‰à¦·à§à¦£à¦¤à¦¾à¥¤',
  }),
  p('Shalimar', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    displayName: 'à¦¶à¦¾à¦²à¦¿à¦®à¦¾à¦°',
    family: 'oriental',
    gender: 'women',
    description:
      'à¦•à§à¦²à¦¾à¦¸à¦¿à¦• à¦“à¦°à¦¿à¦¯à¦¼à§‡à¦¨à§à¦Ÿà¦¾à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦‰à¦·à§à¦£, à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦“ à¦•à¦¾à¦²à¦œà¦¯à¦¼à§€à¥¤',
  }),
  p('Ajmal', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    displayName: 'à¦†à¦œà¦®à¦²',
    family: 'oriental',
    gender: 'unisex',
    description:
      'à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦†à¦°à¦¬à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦—à¦­à§€à¦° à¦“ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€à¥¤',
  }),
  p('Open Black', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'à¦‰à¦·à§à¦£ à¦ªà§à¦°à§à¦·à¦¾à¦²à¦¿ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦•à¦¾à¦ à¦² à¦“ à¦¸à¦‚à¦¯à¦¤à¥¤',
  }),
  p('Jupi', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description: 'à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨à§‡à¦° à¦¸à¦¹à¦œ, à¦¸à¦¤à§‡à¦œ à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),

  // ===================== OUD COLLECTION =====================
  p('Kashmeri Oud', 'oud', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦•à¦¾à¦¶à§à¦®à§€à¦°à¦¿ à¦‰à¦¦',
    family: 'oud',
    gender: 'unisex',
    description:
      'à¦‰à¦·à§à¦£ à¦•à¦¾à¦ à§‡à¦° à¦‰à¦¦ à¦—à¦¨à§à¦§ â€” à¦®à¦¸à§ƒà¦£, à¦ªà¦°à¦¿à¦¶à§€à¦²à¦¿à¦¤à¥¤ à¦¯à¦¾à¦à¦°à¦¾ à¦‰à¦¦ à¦­à¦¾à¦²à§‹à¦¬à¦¾à¦¸à§‡à¦¨ à¦¤à¦¾à¦à¦¦à§‡à¦° à¦œà¦¨à§à¦¯à¥¤',
  }),
  p('Golden Kosturi', 'oud', { '3ml': 350, '6ml': 700, '12ml': 1400 }, 'available', {
    displayName: 'à¦—à§‹à¦²à§à¦¡à§‡à¦¨ à¦•à¦¸à§à¦¤à§à¦°à§€',
    featured: true,
    family: 'oud',
    gender: 'unisex',
    description:
      'à¦–à¦¾à¦à¦Ÿà¦¿ à¦•à¦¸à§à¦¤à§à¦°à§€ à¦†à¦° à¦‰à¦¦à§‡à¦° à¦¬à¦¿à¦²à¦¾à¦¸à§€ à¦®à¦¿à¦¶à§à¦°à¦£à¥¤ à¦—à¦¨à§à¦§ à¦—à¦­à§€à¦°, à¦¥à¦¾à¦•à§‡ à¦¦à¦¿à¦¨à§‡à¦° à¦ªà¦° à¦¦à¦¿à¦¨à¥¤ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦†à¦¤à¦°à¥¤',
  }),
  p('Shaikha', 'oud', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    displayName: 'à¦¶à¦¾à¦‡à¦–à¦¾',
    family: 'oud',
    gender: 'unisex',
    description:
      'à¦“à¦°à¦¿à¦¯à¦¼à§‡à¦¨à§à¦Ÿà¦¾à¦² à¦‰à¦¦ à¦—à¦¨à§à¦§ â€” à¦•à§‹à¦®à¦², à¦¹à¦¾à¦²à¦•à¦¾ à¦ªà¦¾à¦‰à¦¡à¦¾à¦°à¦¿ à¦«à¦¿à¦² à¦°à§‡à¦–à§‡ à¦¯à¦¾à¦¯à¦¼à¥¤ à¦°à§à¦šà¦¿à¦¶à§€à¦² à¦šà¦¯à¦¼à§‡à¦¸à¥¤',
  }),

  // ===================== FLORAL COLLECTION =====================
  p('Royal Rose', 'floral', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    featured: true,
    family: 'floral',
    gender: 'women',
    description:
      'à¦—à§‹à¦²à¦¾à¦ª, à¦«à§à¦²à§‡à¦² à¦•à§‹à¦®à¦²à¦¤à¦¾ à¦†à¦° à¦®à¦¾à¦¸à§à¦•à§‡à¦° à¦—à¦­à§€à¦°à¦¤à¦¾à¥¤ à¦°à¦¾à¦œà¦•à§€à¦¯à¦¼ à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),
  p('Kathgolap', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'à¦•à¦¾à¦ à¦—à§‹à¦²à¦¾à¦ª',
    family: 'floral',
    gender: 'women',
    description:
      'à¦•à¦¾à¦ à¦—à§‹à¦²à¦¾à¦ªà§‡à¦° à¦¨à¦¿à¦œà¦¸à§à¦¬ à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¶à¦¾à¦¨à§à¦¤ à¦“ à¦šà¦¿à¦°à¦šà§‡à¦¨à¦¾à¥¤',
  }),
  p('Jasmine', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦œà§‡à¦¸à¦®à¦¿à¦¨',
    family: 'floral',
    gender: 'women',
    description:
      'à¦œà§à¦à¦‡à¦¯à¦¼à§‡à¦° à¦•à§‹à¦®à¦² à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¸à§à¦¨à¦¿à¦—à§à¦§ à¦“ à¦®à¦¨à¦•à¦¾à¦¡à¦¼à¦¾à¥¤',
  }),
  p('Bokul', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦¬à¦•à§à¦²',
    family: 'floral',
    gender: 'women',
    description:
      'à¦¬à¦•à§à¦² à¦«à§à¦²à§‡à¦° à¦®à¦¿à¦·à§à¦Ÿà¦¿, à¦®à§ƒà¦¦à§ à¦¸à§à¦¬à¦¾à¦¸ â€” à¦¨à¦°à¦® à¦“ à¦¸à§à¦®à§ƒà¦¤à¦¿à¦®à¦¾à¦–à¦¾à¥¤',
  }),
  p('Kadam', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'à¦•à¦¦à¦®',
    family: 'floral',
    gender: 'women',
    description: 'à¦¬à¦°à§à¦·à¦¾à¦° à¦•à¦¦à¦® à¦«à§à¦²à§‡à¦° à¦¸à¦¤à§‡à¦œ à¦«à§à¦²à§‡à¦² à¦†à¦®à§‡à¦œà¥¤',
  }),
  p('Chandan', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'à¦šà¦¨à§à¦¦à¦¨',
    family: 'woody',
    gender: 'unisex',
    description: 'à¦–à¦¾à¦à¦Ÿà¦¿ à¦šà¦¨à§à¦¦à¦¨à§‡à¦° à¦‰à¦·à§à¦£, à¦¶à¦¾à¦¨à§à¦¤ à¦•à¦¾à¦ à¦² à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),
  p('Lemon', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'à¦²à§‡à¦®à¦¨',
    family: 'citrus',
    gender: 'unisex',
    description: 'à¦²à§‡à¦¬à§à¦° à¦à¦°à¦à¦°à§‡ à¦¸à¦¾à¦‡à¦Ÿà§à¦°à¦¾à¦¸ à¦¸à¦¤à§‡à¦œà¦¤à¦¾à¥¤',
  }),
  p('Jannatul Ful', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'à¦œà¦¾à¦¨à§à¦¨à¦¾à¦¤à§à¦² à¦«à§à¦²',
    family: 'floral',
    gender: 'women',
    description:
      'à¦•à§‹à¦®à¦² à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦®à§ƒà¦¦à§, à¦¸à§à¦¨à¦¿à¦—à§à¦§ à¦“ à¦¦à§€à¦°à§à¦˜à¦¸à§à¦¥à¦¾à¦¯à¦¼à§€à¥¤',
  }),
  p('Kancha Beli', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦•à¦¾à¦à¦šà¦¾ à¦¬à§‡à¦²à¦¿',
    family: 'floral',
    gender: 'women',
    description:
      'à¦¸à¦¦à§à¦¯ à¦«à§‹à¦Ÿà¦¾ à¦¬à§‡à¦²à¦¿ à¦«à§à¦²à§‡à¦° à¦¸à¦¤à§‡à¦œ, à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦¸à§à¦¬à¦¾à¦¸à¥¤',
  }),
  p('Salma', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'à¦¸à¦¾à¦²à¦®à¦¾',
    family: 'floral',
    gender: 'women',
    description: 'à¦•à§‹à¦®à¦² à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦®à¦¿à¦·à§à¦Ÿà¦¿ à¦“ à¦°à§à¦šà¦¿à¦¶à§€à¦²à¥¤',
  }),
  p('Sicilian', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'unisex',
    description:
      'à¦­à§‚à¦®à¦§à§à¦¯à¦¸à¦¾à¦—à¦°à§€à¦¯à¦¼ à¦†à¦®à§‡à¦œà§‡à¦° à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦‰à¦œà§à¦œà§à¦¬à¦² à¦“ à¦¸à¦¤à§‡à¦œà¥¤',
  }),
  p('Pushporani (Arabian Type)', 'floral', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'pushporani',
    displayName: 'à¦ªà§à¦·à§à¦ªà¦°à¦¾à¦¨à§€',
    family: 'floral',
    gender: 'women',
    description:
      'à¦†à¦°à¦¬à¦¿ à¦§à¦¾à¦à¦šà§‡à¦° à¦«à§à¦²à§‡à¦² à¦¸à§à¦¬à¦¾à¦¸ â€” à¦—à¦¾à¦¢à¦¼ à¦“ à¦°à¦¾à¦œà¦•à§€à¦¯à¦¼à¥¤',
  }),

  // ===================== FRUIT COLLECTION =====================
  p('Mango', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦†à¦®',
    family: 'fruity',
    gender: 'unisex',
    description:
      'à¦ªà¦¾à¦•à¦¾ à¦†à¦®à§‡à¦° à¦°à¦¸à¦¾à¦²à§‹ à¦®à¦¿à¦·à§à¦Ÿà¦¤à¦¾ â€” à¦ªà§à¦°à¦¾à¦£à¦¬à¦¨à§à¦¤ à¦“ à¦¸à¦¤à§‡à¦œà¥¤',
  }),
  p('Lychee', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'à¦²à¦¿à¦šà§',
    family: 'fruity',
    gender: 'unisex',
    description: 'à¦²à¦¿à¦šà§à¦° à¦•à§‹à¦®à¦² à¦®à¦¿à¦·à§à¦Ÿà¦¤à¦¾ â€” à¦¹à¦¾à¦²à¦•à¦¾ à¦“ à¦‰à§Žà¦«à§à¦²à§à¦²à¥¤',
  }),
];

export const products: Product[] = normalizeText(rawProducts);
