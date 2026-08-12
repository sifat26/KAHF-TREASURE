export const site = {
  /** Kept Latin: it is the registered brand name and the wordmark. */
  name: 'KAHF Treasure',
  tagline: 'খাঁটি সুবাসে আপনার পরিচয়',
  description:
    'KAHF Treasure — বিদেশ থেকে আনা খাঁটি পারফিউম অয়েল দিয়ে তৈরি অ্যালকোহল-মুক্ত আতর। কোনো রাসায়নিক নেই, কোনো প্রতারণা নেই — শুধু খাঁটি সুবাস, দীর্ঘস্থায়ী গন্ধ।',
  url: 'https://kahf-treasure.vercel.app',
  ogImage: '/images/hero-banner.png',
  locale: 'bn_BD',
} as const;

export const contact = {
  phone: '+880 1681 253714',
  phoneDisplay: '+880 1681-253714',
  whatsapp: '8801681253714',
  whatsappDisplay: '+880 1681-253714',
  facebookHandle: 'KAHF Treasure',
  email: 'info@kahftreasure.com',
  address: 'ঢাকা, বাংলাদেশ',
  addressLine: 'ঢাকা, বাংলাদেশ',
  businessHours: 'সকাল ১০টা – রাত ১০টা',
  facebook: 'https://facebook.com/kahftreasure',
  instagram: 'https://instagram.com/kahftreasure',
} as const;

export const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  'আসসালামু আলাইকুম, ভাই। আতরের ব্যাপারে জানতে চাই।',
)}`;

export const mailLink = `mailto:${contact.email}`;
export const telLink = `tel:${contact.phone.replace(/\s+/g, '')}`;

/** Primary navigation links. */
export const mainNav = [
  { label: 'হোম', href: '/' },
  { label: 'শপ', href: '/shop' },
  { label: 'কালেকশন', href: '/collections', hasDropdown: true },
  { label: 'আমাদের কথা', href: '/about' },
  { label: 'জিজ্ঞাসা', href: '/faq' },
  { label: 'যোগাযোগ', href: '/contact' },
] as const;

/** Footer navigation links structured for Footer.tsx */
export const footerNav = {
  shop: [
    { label: 'সব আতর', href: '/shop' },
    { label: 'কালেকশন', href: '/collections' },
    { label: 'ব্লগ', href: '/blog' },
  ],
  company: [
    { label: 'আমাদের গল্প', href: '/about' },
    { label: 'সাধারণ জিজ্ঞাসা', href: '/faq' },
  ],
  policies: [
    { label: 'WhatsApp-এ অর্ডার', href: waLink, external: true },
    { label: 'অর্ডার ট্র্যাক করুন', href: '/track-order' },
  ],
} as const;

export const brandStory = {
  mission:
    'বিদেশের সেরা পারফিউম অয়েল এনে অ্যালকোহল-মুক্ত আতর বানানো — এই পুরোনো ঐতিহ্যকে আবার ফিরিয়ে আনা। আমরা চাই, বাংলাদেশের মানুষ যেন চিনে জানে খাঁটি আতরের গন্ধ কেমন।',
  vision: 'বাংলাদেশের মানুষের কাছে সবচেয়ে বিশ্বস্ত আর নির্ভরযোগ্য আতরের নাম হওয়া — এটাই আমাদের স্বপ্ন।',
  values: [
    '১০০% অ্যালকোহল-মুক্ত আর খাঁটি',
    'গন্ধ থাকে ঘণ্টার পর ঘণ্টা',
    'বিদেশ থেকে আনা পারফিউম অয়েল',
    'আসল পণ্য — নয় নকল',
    'সারা দেশে দ্রুত ডেলিভারি',
  ],
} as const;

export const trustPoints = [
  {
    icon: 'ShieldCheck',
    title: '১০০% খাঁটি আর অ্যালকোহল-মুক্ত',
    description: 'আমাদের আতরে এক ফোঁটাও অ্যালকোহল নেই। ত্বকে নরম লাগে, আর গন্ধ যেন সারাদিন সঙ্গে থাকে।',
  },
  {
    icon: 'Sparkles',
    title: 'বিদেশ থেকে আনা পারফিউম অয়েল',
    description: 'দুবাই, সৌদি আরব থেকে আনা উঁচু মানের অয়েল দিয়ে বানানো — তাই গন্ধ যেমন গাঢ়, তেমনি আসল।',
  },
  {
    icon: 'Clock',
    title: 'গন্ধ থাকে ঘণ্টার পর ঘণ্টা',
    description: 'ঘন অয়েল-এর ফর্মুলা — ত্বকে লাগিয়ে রাখলে ৮-১২ ঘণ্টাও গন্ধ ধরে রাখে। কাপড়ে তো দিনের পর দিন।',
  },
  {
    icon: 'Truck',
    title: 'সারা দেশে দ্রুত পৌঁছে দিই',
    description: 'ঢাকা থেকে সিলেট, চট্টগ্রাম, রাজশাহী — সব জেলায় ডেলিভারি। ক্যাশ অন ডেলিভারিও আছে।',
  },
] as const;
