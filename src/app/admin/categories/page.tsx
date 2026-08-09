'use client';

import { useEffect, useState } from 'react';
import { categoryServices } from '@/services/category.services';
import type { Category } from '@/types/category';
import { Plus, Pencil, Trash2, X, Loader2, FolderTree, Upload, ImageIcon, ChevronRight } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  attar: 'আতর',
  product: 'প্রোডাক্ট',
  book: 'বই',
  clothing: 'পোশাক',
  other: 'অন্যান্য',
};

const TYPE_COLORS: Record<string, string> = {
  attar: 'bg-amber-100 text-amber-700',
  product: 'bg-blue-100 text-blue-700',
  book: 'bg-emerald-100 text-emerald-700',
  clothing: 'bg-purple-100 text-purple-700',
  other: 'bg-stone-100 text-stone-600',
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [typeFilter, setTypeFilter] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await categoryServices.getCategories();
      if (res.success) setCategories(res.data || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('এই ক্যাটাগরি মুছে ফেলতে চান? এর অন্তর্গত পণ্যগুলো প্রভাবিত হবে।')) return;
    try {
      await categoryServices.deleteCategory(id);
      load();
    } catch (e: any) { alert(e?.message || 'মুছে ফেলা যায়নি'); }
  };

  const filtered = typeFilter ? categories.filter(c => c.type === typeFilter) : categories;

  // Group: parent cats and sub-cats
  const parentCats = filtered.filter(c => !c.parentId);
  const subCats = filtered.filter(c => !!c.parentId);

  const getParentName = (parentId: string | null | undefined) => {
    if (!parentId) return null;
    const parent = categories.find(c => c._id === parentId);
    return parent?.name || null;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">ক্যাটাগরি ব্যবস্থাপনা</h1>
          <p className="mt-0.5 text-sm text-stone-500">মোট {categories.length} টি ক্যাটাগরি</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition"
        >
          <Plus className="h-4 w-4" /> নতুন ক্যাটাগরি
        </button>
      </div>

      {/* Type filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setTypeFilter('')}
          className={`rounded-full px-3 py-1 text-xs font-medium border transition ${!typeFilter ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300'}`}>
          সব
        </button>
        {Object.entries(TYPE_LABELS).map(([key, label]) => (
          <button key={key} onClick={() => setTypeFilter(key)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition ${typeFilter === key ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
          <span className="ml-2 text-stone-400">লোড হচ্ছে...</span>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Parent categories */}
          {parentCats.map(cat => {
            const children = subCats.filter(c => c.parentId === cat._id);
            return (
              <div key={cat._id} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {/* Category image or icon */}
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="h-12 w-12 rounded-xl object-cover border border-stone-100" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-100">
                        <FolderTree className="h-6 w-6 text-amber-600" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-stone-800">{cat.name}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TYPE_COLORS[cat.type] || 'bg-stone-100 text-stone-600'}`}>
                          {TYPE_LABELS[cat.type] || cat.type}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                          {cat.isActive ? '● সক্রিয়' : '○ নিষ্ক্রিয়'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">/{cat.slug}</p>
                      {cat.description && <p className="text-xs text-stone-500 mt-0.5 max-w-sm truncate">{cat.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="mr-2 text-xs text-stone-400">{children.length} সাব-ক্যাটাগরি</span>
                    <button
                      onClick={() => { setEditing(cat); setShowModal(true); }}
                      className="rounded-lg p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-700 transition"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-categories */}
                {children.length > 0 && (
                  <div className="border-t border-stone-100 bg-stone-50 px-4 py-2 space-y-1">
                    {children.map(child => (
                      <div key={child._id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white transition">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-stone-400" />
                          {child.image ? (
                            <img src={child.image} alt={child.name} className="h-7 w-7 rounded-lg object-cover border border-stone-100" />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                              <FolderTree className="h-3.5 w-3.5 text-stone-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-stone-700">{child.name}</p>
                            <p className="text-[10px] text-stone-400">/{child.slug}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => { setEditing(child); setShowModal(true); }}
                            className="rounded-lg p-1.5 text-stone-400 hover:bg-amber-50 hover:text-amber-700 transition">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDelete(child._id)}
                            className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 transition">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Orphan sub-cats (parent not visible due to filter) */}
          {subCats.filter(c => !parentCats.find(p => p._id === c.parentId)).map(cat => (
            <div key={cat._id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-center gap-3">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50"><FolderTree className="h-5 w-5 text-stone-400" /></div>
                )}
                <div>
                  <p className="font-medium text-stone-800">{cat.name}</p>
                  <p className="text-xs text-stone-400">
                    {getParentName(cat.parentId) && <span className="text-amber-600">{getParentName(cat.parentId)} → </span>}
                    /{cat.slug}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(cat); setShowModal(true); }} className="rounded-lg p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-700">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(cat._id)} className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center rounded-2xl border border-stone-200 bg-white">
              <FolderTree className="mx-auto mb-3 h-10 w-10 text-stone-200" />
              <p className="text-stone-400">কোনো ক্যাটাগরি পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <CategoryModal
          category={editing}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); load(); }}
        />
      )}
    </div>
  );
}

function CategoryModal({ category, categories, onClose, onSaved }: {
  category: Category | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    type: category?.type || 'attar',
    // Fix: use undefined (not null/empty-string) for no parent — Zod expects string | undefined
    parentId: (category?.parentId as string) || '',
    order: category?.order ?? 0,
    isActive: category?.isActive ?? true,
  });
  const [imageUrl, setImageUrl] = useState<string>(category?.image || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (files: FileList) => {
    if (!files[0]) return;
    setUploading(true);
    try {
      const url = await categoryServices.uploadCategoryImage(files[0]);
      setImageUrl(url);
    } catch (err: any) {
      alert(err?.message || 'ছবি আপলোড ব্যর্থ');
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('নাম প্রয়োজন'); return; }
    setSaving(true); setError(null);
    try {
      const payload = {
        name: form.name.trim(),
        // Only include slug if the user typed something
        ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
        description: form.description || undefined,
        type: form.type as any,
        // Fix: send undefined (not null) when no parent selected — Zod z.string().optional() requires this
        parentId: form.parentId || undefined,
        order: Number(form.order),
        isActive: form.isActive,
        // Only include image if one was uploaded
        ...(imageUrl ? { image: imageUrl } : {}),
      };
      if (category) {
        await categoryServices.updateCategory(category._id, payload);
      } else {
        await categoryServices.createCategory(payload);
      }
      onSaved();
    } catch (e: any) {
      setError(e?.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    } finally { setSaving(false); }
  };

  // Exclude self and descendants from parent options to prevent cycles
  const parentOptions = categories.filter(c => c._id !== category?._id && c.parentId !== category?._id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-stone-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-stone-900">
            {category ? 'ক্যাটাগরি এডিট' : 'নতুন ক্যাটাগরি'}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Category Image Upload */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600">ক্যাটাগরি ছবি</label>
            <div className="flex items-center gap-4">
              {imageUrl ? (
                <div className="relative group">
                  <img src={imageUrl} alt="" className="h-20 w-20 rounded-xl object-cover border border-stone-200" />
                  <button
                    onClick={() => setImageUrl('')}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-stone-50 border-2 border-dashed border-stone-200">
                  <ImageIcon className="h-7 w-7 text-stone-300" />
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:border-amber-400 transition">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin text-amber-600" /> : <Upload className="h-4 w-4" />}
                {uploading ? 'আপলোড হচ্ছে...' : 'ছবি আপলোড'}
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files && handleImageUpload(e.target.files)}
                  disabled={uploading} />
              </label>
            </div>
            <p className="mt-1.5 text-xs text-stone-400">Cloudinary-তে আপলোড হবে। প্রস্তাবিত: 400×400 px</p>
          </div>

          {/* Name & Slug */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-stone-600">নাম <span className="text-red-500">*</span></label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="যেমন: আতর, বই, পোশাক"
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-stone-600">স্লাগ <span className="text-stone-400">(অটো)</span></label>
              <input
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="attar, books, clothing..."
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-stone-600">বিবরণ</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="ক্যাটাগরির সংক্ষিপ্ত বিবরণ..."
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
            />
          </div>

          {/* Type & Parent */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-stone-600">ধরন</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as any })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              >
                <option value="attar">আতর</option>
                <option value="product">প্রোডাক্ট</option>
                <option value="book">বই</option>
                <option value="clothing">পোশাক</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-stone-600">প্যারেন্ট ক্যাটাগরি</label>
              <select
                value={form.parentId}
                onChange={e => setForm({ ...form, parentId: e.target.value })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              >
                <option value="">— কোনোটি না —</option>
                {parentOptions.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Order & Active */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-stone-600">সর্টিং ক্রম</label>
              <input
                type="number"
                value={form.order}
                onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2 pt-5 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                className="h-4 w-4 accent-amber-700 cursor-pointer"
              />
              সক্রিয়
            </label>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-2.5 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-stone-200 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
            >
              বাতিল
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.name.trim() || uploading}
              className="flex-1 rounded-lg bg-amber-700 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
