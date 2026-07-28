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
  /** Paragraphs. Strings starting with "[PLACEHOLDER" render as callouts. */
  body: string[];
}

export interface PolicyDoc {
  slug: 'shipping' | 'returns' | 'privacy' | 'terms';
  title: string;
  intro: string;
  sections: PolicySection[];
}

const PLACEHOLDER = '[PLACEHOLDER — to be provided by the business]';

export const policies: Record<PolicyDoc['slug'], PolicyDoc> = {
  shipping: {
    slug: 'shipping',
    title: 'Shipping Policy',
    intro:
      'KAHF Treasure delivers premium alcohol-free attar across Bangladesh. Orders are placed and confirmed directly on WhatsApp.',
    sections: [
      {
        heading: 'Delivery Coverage',
        body: [
          'We deliver across Bangladesh.',
          `Exact serviceable areas outside major cities: ${PLACEHOLDER}.`,
        ],
      },
      {
        heading: 'Delivery Time',
        body: [`Estimated delivery time by area: ${PLACEHOLDER}.`],
      },
      {
        heading: 'Delivery Charges',
        body: [
          `Delivery charges (inside/outside city, free-delivery threshold, if any): ${PLACEHOLDER}.`,
          'Charges are confirmed with you on WhatsApp before your order is dispatched.',
        ],
      },
      {
        heading: 'Order Confirmation',
        body: [
          'After you send your selection on WhatsApp, our team confirms availability, delivery time and charges before the order is finalised.',
        ],
      },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Return & Refund Policy',
    intro: 'Your satisfaction matters to us. This policy explains returns and refunds.',
    sections: [
      { heading: 'Return Window', body: [`Return/exchange window and eligibility: ${PLACEHOLDER}.`] },
      {
        heading: 'Conditions for Return',
        body: [`Condition requirements (unopened, damaged in transit, etc.): ${PLACEHOLDER}.`],
      },
      { heading: 'Refund Method & Timeline', body: [`Refund method and timeline: ${PLACEHOLDER}.`] },
      {
        heading: 'How to Request',
        body: [
          'To raise a return or report an issue with your order, message us on WhatsApp with your order details and we’ll assist you.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro:
      'This policy explains how KAHF Treasure handles the information you share when contacting us or placing an order.',
    sections: [
      {
        heading: 'Information We Collect',
        body: [
          'When you contact us or order, you may share your name, phone number, email and delivery address.',
          `Full list of data collected and any analytics/cookies used: ${PLACEHOLDER}.`,
        ],
      },
      {
        heading: 'How We Use Your Information',
        body: [
          'We use your information solely to process orders, arrange delivery and respond to your enquiries.',
          `Any additional uses (marketing, newsletters): ${PLACEHOLDER}.`,
        ],
      },
      { heading: 'Data Sharing', body: [`Third parties data may be shared with (couriers, etc.): ${PLACEHOLDER}.`] },
      { heading: 'Contact', body: ['For any privacy question, contact us on WhatsApp or by email.'] },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro: 'These terms govern your use of the KAHF Treasure website and the ordering process.',
    sections: [
      {
        heading: 'Products & Pricing',
        body: [
          'All prices are shown in Bangladeshi Taka (BDT). Prices may change without prior notice and availability depends on current stock.',
          'Product images and fragrance descriptions are provided to help you choose; natural attar characteristics may vary slightly.',
        ],
      },
      {
        heading: 'Ordering',
        body: [
          'Orders are placed via WhatsApp, Facebook or phone. An order is confirmed once our team acknowledges availability and delivery details.',
        ],
      },
      { heading: 'Payment', body: [`Accepted payment methods and terms: ${PLACEHOLDER}.`] },
      { heading: 'Governing Law', body: [`Governing jurisdiction: ${PLACEHOLDER}.`] },
    ],
  },
};

export const policyList = Object.values(policies);

export function isPlaceholder(text: string): boolean {
  return text.includes('[PLACEHOLDER');
}
