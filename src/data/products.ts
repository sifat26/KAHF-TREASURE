/**
 * Product catalogue — typed source of truth for the storefront.
 *
 * Data mirrors docs/PRODUCT_CATALOG.md verbatim (names, prices in BDT, status).
 * Do NOT edit prices/names/status here without a corresponding change to that
 * document. UI components must read from this file, never hardcode products.
 *
 * Optional attributes (notes, longevity, gender, …) are listed in the catalogue
 * as "Future Product Attributes". They are modelled as optional so the UI can
 * progressively enhance product pages as the business supplies the data, with
 * graceful fallbacks until then.
 */

export type ProductSize = '3ml' | '6ml' | '12ml';

export type ProductStatus = 'available' | 'out-of-stock' | 'coming-soon';

export type CategorySlug =
  | 'most-wanted'
  | 'new-arrivals'
  | 'oud'
  | 'floral'
  | 'fruit'
  | 'packages';

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
}

export interface Product {
  /** Stable URL slug, e.g. "blue-mask" → /products/blue-mask */
  slug: string;
  name: string;
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
}

/** Kebab-case slug from a product name. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’.]/g, '')
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

export const products: Product[] = [
  // ===================== MOST WANTED =====================
  p(
    'Blue Mask',
    'most-wanted',
    { '3ml': 350, '6ml': 700, '12ml': 1400 },
    'available',
    {
      bestSeller: true,
      featured: true,
      family: 'aquatic',
      gender: 'men',
      description:
        'A signature fresh-aquatic blend — crisp, confident and effortless for daily wear.',
    },
  ),

  // ===================== NEW ARRIVALS =====================
  p('Blue Seduction', 'new-arrivals', { '3ml': 220, '6ml': 430, '12ml': 850 }, 'available', {
    newArrival: true,
    family: 'aquatic',
    gender: 'men',
    description: 'Fresh, aquatic and lightly sweet. Excellent for hot weather, office and daily wear.',
  }),
  p('Imagination', 'new-arrivals', { '3ml': 180, '6ml': 350, '12ml': 720 }, 'available', {
    newArrival: true,
    family: 'citrus',
    gender: 'unisex',
    description: 'Fresh citrus with tea notes. Clean, elegant and perfect for everyday use.',
  }),
  p('CR7', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    newArrival: true,
    family: 'fresh',
    gender: 'men',
    description: 'Fresh, aromatic and lightly sweet. Sporty and energetic.',
  }),
  p('Wood Sea Sage Men', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'Woody, aquatic and fresh. Clean and natural.',
  }),
  p("D' Gentleman", 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'd-gentleman',
    family: 'oriental',
    gender: 'men',
    description: 'Spicy and amber. Elegant gentleman fragrance.',
  }),
  p('Zamzam', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'floral',
    gender: 'unisex',
    description: 'Fresh, musky with soft floral notes. Clean and relaxing.',
  }),
  p('Blazzers Extreme', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'Spicy, woody and amber. Strong, bold and long lasting.',
  }),
  p('Blazzers Addicts', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description: 'Sweet, amber and woody. Attractive and modern.',
  }),
  p('212 NYC', 'new-arrivals', { '3ml': 180, '6ml': 360, '12ml': 720 }, 'available', {
    family: 'citrus',
    gender: 'men',
    description: 'Fresh citrus, green and woody. Modern and vibrant.',
  }),
  p('Hawas For Him', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'aquatic',
    gender: 'men',
    description: 'Fresh aquatic fruity amber fragrance. Long lasting.',
  }),
  p('Black XS', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description: 'Sweet, spicy and woody. Perfect for evening wear.',
  }),
  p('Armani Si', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'fruity',
    gender: 'women',
    description: 'Fruity, floral and vanilla.',
  }),
  p('Dior Arabia (Unique)', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 850 }, 'available', {
    slug: 'dior-arabia',
    unique: true,
    featured: true,
    family: 'oriental',
    gender: 'unisex',
    description: 'Premium unique fragrance.',
  }),
  p('White Oud', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'oud',
    gender: 'unisex',
    description: 'Woody, musky and lightly sweet. Elegant.',
  }),
  p('Axe Original', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description: 'Fresh masculine fragrance.',
  }),
  p('Hillboy (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'hillboy',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description: 'Unique signature fragrance.',
  }),
  p('Afrin (Unique)', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    slug: 'afrin',
    unique: true,
    family: 'floral',
    gender: 'unisex',
    description: 'Soft, elegant and charming.',
  }),
  p('Sunman (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'sunman',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description: 'Unique signature fragrance.',
  }),
  p('Hawas Ice', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 880 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'Fresh aquatic citrus. Cool and energetic.',
  }),
  p('Hawas Fire', 'new-arrivals', { '3ml': 250, '6ml': 490, '12ml': 730 }, 'available', {
    family: 'oriental',
    gender: 'men',
    description: 'Spicy, amber and woody. Bold fragrance.',
  }),
  p('Ocean Blue', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 750 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'Fresh aquatic citrus. Daily wear.',
  }),
  p('Blue De Channel', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'woody',
    gender: 'men',
    description: 'Fresh citrus, woody and amber. Elegant and versatile.',
  }),
  p('Red African', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 500 }, 'out-of-stock', {
    family: 'sweet',
    gender: 'unisex',
    description: 'Chocolate, warm and long lasting.',
  }),
  p('Sultan', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 750 }, 'available', {
    family: 'oriental',
    gender: 'unisex',
    description: 'Premium fragrance.',
  }),
  p('Ferrari', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description: 'Fresh masculine fragrance.',
  }),
  p('Green Love', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description: 'Fresh green fragrance.',
  }),
  p('Sauvage', 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    bestSeller: true,
    family: 'fresh',
    gender: 'men',
    description: 'Inspired by Dior Sauvage.',
  }),
  p('Erba Pura', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    family: 'fruity',
    gender: 'unisex',
    description: 'Fruity luxury fragrance.',
  }),
  p('Blue Musk', 'new-arrivals', {}, 'coming-soon', {
    family: 'fresh',
    description: 'Coming soon.',
  }),
  p('Hawas Diva', 'new-arrivals', { '3ml': 220, '6ml': 400, '12ml': 850 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Premium feminine fragrance.',
  }),
  p('X Signature', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'unisex',
    description: 'Signature fragrance.',
  }),
  p('Eskada', 'new-arrivals', {}, 'coming-soon', {
    family: 'fruity',
    description: 'Coming soon.',
  }),
  p('Cool Water', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 600 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'Fresh aquatic fragrance.',
  }),
  p('Al Faris', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'oriental',
    gender: 'unisex',
    description: 'Premium Arabic fragrance.',
  }),
  p('Dunhil Desire', 'new-arrivals', { '3ml': 220, '6ml': 400, '12ml': 850 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'Luxury masculine fragrance.',
  }),
  p('Denim', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'Classic masculine fragrance.',
  }),
  p('Shalimar', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'oriental',
    gender: 'women',
    description: 'Classic oriental fragrance.',
  }),
  p('Ajmal', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    family: 'oriental',
    gender: 'unisex',
    description: 'Premium Arabic fragrance.',
  }),
  p('Open Black', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'Warm masculine fragrance.',
  }),
  p('Jupi', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description: 'Everyday fragrance.',
  }),

  // ===================== OUD COLLECTION =====================
  p('Kashmeri Oud', 'oud', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'oud',
    gender: 'unisex',
    description: 'Warm, woody oud with a smooth, refined character.',
  }),
  p('Golden Kosturi', 'oud', { '3ml': 350, '6ml': 700, '12ml': 1400 }, 'available', {
    featured: true,
    family: 'oud',
    gender: 'unisex',
    description: 'A rich, luxurious musk-oud blend — deep and long lasting.',
  }),
  p('Shaikha', 'oud', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    family: 'oud',
    gender: 'unisex',
    description: 'Elegant oriental oud with a soft, powdery finish.',
  }),

  // ===================== FLORAL COLLECTION =====================
  p('Royal Rose', 'floral', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    featured: true,
    family: 'floral',
    gender: 'women',
    description: 'Rose, floral and musky. Royal fragrance.',
  }),
  p('Kathgolap', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Jasmine', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Bokul', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Kadam', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Chandan', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'woody',
    gender: 'unisex',
    description: 'Sandalwood fragrance.',
  }),
  p('Lemon', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'citrus',
    gender: 'unisex',
    description: 'Fresh citrus fragrance.',
  }),
  p('Jannatul Ful', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Kancha Beli', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Salma', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'Floral fragrance.',
  }),
  p('Sicilian', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'unisex',
    description: 'Floral fragrance.',
  }),
  p('Pushporani (Arabian Type)', 'floral', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'pushporani',
    family: 'floral',
    gender: 'women',
    description: 'Arabian floral fragrance.',
  }),

  // ===================== FRUIT COLLECTION =====================
  p('Mango', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fruity',
    gender: 'unisex',
    description: 'Juicy, sweet mango — playful and fresh.',
  }),
  p('Lychee', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fruity',
    gender: 'unisex',
    description: 'Soft, sweet lychee — light and cheerful.',
  }),
];
