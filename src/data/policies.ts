/**
 * Policy page content.
 *
 * ⚠️ IMPORTANT: The source documents (BUSINESS_REQUIREMENTS.md etc.) list
 * shipping/return/privacy/terms as REQUIRED future content but do NOT define
 * the actual rules (delivery time, charges, return window, data handling…).
 *
 * Per the redesign brief, business rules must NOT be invented. Each policy
 * below therefore states only what is confirmed by the docs (WhatsApp-based
 * ordering, Bangladesh delivery, BDT pricing, alcohol-free products) and marks
 * everything unknown with a clear PLACEHOLDER the business must complete.
 */

export interface PolicySection {
  heading: string;
  /** Paragraphs. Strings containing "[অপেক্ষমাণ" render as callouts. */
  body: string[];
}

export interface PolicyDoc {
  slug: 'shipping' | 'returns' | 'privacy' | 'terms';
  title: string;
  intro: string;
  sections: PolicySection[];
}

const PLACEHOLDER = '[অপেক্ষমাণ — ব্যবসার পক্ষ থেকে জানানো হবে]';

export const policies: Record<PolicyDoc['slug'], PolicyDoc> = {
  shipping: {
    slug: 'shipping',
    title: 'ডেলিভারি নীতিমালা',
    intro:
      'KAHF Treasure সারা বাংলাদেশে প্রিমিয়াম অ্যালকোহল-মুক্ত আতর পৌঁছে দেয়। অর্ডার নেওয়া ও নিশ্চিত করা হয় সরাসরি WhatsApp-এ।',
    sections: [
      {
        heading: 'ডেলিভারির আওতা',
        body: [
          'আমরা সারা বাংলাদেশে ডেলিভারি করি।',
          `বড় শহরের বাইরে ঠিক কোন কোন এলাকায় ডেলিভারি হয়: ${PLACEHOLDER}।`,
        ],
      },
      {
        heading: 'ডেলিভারির সময়',
        body: [`এলাকা অনুযায়ী সম্ভাব্য ডেলিভারির সময়: ${PLACEHOLDER}।`],
      },
      {
        heading: 'ডেলিভারি চার্জ',
        body: [
          `ডেলিভারি চার্জ (শহরের ভেতরে/বাইরে, ফ্রি ডেলিভারির সীমা থাকলে সেটি): ${PLACEHOLDER}।`,
          'পণ্য পাঠানোর আগেই WhatsApp-এ আপনার সঙ্গে চার্জ নিশ্চিত করে নেওয়া হয়।',
        ],
      },
      {
        heading: 'অর্ডার নিশ্চিতকরণ',
        body: [
          'WhatsApp-এ আপনার পছন্দ পাঠানোর পর আমাদের টিম স্টক, ডেলিভারির সময় ও চার্জ নিশ্চিত করে, তারপরই অর্ডার চূড়ান্ত হয়।',
        ],
      },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'রিটার্ন ও রিফান্ড নীতিমালা',
    intro: 'আপনার সন্তুষ্টি আমাদের কাছে গুরুত্বপূর্ণ। রিটার্ন ও রিফান্ড কীভাবে হয়, এখানে তা বলা হয়েছে।',
    sections: [
      { heading: 'রিটার্নের সময়সীমা', body: [`রিটার্ন বা বদলের সময়সীমা ও শর্ত: ${PLACEHOLDER}।`] },
      {
        heading: 'রিটার্নের শর্ত',
        body: [`পণ্যের অবস্থা সম্পর্কিত শর্ত (না খোলা, পথে ক্ষতিগ্রস্ত ইত্যাদি): ${PLACEHOLDER}।`],
      },
      { heading: 'রিফান্ডের পদ্ধতি ও সময়', body: [`রিফান্ডের পদ্ধতি ও সময়: ${PLACEHOLDER}।`] },
      {
        heading: 'কীভাবে জানাবেন',
        body: [
          'রিটার্ন করতে চাইলে বা অর্ডারে কোনো সমস্যা হলে অর্ডারের তথ্যসহ WhatsApp-এ মেসেজ দিন — আমরা সাহায্য করব।',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'প্রাইভেসি নীতিমালা',
    intro:
      'আমাদের সঙ্গে যোগাযোগ করলে বা অর্ডার করলে আপনি যে তথ্য দেন, KAHF Treasure সেটি কীভাবে ব্যবহার করে — এখানে তা বলা হয়েছে।',
    sections: [
      {
        heading: 'আমরা কী তথ্য নিই',
        body: [
          'যোগাযোগ বা অর্ডারের সময় আপনি নাম, ফোন নম্বর, ইমেইল ও ডেলিভারির ঠিকানা দিতে পারেন।',
          `সংগৃহীত সব তথ্যের পূর্ণ তালিকা এবং ব্যবহৃত অ্যানালিটিক্স/কুকি: ${PLACEHOLDER}।`,
        ],
      },
      {
        heading: 'তথ্য কীভাবে ব্যবহার করি',
        body: [
          'আপনার তথ্য শুধু অর্ডার প্রক্রিয়া করা, ডেলিভারির ব্যবস্থা করা আর আপনার প্রশ্নের উত্তর দিতে ব্যবহার করা হয়।',
          `অন্য কোনো ব্যবহার (মার্কেটিং, নিউজলেটার): ${PLACEHOLDER}।`,
        ],
      },
      {
        heading: 'তথ্য শেয়ার করা',
        body: [`যাদের সঙ্গে তথ্য শেয়ার হতে পারে (কুরিয়ার ইত্যাদি): ${PLACEHOLDER}।`],
      },
      { heading: 'যোগাযোগ', body: ['প্রাইভেসি নিয়ে যেকোনো প্রশ্নে WhatsApp-এ বা ইমেইলে যোগাযোগ করুন।'] },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'শর্তাবলি',
    intro: 'KAHF Treasure ওয়েবসাইট ব্যবহার ও অর্ডার প্রক্রিয়ার ক্ষেত্রে এই শর্তগুলো প্রযোজ্য।',
    sections: [
      {
        heading: 'পণ্য ও দাম',
        body: [
          'সব দাম বাংলাদেশি টাকায় (৳) দেওয়া। দাম আগে না জানিয়ে বদলাতে পারে এবং পণ্য পাওয়া যাবে কি না তা স্টকের ওপর নির্ভর করে।',
          'পণ্যের ছবি ও সুবাসের বর্ণনা দেওয়া হয় আপনার পছন্দ বেছে নেওয়ার সুবিধার জন্য; আতর প্রাকৃতিক উপাদান হওয়ায় সুবাসে সামান্য হেরফের হতে পারে।',
        ],
      },
      {
        heading: 'অর্ডার',
        body: [
          'অর্ডার নেওয়া হয় WhatsApp, Facebook বা ফোনে। আমাদের টিম স্টক ও ডেলিভারির তথ্য নিশ্চিত করলেই অর্ডার চূড়ান্ত হয়।',
        ],
      },
      { heading: 'পেমেন্ট', body: [`গ্রহণযোগ্য পেমেন্ট পদ্ধতি ও শর্ত: ${PLACEHOLDER}।`] },
      { heading: 'প্রযোজ্য আইন', body: [`প্রযোজ্য এলাকা ও আইন: ${PLACEHOLDER}।`] },
    ],
  },
};

export const policyList = Object.values(policies);

export function isPlaceholder(text: string): boolean {
  return text.includes('[অপেক্ষমাণ');
}
