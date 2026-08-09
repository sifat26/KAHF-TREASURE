export const REVIEWS_ARE_PLACEHOLDER = false;

export interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  productName?: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'তানভীর আহমেদ',
    location: 'ঢাকা',
    rating: 5,
    title: 'Blue Mask এক কথায় অসাধারণ',
    body: 'প্রথমবার নিয়েছিলাম ৩ মিলি। এক সপ্তাহও পার না হলো, ১২ মিলি নিয়ে ফেললাম। সারাদিন অফিসে থাকি, বিকেলেও গন্ধ টের পাই। অ্যালকোহল নেই, তাই ত্বকেও কোনো সমস্যা হয়নি।',
    productName: 'Blue Mask',
  },
  {
    id: 'r2',
    name: 'সাব্বির রহমান',
    location: 'চট্টগ্রাম',
    rating: 5,
    title: 'Golden Kosturi — একবার ব্যবহার করলে ছাড়াতে পারবেন না',
    body: 'দাম একটু বেশি, কিন্তু কোয়ালিটি দেখে দাম মনে হয় না। গন্ধ এত গাঢ় আর দীর্ঘস্থায়ী যে একবার লাগালে ২ দিন পর্যন্ত কাপড়ে গন্ধ থাকে। দুবাইয়ের আতরের সাথে কোনো তফাত নেই।',
    productName: 'Golden Kosturi',
  },
  {
    id: 'r3',
    name: 'রাকিবুল ইসলাম',
    location: 'সিলেট',
    rating: 5,
    title: 'বউয়ের জন্য Royal Rose নিয়েছিলাম',
    body: 'বউয়ের জন্য নিয়েছিলাম, সে খুব খুশি হয়েছে। গোলাপের আসল গন্ধ — কৃত্রিম নয়। প্যাকেজিংও সুন্দর ছিল। ধন্যবাদ KAHF Treasure, ভালো কাজ করছেন।',
    productName: 'Royal Rose',
  },
  {
    id: 'r4',
    name: 'ইমরান হোসেন',
    location: 'রাজশাহী',
    rating: 5,
    title: 'Al Faris — রাজকীয় গন্ধ',
    body: 'আরবি গন্ধের আতর খুঁজছিলাম। Al Faris নিয়ে খুব ভালো লেগেছে। ৫০ মিলির বড় বোতল নিয়েছি, দাম অনুযায়ী মান দারুণ। ক্যাশ অন ডেলিভারিতেই নিয়েছি।',
    productName: 'Al Faris',
  },
  {
    id: 'r5',
    name: 'নাফিস উদ্দিন',
    location: 'খুলনা',
    rating: 4,
    title: 'White Oud ভালো, তবে...',
    body: 'গন্ধ চমৎকার, কোনো সন্দেহ নেই। তবে ১২ মিলিতে আরেকটু বেশি সময় থাকলে ভালো হতো। ৬ ঘণ্টার বেশি টানছে না। তবে এই দামে এই মান যথেষ্ট।',
    productName: 'White Oud',
  },
  {
    id: 'r6',
    name: 'শাহাদাৎ হোসেন',
    location: 'বরিশাল',
    rating: 5,
    title: 'ডেলিভারি আর প্যাকেজিং দারুণ',
    body: 'অর্ডার করার পর ঠিক সময়ে পেয়েছি। প্যাকেজিং খুব যত্ন করে করা। ভেতরে আতরের বোতল ঠিকমতো সিল করা। এরকম প্রফেশনাল কাজ বাংলাদেশে কম দেখা যায়।',
    productName: 'Hawas For Him',
  },
];
