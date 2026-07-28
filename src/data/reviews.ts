/**
 * Customer reviews.
 *
 * ⚠️ PLACEHOLDER DATA — docs/PRODUCT_CATALOG.md and BUSINESS_REQUIREMENTS.md
 * list "Customer testimonials / Ratings / Reviews" as FUTURE features; no real
 * review content exists yet. The entries below are clearly-labelled sample
 * content so the UI and layout are complete and ready. Replace `reviews` with
 * genuine, verified customer reviews before launch, and flip `REVIEWS_ARE_PLACEHOLDER`.
 */

export const REVIEWS_ARE_PLACEHOLDER = true;

export interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number; // 1–5
  title: string;
  body: string;
  productName?: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Sample Customer',
    location: 'Dhaka',
    rating: 5,
    title: 'Long-lasting and elegant',
    body: 'Placeholder review text. Replace with a genuine customer testimonial before launch.',
    productName: 'Blue Mask',
  },
  {
    id: 'r2',
    name: 'Sample Customer',
    location: 'Chattogram',
    rating: 5,
    title: 'Exactly what I was looking for',
    body: 'Placeholder review text. Replace with a genuine customer testimonial before launch.',
    productName: 'Hawas For Him',
  },
  {
    id: 'r3',
    name: 'Sample Customer',
    location: 'Sylhet',
    rating: 4,
    title: 'Beautiful oud',
    body: 'Placeholder review text. Replace with a genuine customer testimonial before launch.',
    productName: 'Golden Kosturi',
  },
];
