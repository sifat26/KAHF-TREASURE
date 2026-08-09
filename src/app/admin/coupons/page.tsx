'use client';

import { useEffect, useState } from 'react';
import { couponServices } from '@/services/coupon.services';
import type { Coupon } from '@/types/coupon';
import { Plus, Trash2, X, Loader2, Ticket } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const res = await couponServices.getCoupons(); if (res.success) setCoupons(res.data || []); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">কুপন ব্যবস্থাপনা</h1>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">
          <Plus className="h-4 w-4" /> নতুন কুপন
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-stone-400">লোড হচ্ছে...</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map(coupon => (
            <div key={coupon._id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Ticket className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800">{coupon.code}</p>
                    <p className="text-xs text-stone-400">
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `৳${coupon.value}`} ছাড়
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">
                  ব্যবহৃত: {coupon.usedCount}/{coupon.usageLimit}
                </span>
                <span className={`rounded-full px-2 py-0.5 ${coupon.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                  {coupon.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-400">
                মেয়াদ: {new Date(coupon.validFrom).toLocaleDateString()} - {new Date(coupon.validUntil).toLocaleDateString()}
              </p>
            </div>
          ))}
          {coupons.length === 0 && <div className="col-span-full py-10 text-center text-stone-400">কোনো কুপন নেই</div>}
        </div>
      )}

      {showModal && <CouponModal onClose={() => setShowModal(false)} onSaved={() => { setShowModal(false); load(); }} />}
    </div>
  );
}

function CouponModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    code: '', description: '', type: 'percentage' as 'percentage' | 'fixed',
    value: 10, minOrderAmount: 0, maxDiscountAmount: 0,
    usageLimit: 100, validFrom: '', validUntil: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true); setError(null);
    try {
      await couponServices.createCoupon({
        code: form.code.toUpperCase(), description: form.description || undefined,
        type: form.type, value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : undefined,
        maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : undefined,
        usageLimit: Number(form.usageLimit),
        validFrom: form.validFrom, validUntil: form.validUntil,
      });
      onSaved();
    } catch (e: any) { setError(e?.message || 'ব্যর্থ'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">নতুন কুপন</h2>
          <button onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-3">
          <div><label className="mb-1 block text-xs font-semibold text-stone-600">কোড *</label>
            <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm uppercase outline-none focus:border-amber-400" placeholder="WELCOME10" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">টাইপ</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400">
                <option value="percentage">শতাংশ</option><option value="fixed">নির্দিষ্ট</option>
              </select></div>
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">মান *</label>
              <input type="number" value={form.value} onChange={e => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">শুরু *</label>
              <input type="date" value={form.validFrom} onChange={e => setForm({ ...form, validFrom: e.target.value })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">শেষ *</label>
              <input type="date" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">সর্বনিম্ন অর্ডার</label>
              <input type="number" value={form.minOrderAmount} onChange={e => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">ব্যবহার সীমা</label>
              <input type="number" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
          </div>
        </div>
        {error && <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>}
        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-stone-200 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">বাতিল</button>
          <button onClick={handleSave} disabled={saving || !form.code || !form.validFrom || !form.validUntil}
            className="flex-1 rounded-lg bg-amber-700 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50">
            {saving ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'সংরক্ষণ'}
          </button>
        </div>
      </div>
    </div>
  );
}
