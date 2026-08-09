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
 *
 * ───────────────────────────────────────────────────────────────────────────
 * LANGUAGE
 * `name` is always Latin — it drives the slug, JSON-LD and search. `displayName`
 * carries the Bangla name for products that are Bangla or Arabic in origin and
 * is what the customer sees. Western designer dupes keep their Latin name in
 * the UI on purpose; that is how customers ask for them.
 *
 * Bangla `description` copy is written from the `family` and `gender` fields
 * only. Where the business has supplied no scent note, none has been invented —
 * those products carry `needsReview: ['scent-notes']`.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * NEEDS REVIEW — awaiting confirmation from the business
 *
 *  Missing prices (listed coming-soon so they stay off sale):
 *    • Blue Musk, Eskada
 *
 *  Price ladder looks wrong — 12 ml costs LESS than 2 × the 6 ml price, even
 *  though it is double the volume. Suspected typos:
 *    • Hawas Fire   250 / 490 / 730   (2 × 490 = 980)
 *    • Ocean Blue   300 / 600 / 750   (2 × 600 = 1200)
 *    • Sultan       300 / 600 / 750   (2 × 600 = 1200)
 *
 *  Price ladder breaks the ×2 pattern at the 6 ml step:
 *    • Hawas Diva     220 / 400 / 850  (2 × 220 = 440)
 *    • Dunhill Desire 220 / 400 / 850  (2 × 220 = 440)
 *
 *  No scent note supplied — description written from family/gender alone:
 *    • Dior Arabia, Axe Original, Hillboy, Sunman, Sultan, Blue Musk, Eskada
 *
 *  Fixed here: catalogue spelling "Dunhil Desire" → "Dunhill Desire".
 * ───────────────────────────────────────────────────────────────────────────
 */

export type ProductSize = '3ml' | '6ml' | '12ml' | '24ml' | '50ml';

export type ProductStatus = 'available' | 'out-of-stock' | 'coming-soon';

export type CategorySlug =
  | 'most-wanted'
  | 'new-arrivals'
  | 'oud'
  | 'floral'
  | 'fruit'
  | 'packages'
  | 'unique';

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
  /** Stable URL slug, e.g. "blue-mask" → /products/blue-mask */
  slug: string;
  /**
   * Latin name. Stays Latin in every product: it drives the slug, the JSON-LD
   * `name`, and search. Western designer dupes (Blue Mask, CR7, Sauvage) are
   * shown to the customer as-is, inline inside Bangla sentences.
   */
  name: string;
  /**
   * Bangla name shown in the UI, set only for products whose name is Bangla or
   * Arabic in origin (কাঠগোলাপ, জমজম, আম). When absent the UI falls back to
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
   * these products are written from `family`/`gender` only — no scent note has
   * been invented. See the NEEDS REVIEW block in the file header.
   */
  needsReview?: string[];
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
        'আমাদের সবচেয়ে চাওয়া আতর। ফ্রেশ, জলের মতো কুলিং গন্ধ — গরমে দারুণ লাগে। প্রতিদিন ব্যবহারের জন্য পারফেক্ট।',
    },
  ),
  p(
    'Vampire Blood',
    'most-wanted',
    { '3ml': 300, '6ml': 600, '12ml': 1100, '24ml': 2000 },
    'available',
    {
      bestSeller: true,
      featured: true,
      family: 'fruity',
      gender: 'unisex',
      description:
        'ফলের মিষ্টি, বেরির ট্যাংগি আর হালকা কাঠের গন্ধ — সব মিলিয়ে এক রহস্যময় ফিল। ভিড়ের মধ্যে আপনাকে আলাদা করে চিনিয়ে দেবে।',
    },
  ),
  p(
    'Dior Arabia',
    'most-wanted',
    { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 },
    'available',
    {
      slug: 'dior-arabia-most-wanted',
      bestSeller: true,
      family: 'oriental',
      gender: 'unisex',
      description:
        'উডি, অ্যাম্বেরি ও স্পাইসি—রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
    },
  ),
  p(
    'Dunhill Desire',
    'most-wanted',
    { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 },
    'available',
    {
      slug: 'dunhill-desire-most-wanted',
      bestSeller: true,
      family: 'woody',
      gender: 'men',
      description:
        'উডি, অ্যাম্বেরি ও স্পাইসি—রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
    },
  ),
  p(
    'Al Faris',
    'most-wanted',
    { '3ml': 100, '6ml': 200, '12ml': 400, '24ml': 800, '50ml': 1600 },
    'available',
    {
      displayName: 'আল ফারিস',
      bestSeller: true,
      family: 'oriental',
      gender: 'unisex',
      description:
        'উডি, স্পাইসি ও অ্যাম্বেরি—রাজকীয়, শক্তিশালী ও দীর্ঘস্থায়ী সুগন্ধ।',
    },
  ),

  // ===================== NEW ARRIVALS =====================
  p('Blue Seduction', 'new-arrivals', { '3ml': 220, '6ml': 430, '12ml': 850 }, 'available', {
    newArrival: true,
    family: 'aquatic',
    gender: 'men',
    description: 'ফ্রেশ, জলজ আর একটু মিষ্টি। গরমে আর অফিসে প্রতিদিন ব্যবহারের জন্য দারুণ।',
  }),
  p('Imagination', 'new-arrivals', { '3ml': 180, '6ml': 350, '12ml': 720 }, 'available', {
    newArrival: true,
    family: 'citrus',
    gender: 'unisex',
    description: 'লেবুর মতো ফ্রেশ, তার সাথে চায়ের পাতার হালকা গন্ধ। পরিষ্কার, মার্জিত — প্রতিদিনের জন্য দারুণ।',
  }),
  p('CR7', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    newArrival: true,
    family: 'fresh',
    gender: 'men',
    description: 'সতেজ, অ্যারোমেটিক আর হালকা মিষ্টি। স্পোর্টি আর প্রাণবন্ত।',
  }),
  p('Wood Sea Sage Men', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'কাঠল, জলজ আর সতেজ। পরিচ্ছন্ন ও প্রাকৃতিক আমেজ।',
  }),
  p("D' Gentleman", 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'd-gentleman',
    family: 'oriental',
    gender: 'men',
    description: 'মসলা আর অ্যাম্বারের উষ্ণতা। রুচিশীল ভদ্রলোকের সুবাস।',
  }),
  p('Zamzam', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'জমজম',
    family: 'floral',
    gender: 'unisex',
    description: 'সতেজ, মৃদু মাস্ক আর কোমল ফুলেল নোট। পরিচ্ছন্ন ও প্রশান্তিদায়ক।',
  }),
  p('Blazzers Extreme', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'মসলা, কাঠ আর অ্যাম্বার। শক্তিশালী, সাহসী আর দীর্ঘস্থায়ী।',
  }),
  p('Blazzers Addicts', 'new-arrivals', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description: 'মিষ্টি, অ্যাম্বার আর কাঠল। আকর্ষণীয় ও আধুনিক।',
  }),
  p('212 NYC', 'new-arrivals', { '3ml': 180, '6ml': 360, '12ml': 720 }, 'available', {
    family: 'citrus',
    gender: 'men',
    description: 'সতেজ সাইট্রাস, সবুজ আর কাঠল। আধুনিক ও প্রাণবন্ত।',
  }),
  p('Hawas For Him', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'aquatic',
    gender: 'men',
    description: 'সতেজ জলজ আমেজে ফলের মিষ্টতা আর অ্যাম্বারের গভীরতা। দীর্ঘস্থায়ী।',
  }),
  p('Black XS', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'sweet',
    gender: 'men',
    description: 'মিষ্টি, মসলাদার আর কাঠল। সন্ধ্যার আয়োজনের জন্য উপযুক্ত।',
  }),
  p('Armani Si', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'fruity',
    gender: 'women',
    description: 'ফল, ফুল আর ভ্যানিলার নারীদের গন্ধ। কোমল, মিষ্টি, আকর্ষণীয়।',
  }),
  p('Dior Arabia (Unique)', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 850 }, 'available', {
    slug: 'dior-arabia',
    unique: true,
    featured: true,
    family: 'oriental',
    gender: 'unisex',
    description: 'প্রিমিয়াম ওরিয়েন্টাল ইউনিক সুবাস — নারী-পুরুষ উভয়ের জন্য।',
    needsReview: ['scent-notes'],
  }),
  p('White Oud', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    family: 'oud',
    gender: 'unisex',
    description: 'কাঠল, মাস্কি আর হালকা মিষ্টি। রুচিশীল ও অভিজাত।',
  }),
  p('Axe Original', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description: 'সতেজ পুরুষালি সুবাস — প্রতিদিনের ব্যবহারে সহজ।',
    needsReview: ['scent-notes'],
  }),
  p('Hillboy (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'hillboy',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description: 'ইউনিক সিগনেচার সুবাস — সতেজ ও পুরুষালি।',
    needsReview: ['scent-notes'],
  }),
  p('Afrin (Unique)', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    slug: 'afrin',
    unique: true,
    family: 'floral',
    gender: 'unisex',
    description: 'কোমল, রুচিশীল আর মনকাড়া ফুলেল সুবাস।',
  }),
  p('Sunman (Unique)', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    slug: 'sunman',
    unique: true,
    family: 'fresh',
    gender: 'men',
    description: 'ইউনিক সিগনেচার সুবাস — সতেজ ও প্রাণবন্ত।',
    needsReview: ['scent-notes'],
  }),
  p('Hawas Ice', 'new-arrivals', { '3ml': 220, '6ml': 440, '12ml': 880 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'সতেজ জলজ সাইট্রাস। ঠান্ডা আর উদ্দীপক।',
  }),
  p('Hawas Fire', 'new-arrivals', { '3ml': 250, '6ml': 490, '12ml': 730 }, 'available', {
    family: 'oriental',
    gender: 'men',
    description: 'মসলা, অ্যাম্বার আর কাঠল। সাহসী ও তীব্র।',
    needsReview: ['prices'],
  }),
  p('Ocean Blue', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 750 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'সতেজ জলজ সাইট্রাস। প্রতিদিনের ব্যবহারের জন্য।',
    needsReview: ['prices'],
  }),
  p('Blue De Channel', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    bestSeller: true,
    family: 'woody',
    gender: 'men',
    description: 'সতেজ সাইট্রাস, কাঠল আর অ্যাম্বার। রুচিশীল ও বহুমুখী।',
  }),
  p('Red African', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 500 }, 'out-of-stock', {
    family: 'sweet',
    gender: 'unisex',
    description: 'চকলেটের মতো উষ্ণ মিষ্টি গন্ধ। গভীর, আকর্ষণীয় — দীর্ঘস্থায়ী।',
  }),
  p('Sultan', 'new-arrivals', { '3ml': 300, '6ml': 600, '12ml': 750 }, 'available', {
    displayName: 'সুলতান',
    family: 'oriental',
    gender: 'unisex',
    description: 'প্রিমিয়াম ওরিয়েন্টাল সুবাস — অভিজাত ও গভীর।',
    needsReview: ['prices', 'scent-notes'],
  }),
  p('Ferrari', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'men',
    description: 'সতেজ পুরুষালি সুবাস — প্রাণবন্ত ও সহজ।',
  }),
  p('Green Love', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description: 'সবুজ পাতার সতেজ আমেজ — হালকা ও প্রশান্ত।',
  }),
  p('Sauvage', 'new-arrivals', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    bestSeller: true,
    family: 'fresh',
    gender: 'men',
    description: 'Dior Sauvage-এর ইনস্পায়ারেশনে — ফ্রেশ, মসলাদার, তীব্র গন্ধ। খুব জনপ্রিয়।',
  }),
  p('Erba Pura', 'new-arrivals', { '3ml': 120, '6ml': 240, '12ml': 480 }, 'available', {
    family: 'fruity',
    gender: 'unisex',
    description: 'ফলের রসালো মিষ্টি গন্ধ — হালকা, প্রাণবন্ত, মন ভালো করে দেয়।',
  }),
  p('Blue Musk', 'new-arrivals', {}, 'coming-soon', {
    family: 'fresh',
    description: 'শীঘ্রই আসছে।',
    needsReview: ['prices', 'scent-notes'],
  }),
  p('Hawas Diva', 'new-arrivals', { '3ml': 220, '6ml': 400, '12ml': 850 }, 'available', {
    family: 'floral',
    gender: 'women',
    description: 'নারীর জন্য প্রিমিয়াম ফুলেল সুবাস — কোমল ও আকর্ষণীয়।',
    needsReview: ['prices'],
  }),
  p('X Signature', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'unisex',
    description: 'সিগনেচার কাঠল সুবাস — সংযত ও রুচিশীল।',
  }),
  p('Eskada', 'new-arrivals', {}, 'coming-soon', {
    family: 'fruity',
    description: 'শীঘ্রই আসছে।',
    needsReview: ['prices', 'scent-notes'],
  }),
  p('Cool Water', 'new-arrivals', { '3ml': 150, '6ml': 300, '12ml': 600 }, 'available', {
    family: 'aquatic',
    gender: 'men',
    description: 'সতেজ জলজ সুবাস — ঝরঝরে ও প্রশান্তিদায়ক।',
  }),
  p('Al Faris', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'আল ফারিস',
    family: 'oriental',
    gender: 'unisex',
    description: 'প্রিমিয়াম আরবি সুবাস — উষ্ণ ও অভিজাত।',
  }),
  p('Dunhill Desire', 'new-arrivals', { '3ml': 220, '6ml': 400, '12ml': 850 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'বিলাসবহুল পুরুষালি সুবাস — কাঠল ও উষ্ণ।',
    needsReview: ['prices'],
  }),
  p('Denim', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'ক্লাসিক পুরুষালি সুবাস — কাঠল ও পরিচিত উষ্ণতা।',
  }),
  p('Shalimar', 'new-arrivals', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    displayName: 'শালিমার',
    family: 'oriental',
    gender: 'women',
    description: 'ক্লাসিক ওরিয়েন্টাল সুবাস — উষ্ণ, মিষ্টি ও কালজয়ী।',
  }),
  p('Ajmal', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    displayName: 'আজমল',
    family: 'oriental',
    gender: 'unisex',
    description: 'প্রিমিয়াম আরবি সুবাস — গভীর ও দীর্ঘস্থায়ী।',
  }),
  p('Open Black', 'new-arrivals', { '3ml': 110, '6ml': 220, '12ml': 400 }, 'available', {
    family: 'woody',
    gender: 'men',
    description: 'উষ্ণ পুরুষালি সুবাস — কাঠল ও সংযত।',
  }),
  p('Jupi', 'new-arrivals', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    family: 'fresh',
    gender: 'unisex',
    description: 'প্রতিদিনের সহজ, সতেজ সুবাস।',
  }),

  // ===================== OUD COLLECTION =====================
  p('Kashmeri Oud', 'oud', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'কাশ্মীরি উদ',
    family: 'oud',
    gender: 'unisex',
    description: 'উষ্ণ কাঠের উদ গন্ধ — মসৃণ, পরিশীলিত। যাঁরা উদ ভালোবাসেন তাঁদের জন্য।',
  }),
  p('Golden Kosturi', 'oud', { '3ml': 350, '6ml': 700, '12ml': 1400 }, 'available', {
    displayName: 'গোল্ডেন কস্তুরী',
    featured: true,
    family: 'oud',
    gender: 'unisex',
    description: 'খাঁটি কস্তুরী আর উদের বিলাসী মিশ্রণ। গন্ধ গভীর, থাকে দিনের পর দিন। আমাদের সবচেয়ে প্রিমিয়াম আতর।',
  }),
  p('Shaikha', 'oud', { '3ml': 110, '6ml': 220, '12ml': 440 }, 'available', {
    displayName: 'শাইখা',
    family: 'oud',
    gender: 'unisex',
    description: 'ওরিয়েন্টাল উদ গন্ধ — কোমল, হালকা পাউডারি ফিল রেখে যায়। রুচিশীল চয়েস।',
  }),

  // ===================== FLORAL COLLECTION =====================
  p('Royal Rose', 'floral', { '3ml': 200, '6ml': 400, '12ml': 800 }, 'available', {
    featured: true,
    family: 'floral',
    gender: 'women',
    description: 'গোলাপ, ফুলেল কোমলতা আর মাস্কের গভীরতা। রাজকীয় সুবাস।',
  }),
  p('Kathgolap', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'কাঠগোলাপ',
    family: 'floral',
    gender: 'women',
    description: 'কাঠগোলাপের নিজস্ব মিষ্টি ফুলেল সুবাস — শান্ত ও চিরচেনা।',
  }),
  p('Jasmine', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'জেসমিন',
    family: 'floral',
    gender: 'women',
    description: 'জুঁইয়ের কোমল ফুলেল সুবাস — স্নিগ্ধ ও মনকাড়া।',
  }),
  p('Bokul', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'বকুল',
    family: 'floral',
    gender: 'women',
    description: 'বকুল ফুলের মিষ্টি, মৃদু সুবাস — নরম ও স্মৃতিমাখা।',
  }),
  p('Kadam', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'কদম',
    family: 'floral',
    gender: 'women',
    description: 'বর্ষার কদম ফুলের সতেজ ফুলেল আমেজ।',
  }),
  p('Chandan', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'চন্দন',
    family: 'woody',
    gender: 'unisex',
    description: 'খাঁটি চন্দনের উষ্ণ, শান্ত কাঠল সুবাস।',
  }),
  p('Lemon', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'লেমন',
    family: 'citrus',
    gender: 'unisex',
    description: 'লেবুর ঝরঝরে সাইট্রাস সতেজতা।',
  }),
  p('Jannatul Ful', 'floral', { '3ml': 140, '6ml': 280, '12ml': 560 }, 'available', {
    displayName: 'জান্নাতুল ফুল',
    family: 'floral',
    gender: 'women',
    description: 'কোমল ফুলেল সুবাস — মৃদু, স্নিগ্ধ ও দীর্ঘস্থায়ী।',
  }),
  p('Kancha Beli', 'floral', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'কাঁচা বেলি',
    family: 'floral',
    gender: 'women',
    description: 'সদ্য ফোটা বেলি ফুলের সতেজ, মিষ্টি সুবাস।',
  }),
  p('Salma', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    displayName: 'সালমা',
    family: 'floral',
    gender: 'women',
    description: 'কোমল ফুলেল সুবাস — মিষ্টি ও রুচিশীল।',
  }),
  p('Sicilian', 'floral', { '3ml': 150, '6ml': 300, '12ml': 570 }, 'available', {
    family: 'floral',
    gender: 'unisex',
    description: 'ভূমধ্যসাগরীয় আমেজের ফুলেল সুবাস — উজ্জ্বল ও সতেজ।',
  }),
  p('Pushporani (Arabian Type)', 'floral', { '3ml': 130, '6ml': 260, '12ml': 500 }, 'available', {
    slug: 'pushporani',
    displayName: 'পুষ্পরানী',
    family: 'floral',
    gender: 'women',
    description: 'আরবি ধাঁচের ফুলেল সুবাস — গাঢ় ও রাজকীয়।',
  }),

  // ===================== FRUIT COLLECTION =====================
  p('Mango', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'আম',
    family: 'fruity',
    gender: 'unisex',
    description: 'পাকা আমের রসালো মিষ্টতা — প্রাণবন্ত ও সতেজ।',
  }),
  p('Lychee', 'fruit', { '3ml': 100, '6ml': 200, '12ml': 400 }, 'available', {
    displayName: 'লিচু',
    family: 'fruity',
    gender: 'unisex',
    description: 'লিচুর কোমল মিষ্টতা — হালকা ও উৎফুল্ল।',
  }),
];
