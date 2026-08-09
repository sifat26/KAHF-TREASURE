'use client';

import { useEffect, useState, useCallback } from 'react';
import { productServices } from '@/services/product.services';
import { categoryServices } from '@/services/category.services';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import {
  Plus, Pencil, Trash2, Search, X, Loader2, Upload, ImageIcon,
  ChevronLeft, ChevronRight, Star, Tag, TrendingUp, Percent
} from 'lucide-react';

const LIMIT = 15;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadProducts = useCallback(async (p = 1, q = search, cat = catFilter) => {
    setLoading(true);
    try {
      const params: any = { page: p, limit: LIMIT };
      if (q) params.search = q;
      if (cat) params.category = cat;
      const res = await productServices.getProducts(params);
      if (res.success) {
        setProducts(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setTotal(res.meta?.total || 0);
      }
    } catch { } finally { setLoading(false); }
  }, []);

  const loadCategories = async () => {
    try {
      const res = await categoryServices.getCategories();
      if (res.success) setCategories(res.data || []);
    } catch { }
  };

  useEffect(() => { loadProducts(1); loadCategories(); }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadProducts(1, search, catFilter);
    }, 350);
    return () => clearTimeout(timer);
  }, [search, catFilter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" মুছে ফেলতে চান?`)) return;
    try {
      await productServices.deleteProduct(id);
      loadProducts(page, search, catFilter);
    } catch (err: any) { alert(err?.message || 'মুছে ফেলা যায়নি'); }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    loadProducts(newPage, search, catFilter);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">পণ্য ব্যবস্থাপনা</h1>
          <p className="mt-0.5 text-sm text-stone-500">মোট {total} টি পণ্য</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 transition shadow-sm"
        >
          <Plus className="h-4 w-4" /> নতুন পণ্য
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="পণ্যের নাম, SKU দিয়ে খুঁজুন..."
            className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <select
          value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-400"
        >
          <option value="">সব ক্যাটাগরি</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
          <span className="ml-2 text-stone-400">লোড হচ্ছে...</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                  <th className="p-3">পণ্য</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">স্টক</th>
                  <th className="p-3">ট্যাগ</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const totalStock = product.variants?.reduce((s, v) => s + v.stock, 0) ?? 0;
                  const catName = typeof product.categoryId === 'object'
                    ? (product.categoryId as any)?.name
                    : categories.find(c => c._id === product.categoryId)?.name || '-';
                  const isLowStock = totalStock < (product.lowStockThreshold ?? 5) && totalStock > 0;
                  const isOutOfStock = totalStock === 0;
                  return (
                    <tr key={product._id} className="border-b border-stone-50 hover:bg-amber-50/20 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="" className="h-12 w-12 rounded-xl object-cover border border-stone-100 shadow-sm" />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                              <ImageIcon className="h-5 w-5 text-stone-300" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800 truncate max-w-[180px]">{product.title}</p>
                            <p className="text-xs text-stone-400">{product.slug}</p>
                            <div className="mt-0.5 flex gap-1">
                              {product.isFeatured && (
                                <span title="ফিচার্ড" className="inline-flex h-4 w-4 items-center justify-center rounded bg-amber-100">
                                  <Star className="h-2.5 w-2.5 text-amber-600" />
                                </span>
                              )}
                              {product.newArrival && (
                                <span title="নতুন" className="inline-flex h-4 w-4 items-center justify-center rounded bg-blue-100">
                                  <TrendingUp className="h-2.5 w-2.5 text-blue-600" />
                                </span>
                              )}
                              {product.isOnOffer && (
                                <span title="অফারে" className="inline-flex h-4 w-4 items-center justify-center rounded bg-red-100">
                                  <Percent className="h-2.5 w-2.5 text-red-600" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{catName}</span>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-stone-900">৳{product.basePrice.toLocaleString()}</p>
                        {Boolean(product.compareAtPrice) && Number(product.compareAtPrice) > product.basePrice && (
                          <p className="text-xs text-stone-400 line-through">৳{product.compareAtPrice.toLocaleString()}</p>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`font-semibold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {totalStock}
                        </span>
                        {isOutOfStock && <p className="text-[10px] text-red-400">স্টক শেষ</p>}
                        {isLowStock && <p className="text-[10px] text-amber-500">কম স্টক</p>}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1 max-w-[120px]">
                          {(product.tags || []).slice(0, 2).map(tag => (
                            <span key={tag} className="flex items-center gap-0.5 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500">
                              <Tag className="h-2.5 w-2.5" />{tag}
                            </span>
                          ))}
                          {(product.tags?.length || 0) > 2 && (
                            <span className="text-[10px] text-stone-400">+{(product.tags?.length || 0) - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${product.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-stone-50 text-stone-500 border-stone-200'}`}>
                          {product.isActive ? '● সক্রিয়' : '○ নিষ্ক্রিয়'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setEditingProduct(product); setShowModal(true); }}
                            className="rounded-lg p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-700 transition"
                            title="এডিট"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id, product.title)}
                            className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 transition"
                            title="মুছুন"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && !loading && (
              <div className="py-16 text-center">
                <ImageIcon className="mx-auto mb-3 h-10 w-10 text-stone-200" />
                <p className="text-stone-400">কোনো পণ্য পাওয়া যায়নি</p>
                {(search || catFilter) && (
                  <button onClick={() => { setSearch(''); setCatFilter(''); }}
                    className="mt-2 text-sm text-amber-700 hover:underline">
                    ফিল্টার সাফ করুন
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40 transition"
              >
                <ChevronLeft className="h-4 w-4" /> আগে
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + Math.max(1, page - 2);
                  if (p > totalPages) return null;
                  return (
                    <button key={p} onClick={() => handlePageChange(p)}
                      className={`h-8 w-8 rounded-lg text-sm font-medium transition ${p === page ? 'bg-amber-700 text-white' : 'border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
                      {p}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40 transition"
              >
                পরে <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); loadProducts(page, search, catFilter); }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, categories, onClose, onSaved }: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: product?.title || '',
    slug: product?.slug || '',
    description: product?.description || '',
    categoryId: typeof product?.categoryId === 'object'
      ? (product?.categoryId as any)?._id || ''
      : product?.categoryId || '',
    basePrice: product?.basePrice ?? 0,
    compareAtPrice: product?.compareAtPrice ?? 0,
    brand: product?.brand || '',
    tags: (product?.tags || []).join(', '),
    sku: product?.sku || '',
    isActive: product?.isActive ?? true,
    newArrival: product?.newArrival ?? false,
    isFeatured: product?.isFeatured ?? false,
    isOnOffer: product?.isOnOffer ?? false,
    productOrder: product?.productOrder ?? 0,
    lowStockThreshold: product?.lowStockThreshold ?? 5,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [variants, setVariants] = useState(
    product?.variants?.map(v => ({
      label: v.label,
      stock: v.stock,
      priceOverride: v.priceOverride || 0,
      sku: v.sku || '',
    })) || [{ label: '3ml', stock: 0, priceOverride: 0, sku: '' }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (files: FileList) => {
    const fileArr = Array.from(files);
    setUploading(true);
    setUploadProgress(`0 / ${fileArr.length} আপলোড হচ্ছে...`);
    const uploaded: string[] = [];
    try {
      for (let i = 0; i < fileArr.length; i++) {
        setUploadProgress(`${i + 1} / ${fileArr.length} আপলোড হচ্ছে...`);
        const url = await productServices.uploadImage(fileArr[i]);
        uploaded.push(url);
      }
      setImageUrls(prev => [...prev, ...uploaded]);
    } catch (err: any) {
      alert(err?.message || 'ছবি আপলোড ব্যর্থ');
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('পণ্যের নাম প্রয়োজন'); return; }
    if (!form.categoryId) { setError('ক্যাটাগরি নির্বাচন করুন'); return; }
    if (form.basePrice <= 0) { setError('মূল দাম সঠিকভাবে লিখুন'); return; }

    setSaving(true); setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || undefined,
        description: form.description || undefined,
        categoryId: form.categoryId,
        basePrice: Number(form.basePrice),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
        images: imageUrls,
        sku: form.sku.trim() || undefined,
        brand: form.brand.trim() || undefined,
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
        isActive: form.isActive,
        newArrival: form.newArrival,
        isFeatured: form.isFeatured,
        isOnOffer: form.isOnOffer,
        productOrder: Number(form.productOrder),
        lowStockThreshold: Number(form.lowStockThreshold),
        variants: variants
          .filter(v => v.label.trim())
          .map(v => ({
            label: v.label.trim(),
            stock: Number(v.stock),
            priceOverride: v.priceOverride ? Number(v.priceOverride) : undefined,
            sku: v.sku.trim() || undefined,
          })),
      };
      if (product) {
        await productServices.updateProduct(product._id, payload);
      } else {
        await productServices.createProduct(payload);
      }
      onSaved();
    } catch (err: any) {
      setError(err?.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-stone-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-stone-900">
            {product ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="শিরোনাম *" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="পণ্যের নাম লিখুন" />
            <FormInput label="স্লাগ (অটো)" value={form.slug} onChange={v => setForm({ ...form, slug: v })} placeholder="auto-generated" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-stone-600">বিবরণ</label>
            <textarea
              rows={3} value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="পণ্যের বিস্তারিত বিবরণ..."
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-stone-600">ক্যাটাগরি *</label>
              <select
                value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              >
                <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <FormInput label="ব্র্যান্ড" value={form.brand} onChange={v => setForm({ ...form, brand: v })} placeholder="যেমন: KAHF, OUD House" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <FormInput label="মূল দাম (৳) *" type="number" value={String(form.basePrice)} onChange={v => setForm({ ...form, basePrice: Number(v) })} />
            <FormInput label="তুলনামূলক দাম (৳)" type="number" value={String(form.compareAtPrice)} onChange={v => setForm({ ...form, compareAtPrice: Number(v) })} />
            <FormInput label="SKU" value={form.sku} onChange={v => setForm({ ...form, sku: v })} placeholder="PROD-001" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="ট্যাগ (কমা দিয়ে আলাদা)" value={form.tags} onChange={v => setForm({ ...form, tags: v })} placeholder="bestseller, fresh, men" />
            <div className="grid grid-cols-2 gap-3">
              <FormInput label="সর্টিং ক্রম" type="number" value={String(form.productOrder)} onChange={v => setForm({ ...form, productOrder: Number(v) })} />
              <FormInput label="কম স্টক সীমা" type="number" value={String(form.lowStockThreshold)} onChange={v => setForm({ ...form, lowStockThreshold: Number(v) })} />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600">পণ্যের ছবি (Cloudinary)</label>
            <div className="flex flex-wrap gap-3">
              {imageUrls.map((url, i) => (
                <div key={i} className="relative h-20 w-20 group">
                  <img src={url} alt="" className="h-20 w-20 rounded-xl border border-stone-200 object-cover shadow-sm" />
                  {/* Primary badge */}
                  {i === 0 && (
                    <span className="absolute bottom-0.5 left-0.5 rounded bg-amber-600/90 px-1 py-0.5 text-[8px] font-bold text-white">মূল</span>
                  )}
                  <button
                    onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Upload button */}
              <label className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${uploading ? 'border-amber-300 bg-amber-50' : 'border-stone-300 text-stone-400 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50'}`}>
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
                    <span className="mt-1 text-[9px] text-amber-600 text-center px-1">{uploadProgress}</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span className="mt-1 text-[10px]">আপলোড</span>
                  </>
                )}
                <input
                  type="file" accept="image/*" multiple className="hidden"
                  onChange={e => e.target.files && handleImageUpload(e.target.files)}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="mt-1.5 text-xs text-stone-400">
              প্রথম ছবিটি মূল ছবি হিসেবে দেখানো হবে। সর্বোচ্চ 10MB প্রতি ছবি।
            </p>
          </div>

          {/* Variants */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-600">ভ্যারিয়েন্ট (সাইজ ও স্টক)</label>
              <button
                onClick={() => setVariants([...variants, { label: '', stock: 0, priceOverride: 0, sku: '' }])}
                className="text-xs font-semibold text-amber-700 hover:underline"
              >
                + ভ্যারিয়েন্ট যোগ করুন
              </button>
            </div>
            <div className="space-y-2">
              {variants.map((v, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text" placeholder="লেবেল (3ml, S, M)" value={v.label}
                    onChange={e => { const nv = [...variants]; nv[i].label = e.target.value; setVariants(nv); }}
                    className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                  />
                  <input
                    type="number" placeholder="স্টক" value={v.stock} min={0}
                    onChange={e => { const nv = [...variants]; nv[i].stock = Number(e.target.value); setVariants(nv); }}
                    className="w-20 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                  />
                  <input
                    type="number" placeholder="দাম (৳)" value={v.priceOverride} min={0}
                    onChange={e => { const nv = [...variants]; nv[i].priceOverride = Number(e.target.value); setVariants(nv); }}
                    className="w-24 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}
                    className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 rounded-xl bg-stone-50 p-3">
            {[
              { key: 'isActive', label: 'সক্রিয়', emoji: '✓' },
              { key: 'newArrival', label: 'নতুন এসেছে', emoji: '🆕' },
              { key: 'isFeatured', label: 'ফিচার্ড', emoji: '⭐' },
              { key: 'isOnOffer', label: 'অফারে', emoji: '%' },
            ].map(f => (
              <label key={f.key} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-stone-600 hover:bg-white transition">
                <input
                  type="checkbox"
                  checked={(form as any)[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.checked })}
                  className="h-4 w-4 accent-amber-700"
                />
                <span>{f.emoji}</span>
                {f.label}
              </label>
            ))}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-2.5 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 rounded-lg border border-stone-200 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition">
              বাতিল
            </button>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 rounded-lg bg-amber-700 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? 'সংরক্ষণ হচ্ছে...' : product ? 'আপডেট করুন' : 'পণ্য যোগ করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-stone-600">{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
    </div>
  );
}
