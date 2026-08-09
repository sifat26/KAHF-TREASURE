'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { orderServices } from '@/services/order.services';
import type { Order } from '@/types/order';
import { CheckCircle2, Package, Truck, Home } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const tracking = params.get('tracking');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tracking) {
      orderServices.trackOrder(tracking)
        .then(res => { if (res.success && res.data) setOrder(res.data); })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [tracking]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-stone-400">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">অর্ডার সফল হয়েছে!</h1>
        <p className="mt-2 text-sm text-stone-500">আপনার অর্ডারটি সফলভাবে প্লেস করা হয়েছে।</p>

        {order && (
          <div className="mt-6 space-y-3 rounded-2xl bg-stone-50 p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">ট্র্যাকিং নম্বর</span>
              <span className="font-semibold text-stone-900">{order.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">মোট</span>
              <span className="font-semibold text-stone-900">৳{(order.totalAmount || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">স্ট্যাটাস</span>
              <span className="font-semibold text-amber-700">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">পেমেন্ট</span>
              <span className="font-semibold text-stone-900">{(order.paymentMethod || 'cod').toUpperCase()}</span>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="flex-1 rounded-full border border-stone-200 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            হোম
          </Link>
          <Link
            href="/shop"
            className="flex-1 rounded-full bg-amber-700 py-2.5 text-sm font-medium text-white hover:bg-amber-800"
          >
            আরও কেনাকাটা
          </Link>
        </div>
      </div>
    </div>
  );
}
