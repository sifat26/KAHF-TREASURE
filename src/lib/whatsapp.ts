import { waLink } from '@/data/site';
import type { Product, ProductSize } from '@/data/products';
import { formatPrice, formatSize } from './format';

/**
 * WhatsApp ordering is the business's primary conversion path
 * (docs/BUSINESS_REQUIREMENTS.md » Business Model — no online checkout).
 * These helpers build pre-filled wa.me links so the customer lands in a
 * conversation with their selection already written out.
 */

function encode(text: string): string {
  return encodeURIComponent(text);
}

/** Generic "contact us" link with an optional opening message. */
export function whatsappUrl(message?: string): string {
  return message ? `${waLink}?text=${encode(message)}` : waLink;
}

/** Order a single product/size. */
export function orderProductUrl(product: Product, size?: ProductSize): string {
  const price = size ? product.prices[size] : undefined;
  const sizePart = size ? ` (${formatSize(size)}${price ? ` — ${formatPrice(price)}` : ''})` : '';
  const message = `Hello KAHF Treasure! I'd like to order:\n\n• ${product.name}${sizePart}\n\nIs this available?`;
  return whatsappUrl(message);
}

export interface EnquiryLine {
  name: string;
  size: ProductSize;
  qty: number;
  price?: number;
}

/** Order a whole enquiry bag as one message. */
export function orderBagUrl(lines: EnquiryLine[]): string {
  if (lines.length === 0) return waLink;
  const items = lines
    .map((l) => {
      const price = l.price ? ` — ${formatPrice(l.price)}` : '';
      return `• ${l.name} (${formatSize(l.size)}) × ${l.qty}${price}`;
    })
    .join('\n');
  const total = lines.reduce((sum, l) => sum + (l.price ?? 0) * l.qty, 0);
  const totalLine = total > 0 ? `\n\nEstimated total: ${formatPrice(total)}` : '';
  const message = `Hello KAHF Treasure! I'd like to order the following:\n\n${items}${totalLine}\n\nPlease confirm availability and delivery. Thank you!`;
  return whatsappUrl(message);
}
