export const site = {
  name: 'KAHF Treasure',
  tagline: 'Luxury in Every Drop',
  description:
    'KAHF Treasure is a premium alcohol-free attar brand offering authentic, long-lasting fragrance oils crafted for everyday elegance and special occasions.',
  url: 'https://kahftreasure.com',
  ogImage: '/images/hero-perfume-bottle.png',
  locale: 'en_US',
} as const;

export const contact = {
  phone: '+880 1681 253714',
  phoneDisplay: '+880 1681-253714',
  whatsapp: '8801681253714',
  whatsappDisplay: '+880 1681-253714',
  facebookHandle: 'KAHF Treasure',
  email: 'info@kahftreasure.com',
  address: 'Dhaka, Bangladesh',
  addressLine: 'Dhaka, Bangladesh',
  businessHours: '10:00 AM - 10:00 PM',
  facebook: 'https://facebook.com/kahftreasure',
  instagram: 'https://instagram.com/kahftreasure',
} as const;

export const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  'Hello KAHF Treasure! I would like to enquire about your luxury attars.',
)}`;

export const mailLink = `mailto:${contact.email}`;
export const telLink = `tel:${contact.phone.replace(/\s+/g, '')}`;

/** Primary navigation links. */
export const mainNav = [
  { label: 'HOME', href: '/' },
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections', hasDropdown: true },
  { label: 'ABOUT', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'CONTACT', href: '/contact' },
] as const;

/** Footer navigation links structured for Footer.tsx */
export const footerNav = {
  shop: [
    { label: 'Most Wanted', href: '/collections/most-wanted' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'All Attars', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Packages & Bundles', href: '/#bundles' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Why Choose Us', href: '/#why-choose-us' },
    { label: 'Frequently Asked Questions', href: '/faq' },
    { label: 'Contact Us', href: '/#contact' },
  ],
  policies: [
    { label: 'Shipping & Delivery', href: '/faq#shipping' },
    { label: 'Authenticity Guarantee', href: '/about#guarantee' },
    { label: 'WhatsApp Order', href: waLink, external: true },
  ],
} as const;

export const brandStory = {
  mission: 'To bring back the royal tradition of pure, alcohol-free attar making with authentic imported perfume oils.',
  vision: 'To be Bangladesh’s most trusted luxury Islamic lifestyle and fragrance brand.',
  values: [
    'Pure & Alcohol-Free',
    'Long-Lasting Projection',
    'Imported Perfume Oils',
    'Authentic Quality Guaranteed',
    'Fast Delivery in Bangladesh',
  ],
} as const;

export const trustPoints = [
  {
    icon: 'ShieldCheck',
    title: '100% Pure & Alcohol-Free',
    description: 'All our attars are formulated without alcohol, providing pure, long-lasting fragrance.',
  },
  {
    icon: 'Sparkles',
    title: 'Imported Perfume Oils',
    description: 'We source high-grade perfume oils to ensure rich projection and authentic notes.',
  },
  {
    icon: 'Clock',
    title: 'Long-Lasting Projection',
    description: 'Concentrated oil formulations that remain on your skin and clothes for hours.',
  },
  {
    icon: 'Truck',
    title: 'Fast Delivery across BD',
    description: 'Reliable Cash on Delivery and quick shipping to all districts in Bangladesh.',
  },
] as const;
