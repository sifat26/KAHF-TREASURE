import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import config from '../config';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { slugify } from '../utils/slugify';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

async function seed() {
  await mongoose.connect(config.mongodb_uri);
  console.log('Connected to MongoDB Atlas for seeding...');

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // 1. Create super admin
  const adminPassword = await bcrypt.hash('admin123', config.bcrypt_salt_rounds);
  const admin = await User.create({
    name: 'Super Admin',
    email: 'admin@kahftreasure.com',
    password: adminPassword,
    role: 'super_admin',
    phone: '+8801681253714',
  });

  // 2. Create test customer
  const customerPassword = await bcrypt.hash('customer123', config.bcrypt_salt_rounds);
  await User.create({
    name: 'Test Customer',
    email: 'customer@test.com',
    password: customerPassword,
    role: 'customer',
    phone: '+8801712345678',
  });

  // 3. Create Categories matching Attar Plan
  const attarCat = await Category.create({
    name: 'আতর (Attar)',
    slug: 'attar',
    type: 'attar',
    description: 'খাঁটি অ্যালকোহল-মুক্ত আতর কালেকশন',
    order: 1,
  });

  const oudCat = await Category.create({
    name: 'উদ কালেকশন (Oud)',
    slug: 'oud',
    type: 'attar',
    parentId: attarCat._id,
    description: 'রাজকীয় ও গভীর উদের সুবাস',
    order: 2,
  });

  const floralCat = await Category.create({
    name: 'ফুলের রাজ্য (Floral)',
    slug: 'floral',
    type: 'attar',
    parentId: attarCat._id,
    description: 'প্রাকৃতিক ফুলের মিষ্টতা',
    order: 3,
  });

  const fruityCat = await Category.create({
    name: 'ফলের রাজ্য (Fruity)',
    slug: 'fruity',
    type: 'attar',
    parentId: attarCat._id,
    description: 'রসময় ও সতেজ ফলের সুবাস',
    order: 4,
  });

  const bookCat = await Category.create({
    name: 'বই (Books)',
    slug: 'books',
    type: 'book',
    description: 'ইসলামিক ও লাইফস্টাইল বই',
    order: 5,
  });

  const clothCat = await Category.create({
    name: 'পোশাক (Clothing)',
    slug: 'clothing',
    type: 'clothing',
    description: 'মার্জিত পোশাক ও টুপি',
    order: 6,
  });

  console.log('Created 6 categories');

  // Helper to construct variants
  const makeVariants = (prices: Partial<Record<string, number>>) => {
    return Object.entries(prices)
      .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
      .map(([label, priceOverride]) => ({
      label,
      stock: 40,
      priceOverride,
      }));
  };

  // Full Attar list from chatgpt document
  const rawAttars = [
    // --- Most Wanted ---
    {
      title: 'Vampire Blood',
      description: 'ফ্রুটি, বেরি, মিষ্টি ও হালকা উডি নোটের এক বোল্ড ও রহস্যময় সুগন্ধ। এর আকর্ষণীয় ঘ্রাণ আপনাকে ভিড়ের মধ্যেও সহজেই আলাদা পরিচয় এনে দেবে।',
      category: attarCat._id,
      basePrice: 300,
      prices: { '3ml': 300, '6ml': 600, '12ml': 1100, '24ml': 2000 },
      tags: ['bestseller', 'fruity', 'sweet', 'unisex'],
      isFeatured: true,
      attributes: { family: 'fruity', gender: 'unisex', longevity: '10-14 hours' },
    },
    {
      title: 'Dior Arabia',
      description: 'উডি, অ্যাম্বারি ও স্পাইসি—রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 },
      tags: ['bestseller', 'woody', 'spicy', 'amber'],
      isFeatured: true,
      attributes: { family: 'oriental', gender: 'men', longevity: '12-16 hours' },
    },
    {
      title: 'Dunhill Desire',
      description: 'উডি, অ্যাম্বারি ও স্পাইসি—রাজকীয়, গভীর ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 750, '24ml': 1300 },
      tags: ['bestseller', 'woody', 'amber', 'men'],
      isFeatured: true,
      attributes: { family: 'woody', gender: 'men', longevity: '10-14 hours' },
    },
    {
      title: 'Al Faris',
      description: 'উডি, স্পাইসি ও অ্যাম্বারি—রাজকীয়, শক্তিশালী ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400, '24ml': 800, '50ml': 1600 },
      tags: ['bestseller', 'woody', 'spicy', 'oriental'],
      isFeatured: true,
      newArrival: true,
      attributes: { family: 'oriental', gender: 'unisex', longevity: '10-14 hours' },
    },
    {
      title: 'Blue Mask',
      description: 'সিগনেচার অ্যাকুয়াটিক ও ফ্রেশ ব্লেন্ড — দৈনন্দিন ব্যবহারের জন্য মার্জিত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 350,
      prices: { '3ml': 350, '6ml': 700, '12ml': 1400 },
      tags: ['bestseller', 'fresh', 'aquatic', 'men'],
      isFeatured: true,
      attributes: { family: 'aquatic', gender: 'men', longevity: '8-12 hours' },
    },

    // --- New Arrivals & Main Collection ---
    {
      title: 'Blue Seduction',
      description: 'ফ্রেশ, অ্যাকুয়াটিক ও হালকা মিষ্টি টাইপের সুগন্ধ। গরম আবহাওয়া, অফিস ও দৈনন্দিন ব্যবহারের জন্য খুব উপযুক্ত।',
      category: attarCat._id,
      basePrice: 220,
      prices: { '3ml': 220, '6ml': 430, '12ml': 850 },
      tags: ['fresh', 'aquatic', 'sweet'],
      newArrival: true,
      attributes: { family: 'aquatic', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Imagination',
      description: 'ফ্রেশ, সাইট্রাস ও টি-ভিত্তিক-পরিষ্কার, এলিগ্যান্ট, দৈনন্দিন ব্যবহারের জন্য দারুণ।',
      category: attarCat._id,
      basePrice: 180,
      prices: { '3ml': 180, '6ml': 350, '12ml': 720 },
      tags: ['fresh', 'citrus', 'tea'],
      newArrival: true,
      attributes: { family: 'fresh', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'CR7',
      description: 'ফ্রেশ, অ্যারোম্যাটিক ও হালকা মিষ্টি—স্পোর্টি, এনার্জেটিক, দৈনন্দিন ব্যবহারের জন্য ভালো।',
      category: attarCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 570 },
      tags: ['fresh', 'aromatic', 'men'],
      newArrival: true,
      attributes: { family: 'fresh', gender: 'men', longevity: '6-8 hours' },
    },
    {
      title: 'Wood Sea Sage Men',
      description: 'উডি, অ্যাকুয়াটিক ও ফ্রেশ—পরিষ্কার, ন্যাচারাল, মার্জিত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 570 },
      tags: ['woody', 'aquatic', 'fresh', 'men'],
      newArrival: true,
      attributes: { family: 'woody', gender: 'men', longevity: '8-10 hours' },
    },
    {
      title: "D' Gentleman",
      description: 'স্পাইসি ও অ্যাম্বারি-এলিগ্যান্ট, আত্মবিশ্বাসী ও জেন্টলম্যানসুলভ সুগন্ধ।',
      category: attarCat._id,
      basePrice: 130,
      prices: { '3ml': 130, '6ml': 260, '12ml': 500 },
      tags: ['spicy', 'amber', 'men'],
      attributes: { family: 'spicy', gender: 'men', longevity: '8-10 hours' },
    },
    {
      title: 'Zamzam',
      description: 'ফ্রেশ, মস্কি ও হালকা ফ্লোরাল-প্রশান্তিদায়ক, পরিচ্ছন্ন ও মার্জিত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 140,
      prices: { '3ml': 140, '6ml': 280, '12ml': 560 },
      tags: ['fresh', 'musk', 'floral'],
      attributes: { family: 'fresh', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Blazzers Extreme',
      description: 'স্পাইসি, উডি ও অ্যাম্বারি-বোল্ড, শক্তিশালী ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 140,
      prices: { '3ml': 140, '6ml': 280, '12ml': 560 },
      tags: ['spicy', 'woody', 'amber'],
      attributes: { family: 'spicy', gender: 'men', longevity: '10-12 hours' },
    },
    {
      title: 'Blazzers Addicts',
      description: 'মিষ্টি, অ্যাম্বারি ও উডি-আকর্ষণীয়, আধুনিক।',
      category: attarCat._id,
      basePrice: 140,
      prices: { '3ml': 140, '6ml': 280, '12ml': 560 },
      tags: ['sweet', 'amber', 'woody'],
      attributes: { family: 'sweet', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: '212 NYC',
      description: 'ফ্রেশ, সাইট্রাস, গ্রিন ও উডি-আধুনিক, প্রাণবন্ত ও দৈনন্দিন ব্যবহারের জন্য উপযুক্ত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 180,
      prices: { '3ml': 180, '6ml': 360, '12ml': 720 },
      tags: ['fresh', 'citrus', 'green'],
      attributes: { family: 'fresh', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Hawas For Him',
      description: 'ফ্রেশ, অ্যাকুয়াটিক, ফ্রুটি ও অ্যাম্বারি-আকর্ষণীয়, এনার্জেটিক ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['fresh', 'aquatic', 'fruity', 'men'],
      newArrival: true,
      attributes: { family: 'aquatic', gender: 'men', longevity: '10-12 hours' },
    },
    {
      title: 'Black XS',
      description: 'মিষ্টি, স্পাইসি ও উডি-বোল্ড, সেডাক্টিভ ও রাতের ব্যবহারের জন্য উপযুক্ত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['sweet', 'spicy', 'woody'],
      attributes: { family: 'spicy', gender: 'men', longevity: '10-12 hours' },
    },
    {
      title: 'Armani Si',
      description: 'ফ্রুটি, ফ্লোরাল ও ভ্যানিলা নোটের কমনীয় মার্জিত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['fruity', 'floral', 'vanilla', 'women'],
      attributes: { family: 'floral', gender: 'women', longevity: '8-10 hours' },
    },
    {
      title: 'White Oud',
      description: 'উডি, মস্কি ও হালকা মিষ্টি-পরিচ্ছন্ন, মার্জিত ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: oudCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['oud', 'woody', 'musk'],
      attributes: { family: 'oud', gender: 'unisex', longevity: '10-14 hours' },
    },
    {
      title: 'Hawas Ice',
      description: 'ফ্রেশ, অ্যাকুয়াটিক ও সাইট্রাস-শীতল, প্রাণবন্ত ও আধুনিক সুগন্ধ।',
      category: attarCat._id,
      basePrice: 220,
      prices: { '3ml': 220, '6ml': 440, '12ml': 880 },
      tags: ['fresh', 'aquatic', 'citrus'],
      newArrival: true,
      attributes: { family: 'fresh', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Hawas Fire',
      description: 'স্পাইসি, অ্যাম্বারি ও উডি—বোল্ড, শক্তিশালী ও আকর্ষণীয় সুগন্ধ।',
      category: attarCat._id,
      basePrice: 250,
      prices: { '3ml': 250, '6ml': 490, '12ml': 730 },
      tags: ['spicy', 'amber', 'woody'],
      newArrival: true,
      attributes: { family: 'spicy', gender: 'men', longevity: '10-14 hours' },
    },
    {
      title: 'Ocean Blue',
      description: 'ফ্রেশ, অ্যাকুয়াটিক ও সাইট্রাস-শীতল, প্রাণবন্ত ও দৈনন্দিন ব্যবহারের জন্য উপযুক্ত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 300,
      prices: { '3ml': 300, '6ml': 600, '12ml': 750 },
      tags: ['fresh', 'aquatic', 'citrus'],
      attributes: { family: 'aquatic', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Bleu De Chanel',
      description: 'ফ্রেশ, সাইট্রাস, উডি ও অ্যাম্বারি-এলিগ্যান্ট, আত্মবিশ্বাসী ও সব উপলক্ষের জন্য উপযুক্ত সুগন্ধ।',
      category: attarCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['fresh', 'citrus', 'woody', 'men'],
      attributes: { family: 'fresh', gender: 'men', longevity: '10-12 hours' },
    },
    {
      title: 'Red African',
      description: 'চকোলেটি, উষ্ণ, আকর্ষণীয় ও দীর্ঘস্থায়ী সুগন্ধ।',
      category: attarCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 500 },
      tags: ['chocolate', 'warm', 'sweet'],
      attributes: { family: 'sweet', gender: 'unisex', longevity: '10-14 hours' },
    },
    {
      title: 'Sauvage',
      description: 'বোল্ড, আইকনিক ও মাস্কুলিন স্পাইসি ফ্রেশ সুগন্ধ।',
      category: attarCat._id,
      basePrice: 130,
      prices: { '3ml': 130, '6ml': 260, '12ml': 500 },
      tags: ['fresh', 'spicy', 'men'],
      attributes: { family: 'spicy', gender: 'men', longevity: '8-10 hours' },
    },
    {
      title: 'Erba Pura',
      description: 'মিষ্টি ফ্রুটি ও আম্বার সুগন্ধ।',
      category: attarCat._id,
      basePrice: 120,
      prices: { '3ml': 120, '6ml': 240, '12ml': 480 },
      tags: ['fruity', 'sweet', 'amber'],
      attributes: { family: 'fruity', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'Cool Water',
      description: 'আইকনিক অ্যাকুয়াটিক ও ফ্রেশ সুগন্ধ।',
      category: attarCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 600 },
      tags: ['aquatic', 'fresh'],
      attributes: { family: 'aquatic', gender: 'unisex', longevity: '6-8 hours' },
    },

    // --- Oud Collection ---
    {
      title: 'Golden Kosturi',
      description: 'বিলাসবহুল কস্তুরী ও উদের গভীর ব্লেন্ড — দীর্ঘস্থায়ী সুবাস।',
      category: oudCat._id,
      basePrice: 350,
      prices: { '3ml': 350, '6ml': 700, '12ml': 1400 },
      tags: ['premium', 'oud', 'kosturi'],
      isFeatured: true,
      attributes: { family: 'oud', gender: 'unisex', longevity: '12-18 hours' },
    },
    {
      title: 'Kashmeri Oud',
      description: 'কাশ্মীরি উদ ও মাস্কের অনন্য মনমুগ্ধকর সুবাস।',
      category: oudCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['oud', 'kashmeri'],
      attributes: { family: 'oud', gender: 'unisex', longevity: '10-12 hours' },
    },
    {
      title: 'Shaikha',
      description: 'রাজকীয় অ্যারাবিয়ান উদ ব্লেন্ড।',
      category: oudCat._id,
      basePrice: 110,
      prices: { '3ml': 110, '6ml': 220, '12ml': 440 },
      tags: ['oud', 'arabic'],
      attributes: { family: 'oud', gender: 'women', longevity: '10-14 hours' },
    },

    {
      title: 'Royal Rose',
      slug: 'royal-rose',
      description: 'রোজ, ফ্লোরাল ও মস্কি-রাজকীয়, এলিগ্যান্ট ও meকর্ষণীয় সুগন্ধ।',
      category: floralCat._id,
      basePrice: 200,
      prices: { '3ml': 200, '6ml': 400, '12ml': 800 },
      tags: ['floral', 'rose', 'women'],
      isFeatured: true,
      attributes: { family: 'floral', gender: 'women', longevity: '8-10 hours' },
    },
    {
      title: 'কাঠগোলাপ',
      slug: 'kathgolap',
      description: 'প্রাকৃতিক কাঠগোলাপের মিষ্টি ও খাঁটি সুবাস।',
      category: floralCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 570 },
      tags: ['floral', 'bangla'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'জেসমিন',
      slug: 'jasmine',
      description: 'সতেজ জেসমিন ফুলের প্রশান্তিদায়ক সুবাস।',
      category: floralCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['floral', 'jasmine'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '6-8 hours' },
    },
    {
      title: 'বকুল',
      slug: 'bokul',
      description: 'ঐতিহ্যবাহী বকুল ফুলের মিষ্টি ও চিরচেনা ঘ্রাণ।',
      category: floralCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['floral', 'bokul'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '6-8 hours' },
    },
    {
      title: 'কদম',
      slug: 'kodom',
      description: 'বর্ষার কদম ফুলের প্রাকৃতিক সতেজ সুবাস।',
      category: floralCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 570 },
      tags: ['floral', 'kodom'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'চন্দন',
      slug: 'chandon',
      description: 'খাঁটি চন্দনের শান্তিদায়ক ও গভীর কাষ্ঠল সুবাস।',
      category: floralCat._id,
      basePrice: 150,
      prices: { '3ml': 150, '6ml': 300, '12ml': 570 },
      tags: ['sandalwood', 'woody'],
      attributes: { family: 'woody', gender: 'unisex', longevity: '10-12 hours' },
    },
    {
      title: 'জান্নাতুল ফুল',
      slug: 'jannatul-phool',
      description: 'বিভিন্ন স্বর্গীয় সুগন্ধি ফুলের অপূর্ব সমাহার।',
      category: floralCat._id,
      basePrice: 140,
      prices: { '3ml': 140, '6ml': 280, '12ml': 560 },
      tags: ['floral', 'jannat'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '8-10 hours' },
    },
    {
      title: 'কাঁচা বেলি',
      slug: 'kacha-beli',
      description: 'প্রাকৃতিক কাঁচা বেলির সতেজ ও তীব্র মনমুগ্ধকর ঘ্রাণ।',
      category: floralCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['floral', 'beli'],
      attributes: { family: 'floral', gender: 'unisex', longevity: '6-8 hours' },
    },
    {
      title: 'পুষ্পরাণী',
      slug: 'pushporani',
      description: 'অ্যারাবিয়ান ফ্লোরাল টাইপের রাজকীয় ও এলিগ্যান্ট সুবাস।',
      category: floralCat._id,
      basePrice: 130,
      prices: { '3ml': 130, '6ml': 260, '12ml': 500 },
      tags: ['floral', 'arabic'],
      attributes: { family: 'floral', gender: 'women', longevity: '8-10 hours' },
    },

    // --- Fruity Collection (ফলের রাজ্য) ---
    {
      title: 'Mango',
      description: 'পাকা আমের রসালো, সতেজ ও মিষ্টি সুবাস।',
      category: fruityCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['fruity', 'mango'],
      attributes: { family: 'fruity', gender: 'unisex', longevity: '6-8 hours' },
    },
    {
      title: 'Lychee',
      description: 'সতেজ লিচুর মিষ্টি ও সুস্বাদু ঘ্রাণ।',
      category: fruityCat._id,
      basePrice: 100,
      prices: { '3ml': 100, '6ml': 200, '12ml': 400 },
      tags: ['fruity', 'lychee'],
      attributes: { family: 'fruity', gender: 'unisex', longevity: '6-8 hours' },
    },

    // --- Non-attar sample items ---
    {
      title: 'The Art of Attar',
      description: 'ঐতিহ্যবাহী আতর তৈরির নির্দেশিকা ও ইসলামিক বই।',
      category: bookCat._id,
      basePrice: 450,
      prices: { 'Paperback': 450 },
      tags: ['book', 'islamic'],
      attributes: { isbn: '978-1234567890', author: 'Traditional Crafts', pages: 240, language: 'Bengali' },
    },
    {
      title: 'Premium Prayer Cap',
      description: 'আরামদায়ক সুতি কাপড়ের প্রিমিয়াম টুপি।',
      category: clothCat._id,
      basePrice: 250,
      prices: { 'Small': 250, 'Medium': 250, 'Large': 250 },
      tags: ['clothing', 'prayer'],
      attributes: { size: 'S/M/L', material: 'Cotton', color: 'White' },
    },
  ];

  for (const item of rawAttars) {
    const slug = (item as any).slug || slugify(item.title);
    await Product.create({
      title: item.title,
      slug,
      description: item.description,
      categoryId: item.category,
      basePrice: item.basePrice,
      images: ['/images/exact-attar-bottle.png'],
      variants: makeVariants(item.prices),
      attributes: item.attributes || {},
      tags: item.tags || [],
      isFeatured: (item as any).isFeatured ?? false,
      newArrival: (item as any).newArrival ?? false,
      isActive: true,
    });
  }

  console.log(`\n✅ Created ${rawAttars.length} products successfully!`);
  console.log('   Admin login: admin@kahftreasure.com / admin123');
  console.log('   Customer login: customer@test.com / customer123');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
