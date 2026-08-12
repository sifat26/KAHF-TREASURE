import type { PriceBySize, Product, ProductSize } from '@/data/products';

/** All sizes in display order. */
export const SIZE_ORDER: ProductSize[] = ['3ml', '6ml', '12ml', '24ml', '50ml'];

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Rewrite ASCII digits as Bangla digits. Applied to every number the customer
 * reads — prices, sizes, counts, ratings — so the page never mixes ৩৫০ with 350.
 *
 * Deliberately NOT applied to: URLs, slugs, JSON-LD, `datetime`/`value`
 * attributes, or anything a machine parses.
 */
export function toBanglaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/**
 * Format a BDT amount for display, e.g. 1400 → "৳১,৪০০".
 *
 * Grouping uses the en-US 3-digit convention rather than the Indic 2-2-3
 * lakh/crore grouping: attar prices top out in the low thousands, where the two
 * agree, and BD e-commerce overwhelmingly writes ১,৪০০ rather than ১,৪০০.
 */
export function formatPrice(amount: number): string {
  const num = typeof amount === 'number' && !Number.isNaN(amount) ? amount : 0;
  return `৳${toBanglaDigits(num.toLocaleString('en-US'))}`;
}

/** Human-readable size label, e.g. "3ml" → "৩ মিলি". */
export function formatSize(size: ProductSize): string {
  return `${toBanglaDigits(size.replace('ml', ''))} মিলি`;
}

/** The lowest available price across sizes, for "থেকে শুরু ৳X" displays. */
export function startingPrice(prices: PriceBySize): number | null {
  const values = SIZE_ORDER.map((s) => prices[s]).filter(
    (v): v is number => typeof v === 'number',
  );
  return values.length ? Math.min(...values) : null;
}

/** Sizes that actually have a price, in order. */
export function availableSizes(product: Product): ProductSize[] {
  return SIZE_ORDER.filter((s) => typeof product.prices[s] === 'number');
}

/** Whether a product can currently be ordered. */
export function isOrderable(product: Product): boolean {
  return product.status === 'available' && availableSizes(product).length > 0;
}

const STATUS_LABEL: Record<Product['status'], string> = {
  available: 'স্টকে আছে',
  'out-of-stock': 'স্টক শেষ',
  'coming-soon': 'শীঘ্রই আসছে',
};

export function statusLabel(status: Product['status']): string {
  return STATUS_LABEL[status];
}

/** Bangla label for a fragrance family, used by filters and product pages. */
const FAMILY_LABEL: Record<NonNullable<Product['family']>, string> = {
  fresh: 'সজীব',
  woody: 'কাঠের',
  sweet: 'মিষ্টি',
  oriental: 'প্রাচ্য',
  floral: 'ফুলেল',
  fruity: 'ফলের',
  citrus: 'সাইট্রাস',
  aquatic: 'জলজ',
  oud: 'উদ',
};

export function familyLabel(family: NonNullable<Product['family']>): string {
  return FAMILY_LABEL[family];
}

/** Bangla label for the intended wearer. */
const GENDER_LABEL: Record<NonNullable<Product['gender']>, string> = {
  men: 'পুরুষ',
  women: 'নারী',
  unisex: 'সবার জন্য',
};

export function genderLabel(gender: NonNullable<Product['gender']>): string {
  return GENDER_LABEL[gender];
}
