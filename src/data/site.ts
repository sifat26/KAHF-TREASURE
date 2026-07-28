/**
 * Site-wide configuration and brand constants.
 *
 * Source of truth:
 *   - docs/BUSINESS_REQUIREMENTS.md (brand, contact, trust)
 *   - docs/BRAND_GUIDELINES.md (taglines, mission, vision, values)
 *
 * Contact channels are preserved verbatim from the previous site.
 * Do NOT hardcode business data in components — import from here.
 */

export const site = {
  name: 'KAHF Treasure',
  legalName: 'KAHF Treasure',
  /** BRAND_GUIDELINES.md » Brand Taglines (primary) */
  tagline: 'Luxury in Every Drop',
  taglineAlt: 'The Essence of Elegance',
  type: 'Premium Alcohol-Free Attar & Islamic Lifestyle Brand',
  description:
    'KAHF Treasure is a premium alcohol-free attar brand offering authentic, long-lasting fragrance oils crafted for everyday elegance and special occasions.',
  /** Deployed origin — used for metadataBase, canonical URLs, sitemap. */
  url: 'https://kahf-treasure.vercel.app',
  locale: 'bn_BD',
  currency: 'BDT',
} as const;

/**
 * Contact channels. Phone/WhatsApp/Facebook/email carried over from the
 * existing implementation (Footer, ContactSection, WhatsappFAB).
 */
export const contact = {
  phoneDisplay: '01681253714',
  /** E.164 without '+', for wa.me / tel: links */
  whatsapp: '8801681253714',
  whatsappDisplay: '+880 1681 253714',
  facebook: 'https://www.facebook.com/KAHFTreasure',
  facebookHandle: 'KAHF Treasure',
  email: 'kahftreasure@gmail.com',
  /** [PLACEHOLDER — business to provide] Not defined in source docs. */
  instagram: null as string | null,
  addressLine: null as string | null,
  businessHours: null as string | null,
} as const;

export const waLink = `https://wa.me/${contact.whatsapp}`;
export const telLink = `tel:+${contact.whatsapp}`;
export const mailLink = `mailto:${contact.email}`;

/**
 * Trust signals — BUSINESS_REQUIREMENTS.md » Trust Building Requirements
 * and BRAND_GUIDELINES.md » Trust Elements.
 */
export const trustPoints = [
  {
    icon: 'droplet',
    title: 'Alcohol-Free',
    description: 'Pure, skin-friendly attar oils with no alcohol content.',
  },
  {
    icon: 'sparkles',
    title: 'Premium Imported Oils',
    description: 'Sourced from trusted suppliers for authentic character.',
  },
  {
    icon: 'clock',
    title: 'Long-Lasting',
    description: 'Concentrated oils that stay with you through the day.',
  },
  {
    icon: 'badge-check',
    title: 'Authentic Quality',
    description: 'Every fragrance is checked for consistency and strength.',
  },
  {
    icon: 'truck',
    title: 'Fast Delivery',
    description: 'Quick dispatch across Bangladesh.',
  },
  {
    icon: 'headset',
    title: 'Friendly Support',
    description: 'Real people to help you choose the right scent.',
  },
] as const;

/** Brand story — BRAND_GUIDELINES.md » Vision / Mission / Values */
export const brandStory = {
  vision:
    "To become one of Bangladesh's most trusted premium attar brands by offering authentic, long-lasting, alcohol-free fragrances with a luxurious shopping experience.",
  mission:
    'Deliver premium-quality attars that combine elegance, tradition, and modern luxury while ensuring excellent customer service and affordable pricing.',
  values: [
    'Authenticity',
    'Premium Quality',
    'Trust',
    'Elegance',
    'Simplicity',
    'Long-lasting Fragrance',
    'Customer Satisfaction',
  ],
} as const;

/** Primary navigation. WhatsApp-first D2C model — no cart/checkout routes. */
export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  shop: [
    { label: 'All Fragrances', href: '/shop' },
    { label: 'Most Wanted', href: '/collections/most-wanted' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Oud Collection', href: '/collections/oud' },
    { label: 'Floral Collection', href: '/collections/floral' },
    { label: 'Fruit Collection', href: '/collections/fruit' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  policies: [
    { label: 'Shipping Policy', href: '/policies/shipping' },
    { label: 'Return Policy', href: '/policies/returns' },
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms & Conditions', href: '/policies/terms' },
  ],
} as const;
