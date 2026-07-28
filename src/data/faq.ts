/**
 * Frequently asked questions.
 *
 * Answers are derived strictly from confirmed facts in the source docs
 * (alcohol-free, WhatsApp ordering, sizes, BDT pricing, Bangladesh market).
 * Anything not defined in the docs (exact delivery time, charges, returns)
 * is written to point the customer to WhatsApp rather than stating an
 * unverified rule. See docs/BUSINESS_REQUIREMENTS.md.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Are KAHF Treasure attars alcohol-free?',
    answer:
      'Yes. Every KAHF Treasure fragrance is a concentrated, alcohol-free attar oil — gentle on the skin and long lasting.',
  },
  {
    question: 'What bottle sizes are available?',
    answer:
      'Most fragrances are available in 3ml (sample), 6ml (regular) and 12ml (large). Larger sizes may be introduced in future.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Browse the collection, choose your fragrance and size, then tap “Order on WhatsApp”. Your selection is pre-filled into a message so you can confirm details and delivery with our team directly.',
  },
  {
    question: 'How long does an attar last on the skin?',
    answer:
      'Because attars are concentrated oils, they typically last much longer than alcohol-based sprays. Longevity varies by fragrance and skin type — message us and we’ll recommend the best long-lasting options.',
  },
  {
    question: 'Which fragrance should I choose?',
    answer:
      'Tell us what you like — fresh, sweet, woody, floral or oud — and the occasion, and our team will suggest the right scent. You can also explore our Collections to narrow down by style.',
  },
  {
    question: 'Do you deliver across Bangladesh?',
    answer:
      'Yes, we deliver across Bangladesh. For current delivery time and charges to your area, please confirm with us on WhatsApp when you place your order.',
  },
  {
    question: 'Are the prices fixed?',
    answer:
      'All prices are shown in Bangladeshi Taka (BDT). Prices may change without prior notice and availability depends on current stock.',
  },
  {
    question: 'Can I buy a fragrance as a gift?',
    answer:
      'Absolutely. Many of our attars make elegant gifts. Let us know it’s a gift when you order and we’ll help you choose something memorable.',
  },
];
