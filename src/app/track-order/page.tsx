'use client';

import { useState } from 'react';
import { orderServices } from '@/services/order.services';
import type { Order } from '@/types/order';
import { Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await orderServices.trackOrder(trackingNumber.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError('অর্ডার পাওয়া যায়নি। ট্র্যাকিং নম্বর চেক করুন।');
      }
    } catch {
      setError('অর্ডার পাওয়া যায়নি। ট্র্যাকিং নম্বর চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'অর্ডার গৃহীত', icon: Clock },
    { key: 'confirmed', label: 'কনফার্মড', icon: CheckCircle2 },
    { key: 'processing', label: 'প্রসেসিং', icon: Package },
    { key: 'shipped', label: 'শিপড', icon: Truck },
    { key: 'delivered', label: 'ডেলিভার্ড', icon: CheckCircle2 },
  ];
  const currentStepIndex = order ? statusSteps.findIndex(s => s.key === order.status) : -1;

  return (
    <div className="min-h-[60vh] bg-stone-50 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">অর্ডার ট্র্যাক করুন</h1>

        <form onSubmit={handleTrack} className="mb-6 flex gap-2">
          <input
            type="text"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
            placeholder="ট্র্যাকিং নম্বর (যেমন: KT-XXXX-XXXX)"
            className="flex-1 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            {loading ? '...' : 'খুঁজুন'}
          </button>
        </form>

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">{error}</div>
        )}

        {order && (
          <div className="rounded-3xl border border-stone-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">ট্র্যাকিং নম্বর</p>
                <p className="font-bold text-stone-900">{order.trackingNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-stone-500">মোট</p>
                <p className="font-bold text-stone-900">৳{order.totalAmount}</p>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              {statusSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= currentStepIndex;
                return (
                  <div key={step.key} className="flex flex-1 flex-col items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className={`mt-1 text-[10px] text-center ${isActive ? 'text-amber-700 font-semibold' : 'text-stone-400'}`}>
                      {step.label}
                    </p>
                    {i < statusSteps.length - 1 && (
                      <div className={`mt-[-20px] mb-[20px] h-0.5 w-full ${isActive ? 'bg-amber-300' : 'bg-stone-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 rounded-2xl bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-700">অর্ডার আইটেম:</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-stone-600">{item.title} ×{item.quantity}</span>
                  <span className="font-semibold text-stone-800">৳{item.totalPrice}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
