'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import { orderServices } from '@/services/order.services';
import { couponServices } from '@/services/coupon.services';
import { ArrowLeft, Loader2, Tag, X } from 'lucide-react';
import { trackEvent } from '@/components/seo/GoogleAnalytics';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.cart.items);

  const [formState, setFormState] = useState({
    customerName: '',
    phone: '',
    email: '',
    district: '',
    upazila: '',
    addressLine: '',
    postalCode: '',
    orderNote: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const shipping = subtotal > 0 ? 60 : 0;
  const total = Math.max(0, subtotal - couponDiscount + shipping);

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    setApplyingCoupon(true);
    setCouponMsg(null);
    try {
      const res = await couponServices.validateCoupon(code, subtotal);
      if (res.success && res.data) {
        setAppliedCoupon(code);
        setCouponDiscount(res.data.discount);
        setCouponMsg(`âœ“ à¦•à§à¦ªà¦¨ à¦ªà§à¦°à¦¯à§‹à¦œà§à¦¯! à¦›à¦¾à¦¡à¦¼: à§³${res.data.discount}`);
      }
    } catch (err: any) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponMsg(err?.message || 'à¦•à§à¦ªà¦¨ à¦­à§à¦² à¦¬à¦¾ à¦®à§‡à¦¯à¦¼à¦¾à¦¦à§‹à¦¤à§à¦¤à§€à¦°à§à¦£');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('à¦•à¦¾à¦°à§à¦Ÿ à¦–à¦¾à¦²à¦¿à¥¤ à¦ªà§à¦°à¦¥à¦®à§‡ à¦ªà¦£à§à¦¯ à¦¯à§‹à¦— à¦•à¦°à§à¦¨à¥¤');
      return;
    }

    setPlacingOrder(true);
    try {
      const res = await orderServices.createOrder({
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        customerName: formState.customerName,
        email: formState.email || undefined,
        phone: formState.phone,
        district: formState.district,
        upazila: formState.upazila,
        addressLine: formState.addressLine,
        postalCode: formState.postalCode || undefined,
        orderNote: formState.orderNote || undefined,
        shipping,
        paymentMethod,
      });

      if (res.success && res.data) {
        dispatch(clearCart());
        router.push(`/order-success?tracking=${res.data.trackingNumber}`);
      } else {
        setError(res.message || 'à¦…à¦°à§à¦¡à¦¾à¦° à¦¸à¦®à§à¦ªà¦¨à§à¦¨ à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿');
      }
    } catch (err: any) {
      setError(err?.message || 'à¦…à¦°à§à¦¡à¦¾à¦° à¦¸à¦®à§à¦ªà¦¨à§à¦¨ à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿à¥¤ à¦†à¦¬à¦¾à¦° à¦šà§‡à¦·à§à¦Ÿà¦¾ à¦•à¦°à§à¦¨à¥¤');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="rounded-3xl border border-stone-200 bg-white p-10 shadow-sm">
          <p className="text-xl font-semibold text-stone-800">à¦•à¦¾à¦°à§à¦Ÿ à¦–à¦¾à¦²à¦¿</p>
          <p className="mt-2 text-sm text-stone-500">à¦šà§‡à¦•à¦†à¦‰à¦Ÿ à¦•à¦°à¦¤à§‡ à¦ªà§à¦°à¦¥à¦®à§‡ à¦ªà¦£à§à¦¯ à¦•à¦¾à¦°à§à¦Ÿà§‡ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-amber-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800"
          >
            à¦¶à¦ª à¦•à¦°à§à¦¨
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/shop" className="mb-4 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700">
          <ArrowLeft className="h-4 w-4" /> à¦¶à¦ªà§‡ à¦«à¦¿à¦°à§à¦¨
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-stone-900">à¦šà§‡à¦•à¦†à¦‰à¦Ÿ</h1>

        <form onSubmit={handlePlaceOrder} className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: Form */}
          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-stone-900">à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¤à¦¥à§à¦¯</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="à¦¨à¦¾à¦® *" required>
                  <input
                    type="text"
                    required
                    value={formState.customerName}
                    onChange={e => setFormState(s => ({ ...s, customerName: e.target.value }))}
                    className="kahf-input"
                    placeholder="à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦®"
                  />
                </Field>
                <Field label="à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° *" required>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="kahf-input"
                    placeholder="01XXXXXXXXX"
                  />
                </Field>
                <Field label="à¦œà§‡à¦²à¦¾ *" required>
                  <input
                    type="text"
                    required
                    value={formState.district}
                    onChange={e => setFormState(s => ({ ...s, district: e.target.value }))}
                    className="kahf-input"
                    placeholder="à¦¢à¦¾à¦•à¦¾"
                  />
                </Field>
                <Field label="à¦‰à¦ªà¦œà§‡à¦²à¦¾ *" required>
                  <input
                    type="text"
                    required
                    value={formState.upazila}
                    onChange={e => setFormState(s => ({ ...s, upazila: e.target.value }))}
                    className="kahf-input"
                    placeholder="à¦§à¦¾à¦¨à¦®à¦¨à§à¦¡à¦¿"
                  />
                </Field>
                <Field label="à¦‡à¦®à§‡à¦‡à¦² (à¦à¦šà§à¦›à¦¿à¦•)">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="kahf-input"
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="à¦ªà§‹à¦¸à§à¦Ÿ à¦•à§‹à¦¡ (à¦à¦šà§à¦›à¦¿à¦•)">
                  <input
                    type="text"
                    value={formState.postalCode}
                    onChange={e => setFormState(s => ({ ...s, postalCode: e.target.value }))}
                    className="kahf-input"
                    placeholder="1212"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="à¦ à¦¿à¦•à¦¾à¦¨à¦¾ *" required>
                    <textarea
                      required
                      rows={2}
                      value={formState.addressLine}
                      onChange={e => setFormState(s => ({ ...s, addressLine: e.target.value }))}
                      className="kahf-input"
                      placeholder="à¦¬à¦¾à¦¸à¦¾ à¦¨à¦®à§à¦¬à¦°, à¦°à¦¾à¦¸à§à¦¤à¦¾, à¦²à§à¦¯à¦¾à¦¨à§à¦¡à¦®à¦¾à¦°à§à¦•"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="à¦…à¦°à§à¦¡à¦¾à¦° à¦¨à§‹à¦Ÿ (à¦à¦šà§à¦›à¦¿à¦•)">
                    <textarea
                      rows={2}
                      value={formState.orderNote}
                      onChange={e => setFormState(s => ({ ...s, orderNote: e.target.value }))}
                      className="kahf-input"
                      placeholder="à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿à¦° à¦†à¦—à§‡ à¦•à¦² à¦•à¦°à¦¬à§‡à¦¨"
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-stone-900">à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦®à§‡à¦¥à¦¡</h2>
              <div className="space-y-2">
                {[
                  { id: 'cod', label: 'à¦•à§à¦¯à¦¾à¦¶ à¦…à¦¨ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿', note: 'à¦ªà¦£à§à¦¯ à¦¹à¦¾à¦¤à§‡ à¦ªà§‡à¦¯à¦¼à§‡ à¦Ÿà¦¾à¦•à¦¾ à¦¦à¦¿à¦¨' },
                  { id: 'bkash', label: 'à¦¬à¦¿à¦•à¦¾à¦¶', note: 'à¦¬à¦¿à¦•à¦¾à¦¶ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà§‡à¦œà§‡ à¦°à¦¿à¦¡à¦¾à¦‡à¦°à§‡à¦•à§à¦Ÿ à¦¹à¦¬à§‡' },
                  { id: 'nagad', label: 'à¦¨à¦—à¦¦', note: 'à¦¨à¦—à¦¦ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà§‡à¦œà§‡ à¦°à¦¿à¦¡à¦¾à¦‡à¦°à§‡à¦•à§à¦Ÿ à¦¹à¦¬à§‡' },
                ].map(opt => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                      paymentMethod === opt.id
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-stone-200 hover:border-amber-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={e => setPaymentMethod(e.target.value as any)}
                      className="h-4 w-4 accent-amber-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{opt.label}</p>
                      <p className="text-xs text-stone-500">{opt.note}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-stone-200 bg-white p-5">
              <h2 className="mb-4 text-lg font-semibold text-stone-900">à¦…à¦°à§à¦¡à¦¾à¦° à¦¸à¦¾à¦°à¦¾à¦‚à¦¶</h2>

              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3 rounded-xl bg-stone-50 p-2.5">
                    <div className="flex gap-2.5">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
                        {item.image && <img src={item.image} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">{item.title}</p>
                        {item.variantLabel && <p className="text-[10px] text-stone-500">{item.variantLabel}</p>}
                        <p className="text-[10px] text-stone-500">Ã—{item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-stone-900">à§³{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-4 rounded-xl border border-dashed border-amber-200 bg-amber-50/40 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">à¦•à§à¦ªà¦¨</p>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-emerald-600">âœ“ {appliedCoupon}</p>
                      <p className="text-xs text-stone-600">à¦›à¦¾à¦¡à¦¼: à§³{couponDiscount}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setAppliedCoupon(null); setCouponDiscount(0); setCouponCode(''); setCouponMsg(null); }}
                      className="text-stone-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="à¦•à§à¦ªà¦¨ à¦•à§‹à¦¡"
                      className="kahf-input h-10 text-sm"
                      disabled={applyingCoupon}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon}
                      className="rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
                    >
                      {applyingCoupon ? '...' : 'à¦ªà§à¦°à¦¯à¦¼à§‹à¦—'}
                    </button>
                  </div>
                )}
                {couponMsg && <p className="mt-2 text-xs text-stone-600">{couponMsg}</p>}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>à¦¸à¦¾à¦¬à¦Ÿà§‹à¦Ÿà¦¾à¦²</span><span>à§³{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦šà¦¾à¦°à§à¦œ</span><span>à§³{shipping}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>à¦›à¦¾à¦¡à¦¼</span><span>-à§³{couponDiscount}</span>
                  </div>
                )}
                <div className="h-px bg-stone-100" />
                <div className="flex justify-between text-base font-bold text-stone-900">
                  <span>à¦®à§‹à¦Ÿ</span><span>à§³{total}</span>
                </div>
              </div>

              {error && (
                <div className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-xs text-red-600">{error}</div>
              )}

              <button
                type="submit"
                disabled={placingOrder}
                className="mt-4 w-full rounded-full bg-amber-700 py-3.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
              >
                {placingOrder ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> à¦…à¦°à§à¦¡à¦¾à¦° à¦¹à¦šà§à¦›à§‡...
                  </span>
                ) : (
                  `à¦…à¦°à§à¦¡à¦¾à¦° à¦•à¦¨à¦«à¦¾à¦°à§à¦® à¦•à¦°à§à¦¨ â†’ à§³${total}`
                )}
              </button>
            </div>
          </aside>
        </form>
      </div>

      <style jsx global>{`
        .kahf-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e7e5e4;
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #1c1917;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .kahf-input:focus {
          border-color: #d97706;
          box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.1);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-stone-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

