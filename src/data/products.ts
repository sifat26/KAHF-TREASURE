export interface PriceEntry {
  volume: string;
  price: string;
}

export interface FeaturedProduct {
  name: string;
  description: string;
  prices: PriceEntry[];
}

export interface TableProduct {
  name: string;
  prices: { volume: string; price: string }[];
  description?: string;
  stockout?: boolean;
  isBengali?: boolean;
  subtext?: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    name: 'Vampire Blood',
    description:
      'ফ্রুটি, বেরি, মিষ্টি ও হালকা উডি নোটের এক বোল্ড ও রহস্যময় সুগন্ধ। এর আকর্ষণীয় ঘ্রাণ আপনাকে ভিড়ের মধ্যেও সহজেই আলাদা পরিচয় এনে দেবে।',
    prices: [
      { volume: '3ML', price: '300/-' },
      { volume: '6ML', price: '600/-' },
      { volume: '12ML', price: '1100/-' },
      { volume: '24ML', price: '2000/-' },
    ],
  },
  {
    name: 'Dior Arabia',
    description: 'উডি, অ্যাম্বারি ও স্পাইসি — রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
    prices: [
      { volume: '3ML', price: '200/-' },
      { volume: '6ML', price: '400/-' },
      { volume: '12ML', price: '750/-' },
      { volume: '24ML', price: '1300/-' },
    ],
  },
  {
    name: 'Dunhil Desire',
    description: 'উডি, অ্যাম্বারি ও স্পাইসি — রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
    prices: [
      { volume: '3ML', price: '200/-' },
      { volume: '6ML', price: '400/-' },
      { volume: '12ML', price: '750/-' },
      { volume: '24ML', price: '1300/-' },
    ],
  },
  {
    name: 'Al Fares',
    description: 'উডি, স্পাইসি ও অ্যাম্বারি — রাজকীয়, শক্তিশালী ও দীর্ঘস্থায়ী সুগন্ধ।',
    prices: [
      { volume: '3ML', price: '100/-' },
      { volume: '6ML', price: '200/-' },
      { volume: '12ML', price: '400/-' },
      { volume: '24ML', price: '800/-' },
      { volume: '50ML', price: '1600/-' },
    ],
  },
];

export const newArrivals: TableProduct[] = [
  { name: 'Blue Seduction', prices: [{ volume: '3ML', price: '220/-' }, { volume: '6ML', price: '430/-' }, { volume: '12ML', price: '850/-' }], description: 'ফ্রেশ, অ্যাকুয়াটিক ও হালকা মিষ্টি টাইপের সুগন্ধ। গরম আবহাওয়া, অফিস ও দৈনন্দিন ব্যবহারের জন্য খুব উপযুক্ত।' },
  { name: 'Imagination', prices: [{ volume: '3ML', price: '180/-' }, { volume: '6ML', price: '350/-' }, { volume: '12ML', price: '720/-' }], description: 'ফ্রেশ, সাইট্রাস ও টি-ভিত্তিক — পরিষ্কার, এলিগ্যান্ট, দৈনন্দিন ব্যবহারের জন্য দারুণ।' },
  { name: 'CR7', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], description: 'ফ্রেশ, অ্যারোম্যাটিক ও হালকা মিষ্টি — স্পোর্টি, এনার্জেটিক, দৈনন্দিন ব্যবহারের জন্য ভালো।' },
  { name: 'Wood Sea Sage Men', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], description: 'উডি, অ্যাকুয়াটিক ও ফ্রেশ — পরিষ্কার, ন্যাচারাল, মার্জিত সুগন্ধ।' },
  { name: "D'Gentleman", prices: [{ volume: '3ML', price: '130/-' }, { volume: '6ML', price: '260/-' }, { volume: '12ML', price: '500/-' }], description: 'স্পাইসি ও অ্যাম্বারি — এলিগ্যান্ট, আত্মবিশ্বাসী ও জেন্টলম্যানসুলভ সুগন্ধ।' },
  { name: 'Zamzam', prices: [{ volume: '3ML', price: '140/-' }, { volume: '6ML', price: '280/-' }, { volume: '12ML', price: '560/-' }], description: 'ফ্রেশ, মস্কি ও হালকা ফ্লোরাল — প্রশান্তিদায়ক, পরিচ্ছন্ন ও মার্জিত সুগন্ধ।' },
  { name: 'Blazzers Extreme', prices: [{ volume: '3ML', price: '140/-' }, { volume: '6ML', price: '280/-' }, { volume: '12ML', price: '560/-' }], description: 'স্পাইসি, উডি ও অ্যাম্বারি — বোল্ড, শক্তিশালী ও দীর্ঘস্থায়ী সুগন্ধ।' },
  { name: 'Blazzers Addicts', prices: [{ volume: '3ML', price: '140/-' }, { volume: '6ML', price: '280/-' }, { volume: '12ML', price: '560/-' }], description: 'মিষ্টি, অ্যাম্বারি ও উডি — আকর্ষণীয়, আধুনিক।' },
  { name: '212 NYC', prices: [{ volume: '3ML', price: '180/-' }, { volume: '6ML', price: '360/-' }, { volume: '12ML', price: '720/-' }], description: 'ফ্রেশ, সাইট্রাস, গ্রিন ও উডি — আধুনিক, প্রাণবন্ত ও দৈনন্দিন ব্যবহারের জন্য উপযুক্ত সুগন্ধ।' },
  { name: 'Hawas For Him', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }], description: 'ফ্রেশ, অ্যাকুয়াটিক, ফ্রুটি ও অ্যাম্বারি — আকর্ষণীয়, এনার্জেটিক ও দীর্ঘস্থায়ী সুগন্ধ।' },
  { name: 'Black XS', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }], description: 'মিষ্টি, স্পাইসি ও উডি — বোল্ড, সেডাক্টিভ ও রাতের ব্যবহারের জন্য উপযুক্ত সুগন্ধ।' },
  { name: 'Armani Si', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }], description: 'ফ্রুটি, ফ্লোরাল ও ভ্যানিলা' },
  { name: 'White Oud', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }], description: 'উডি, মস্কি ও হালকা মিষ্টি — পরিচ্ছন্ন, মার্জিত ও দীর্ঘস্থায়ী সুগন্ধ।' },
  { name: 'Axe', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], description: '—' },
  { name: 'Hillboy', prices: [{ volume: '3ML', price: '110/-' }, { volume: '6ML', price: '220/-' }, { volume: '12ML', price: '440/-' }], description: '—' },
  { name: 'Afrin', prices: [{ volume: '3ML', price: '120/-' }, { volume: '6ML', price: '240/-' }, { volume: '12ML', price: '480/-' }], description: 'সফট, মার্জিত ও মনোমুগ্ধকর সুগন্ধ।' },
  { name: 'Sunman', prices: [{ volume: '3ML', price: '110/-' }, { volume: '6ML', price: '220/-' }, { volume: '12ML', price: '440/-' }], description: '—' },
  { name: 'Hawas Ice', prices: [{ volume: '3ML', price: '220/-' }, { volume: '6ML', price: '440/-' }, { volume: '12ML', price: '880/-' }], description: 'ফ্রেশ, অ্যাকুয়াটিক ও সাইট্রাস — শীতল, প্রাণবন্ত ও আধুনিক সুগন্ধ।' },
  { name: 'Hawas Fire', prices: [{ volume: '3ML', price: '250/-' }, { volume: '6ML', price: '490/-' }, { volume: '12ML', price: '730/-' }], description: 'স্পাইসি, অ্যাম্বারি ও উডি — বোল্ড, শক্তিশালী ও আকর্ষণীয় সুগন্ধ।' },
  { name: 'Ocean Blue', prices: [{ volume: '3ML', price: '300/-' }, { volume: '6ML', price: '600/-' }, { volume: '12ML', price: '750/-' }], description: 'ফ্রেশ, অ্যাকুয়াটিক ও সাইট্রাস — শীতল, প্রাণবন্ত ও দৈনন্দিন ব্যবহারের জন্য উপযুক্ত সুগন্ধ।' },
  { name: 'Blue De Channel', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }], description: 'ফ্রেশ, সাইট্রাস, উডি ও অ্যাম্বারি — এলিগ্যান্ট, আত্মবিশ্বাসী ও সব উপলক্ষের জন্য উপযুক্ত সুগন্ধ।' },
  { name: 'Red African', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '500/-' }], description: 'চকোলেটি, উষ্ণ, আকর্ষণীয় ও দীর্ঘস্থায়ী সুগন্ধ।', stockout: true },
];

export const previousCollection: TableProduct[] = [
  { name: 'Sultan', prices: [{ volume: '3ML', price: '300/-' }, { volume: '6ML', price: '600/-' }, { volume: '12ML', price: '750/-' }] },
  { name: 'Ferrari', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }] },
  { name: 'Jesmin', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }] },
  { name: 'Kashmeri Oud', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }] },
  { name: 'Denim', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }] },
  { name: 'Shalimar', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }] },
  { name: 'Oud Al Layl', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }], stockout: true },
  { name: 'Green Bakhoor', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '500/-' }], stockout: true },
  { name: 'Shaikha', prices: [{ volume: '3ML', price: '110/-' }, { volume: '6ML', price: '220/-' }, { volume: '12ML', price: '440/-' }] },
];

export const flowerCollection: TableProduct[] = [
  { name: 'Royal Rose', prices: [{ volume: '3ML', price: '200/-' }, { volume: '6ML', price: '400/-' }, { volume: '12ML', price: '800/-' }] },
  { name: 'কাঁঠগোলাপ', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], isBengali: true },
  { name: 'জেসমিন', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }], isBengali: true },
  { name: 'বকুল', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }], isBengali: true },
  { name: 'কদম', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], isBengali: true },
  { name: 'চন্দন', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], isBengali: true },
  { name: 'লেমন', prices: [{ volume: '3ML', price: '140/-' }, { volume: '6ML', price: '280/-' }, { volume: '12ML', price: '560/-' }], isBengali: true },
  { name: 'জান্নাতুল ফুল', prices: [{ volume: '3ML', price: '140/-' }, { volume: '6ML', price: '280/-' }, { volume: '12ML', price: '560/-' }], isBengali: true },
  { name: 'কাঁচা বেলি', prices: [{ volume: '3ML', price: '100/-' }, { volume: '6ML', price: '200/-' }, { volume: '12ML', price: '400/-' }], isBengali: true },
  { name: 'সালমা', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], isBengali: true },
  { name: 'সিসিলিয়ান', prices: [{ volume: '3ML', price: '150/-' }, { volume: '6ML', price: '300/-' }, { volume: '12ML', price: '570/-' }], isBengali: true },
  { name: 'পুষ্পরাণী', prices: [{ volume: '3ML', price: '130/-' }, { volume: '6ML', price: '260/-' }, { volume: '12ML', price: '500/-' }], isBengali: true, subtext: '(অ্যারাবিয়ান টাইপ)' },
];
