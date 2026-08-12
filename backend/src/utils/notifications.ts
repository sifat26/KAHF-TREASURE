import config from '../config';
import type { IOrder } from '../models/Order';
import { escapeHtml, sendTelegramMessage } from './telegram';

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'ক্যাশ অন ডেলিভারি',
  bkash: 'bKash',
  nagad: 'Nagad',
  card: 'কার্ড',
};

/** Format a BDT amount, e.g. 1200 -> "৳1,200". */
function taka(n: number): string {
  return `৳${Math.round(n).toLocaleString('en-US')}`;
}

/**
 * Notify the shop admin(s) on Telegram that a new order was placed.
 *
 * Never throws — safe to call fire-and-forget from the order controller so a
 * notification failure can never affect order creation or checkout latency.
 */
export async function notifyNewOrder(order: IOrder): Promise<void> {
  try {
    const address = [order.addressLine, order.upazila, order.district, order.postalCode]
      .filter(Boolean)
      .join(', ');

    const lines: string[] = [
      '🛒 <b>নতুন অর্ডার এসেছে!</b>',
      '',
      `📦 <b>ট্র্যাকিং:</b> <code>${escapeHtml(order.trackingNumber)}</code>`,
      `👤 <b>নাম:</b> ${escapeHtml(order.customerName)}`,
      `📞 <b>ফোন:</b> ${escapeHtml(order.phone)}`,
    ];

    if (order.email) lines.push(`✉️ <b>ইমেইল:</b> ${escapeHtml(order.email)}`);
    lines.push(`📍 <b>ঠিকানা:</b> ${escapeHtml(address)}`);
    lines.push(`💳 <b>পেমেন্ট:</b> ${PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}`);

    lines.push('', '<b>পণ্যসমূহ:</b>');
    for (const item of order.items) {
      const variant = item.variantLabel ? ` (${escapeHtml(item.variantLabel)})` : '';
      lines.push(`• ${escapeHtml(item.title)}${variant} × ${item.quantity} — ${taka(item.totalPrice)}`);
    }

    lines.push('', `সাবটোটাল: ${taka(order.subtotal)}`);
    if (order.shipping) lines.push(`ডেলিভারি: ${taka(order.shipping)}`);
    if (order.discountAmount) lines.push(`ছাড়: -${taka(order.discountAmount)}`);
    lines.push(`🧾 <b>মোট: ${taka(order.totalAmount)}</b>`);

    if (order.orderNote) lines.push('', `📝 <b>নোট:</b> ${escapeHtml(order.orderNote)}`);

    const adminUrl = `${config.frontend_url.replace(/\/$/, '')}/admin/orders`;
    lines.push('', `🔗 <a href="${adminUrl}">অ্যাডমিন প্যানেলে দেখুন</a>`);

    await sendTelegramMessage(lines.join('\n'));
  } catch (err) {
    console.error('[notifyNewOrder] failed to build/send notification:', err);
  }
}
