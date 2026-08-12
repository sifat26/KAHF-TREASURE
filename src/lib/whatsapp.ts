import type { Product, ProductSize } from '@/data/products';
import { contact, waLink } from '@/data/site';
import type { Order } from '@/types/order';
import { formatPrice, formatSize, toBanglaDigits } from './format';

/**
 * WhatsApp ordering is the business's primary conversion path
 * (docs/BUSINESS_REQUIREMENTS.md » Business Model — no online checkout).
 * These helpers build pre-filled wa.me links so the customer lands in a
 * conversation with their selection already written out.
 *
 * The message body is Bangla: it appears in the customer's own chat thread, so
 * it has to read as something they would plausibly have typed. Product names
 * stay in Latin script — they match the labels on the bottles and in the
 * shop's inventory, so the owner can look them up without transliterating.
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
  const message = `আসসালামু আলাইকুম, KAHF Treasure! আমি এটি অর্ডার করতে চাই:\n\n• ${product.name}${sizePart}\n\nএটি কি এখন পাওয়া যাবে?`;
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
      return `• ${l.name} (${formatSize(l.size)}) × ${toBanglaDigits(l.qty)}টি${price}`;
    })
    .join('\n');
  const total = lines.reduce((sum, l) => sum + (l.price ?? 0) * l.qty, 0);
  const totalLine = total > 0 ? `\n\nসম্ভাব্য মোট: ${formatPrice(total)}` : '';
  const message = `আসসালামু আলাইকুম, KAHF Treasure! আমি নিচের আতরগুলো অর্ডার করতে চাই:\n\n${items}${totalLine}\n\nস্টক আর ডেলিভারির বিষয়টি জানালে উপকৃত হব। ধন্যবাদ!`;
  return whatsappUrl(message);
}

/** Prefilled admin notification for a successfully placed order. */
export function adminOrderUrl(
  order: Pick<
    Order,
    | 'trackingNumber'
    | 'customerName'
    | 'phone'
    | 'district'
    | 'upazila'
    | 'addressLine'
    | 'postalCode'
    | 'orderNote'
    | 'items'
    | 'totalAmount'
    | 'paymentMethod'
  >,
): string {
  const items = order.items
    .map((item) => {
      const variant = item.variantLabel ? ` (${item.variantLabel})` : '';
      const price = item.totalPrice ?? ((item.unitPrice ?? 0) * (item.quantity ?? 1));
      return `• ${item.title}${variant} × ${toBanglaDigits(item.quantity ?? 1)} = ${formatPrice(price)}`;
    })
    .join('\n');

  const postalLine = order.postalCode ? `\nপোস্ট কোড: ${order.postalCode}` : '';
  const noteLine = order.orderNote ? `\nনোট: ${order.orderNote}` : '';
  const message = [
    'আসসালামু আলাইকুম, KAHF Treasure!',
    'নতুন অর্ডার এসেছে:',
    '',
    `ট্র্যাকিং: ${order.trackingNumber}`,
    `গ্রাহক: ${order.customerName}`,
    `ফোন: ${order.phone}`,
    `জেলা: ${order.district}`,
    `উপজেলা: ${order.upazila}`,
    `ঠিকানা: ${order.addressLine}${postalLine}`,
    `পেমেন্ট: ${order.paymentMethod.toUpperCase()}`,
    '',
    items,
    '',
    `মোট: ${formatPrice(order.totalAmount)}`,
    noteLine,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${contact.whatsapp}?text=${encode(message)}`;
}
