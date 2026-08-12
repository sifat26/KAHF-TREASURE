'use client';

import { useEffect, useState } from 'react';
import { bannerServices } from '@/services/banner.services';
import type { Banner } from '@/types/banner';
import { Plus, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const res = await bannerServices.getBanners(); if (res.success) setBanners(res.data || []); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('এই ব্যানার মুছে ফেলতে চান?')) return;
    try { await bannerServices.deleteBanner(id); load(); }
    catch (e: any) { alert(e?.message || 'ব্যর্থ'); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">ব্যানার ব্যবস্থাপনা</h1>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 shadow-sm transition">
          <Plus className="h-4 w-4" /> নতুন ব্যানার
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-stone-400">লোড হচ্ছে...</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map(banner => (
            <div key={banner._id} className="rounded-2xl border border-stone-200 bg-white p-4">
              {banner.image ? (
                <img src={banner.image} alt="" className="mb-3 h-32 w-full rounded-xl object-cover" />
              ) : (
                <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-stone-100">
                  <ImageIcon className="h-8 w-8 text-stone-300" />
                </div>
              )}
              <p className="font-semibold text-stone-800">{banner.title || 'শিরোনামহীন'}</p>
              {banner.subtitle && <p className="text-xs text-stone-500">{banner.subtitle}</p>}
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">
                  {banner.position}
                </span>
                <button onClick={() => handleDelete(banner._id)}
                  className="rounded-lg p-1.5 text-stone-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {banners.length === 0 && <div className="col-span-full py-10 text-center text-stone-400">কোনো ব্যানার নেই</div>}
        </div>
      )}

      {showModal && <BannerModal onClose={() => setShowModal(false)} onSaved={() => { setShowModal(false); load(); }} />}
    </div>
  );
}

function BannerModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: '', subtitle: '', image: '', linkUrl: '', buttonText: '',
    position: 'hero' as 'hero' | 'promo' | 'popup', order: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await bannerServices.createBanner({
        ...form, order: Number(form.order), isActive: true,
      });
      onSaved();
    } catch (e: any) { alert(e?.message || 'ব্যর্থ'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">নতুন ব্যানার</h2>
          <button onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-3">
          <div><label className="mb-1 block text-xs font-semibold text-stone-600">শিরোনাম</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-stone-600">সাবটাইটেল</label>
            <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-stone-600">ছবি URL</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-stone-600">লিংক URL</label>
            <input value={form.linkUrl} onChange={e => setForm({ ...form, linkUrl: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">পজিশন</label>
              <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value as any })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20">
                <option value="hero">হিরো</option><option value="promo">প্রোমো</option><option value="popup">পপআপ</option>
              </select></div>
            <div><label className="mb-1 block text-xs font-semibold text-stone-600">অর্ডার</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" /></div>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-stone-200 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50">বাতিল</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition shadow-sm">
            {saving ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'সংরক্ষণ'}
          </button>
        </div>
      </div>
    </div>
  );
}
