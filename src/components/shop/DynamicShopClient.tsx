'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { productServices } from '@/services/product.services';
import { categoryServices } from '@/services/category.services';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { DynamicProductCard } from '@/components/product/DynamicProductCard';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toBanglaDigits } from '@/lib/format';

const PAGE_SIZE = 12;

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'জনপ্রিয়' },
  { value: 'newest', label: 'নতুন' },
  { value: 'price-asc', label: 'দাম: কম → বেশি' },
  { value: 'price-desc', label: 'দাম: বেশি → কম' },
  { value: 'name', label: 'নাম অনুযায়ী' },
];

const GENDER_OPTIONS = [
  { value: 'men', label: 'পুরুষদের' },
  { value: 'women', label: 'নারীদের' },
  { value: 'unisex', label: 'সবার জন্য (Unisex)' },
];

const FAMILY_OPTIONS = [
  { value: 'fresh', label: 'ফ্রেশ / সজীব' },
  { value: 'aquatic', label: 'অ্যাকুয়াটিক' },
  { value: 'oud', label: 'উদ (Oud)' },
  { value: 'floral', label: 'ফুলেল (Floral)' },
  { value: 'fruity', label: 'ফলের সুবাস' },
  { value: 'woody', label: 'উডি / কাঠ' },
  { value: 'spicy', label: 'স্পাইসি' },
  { value: 'oriental', label: 'অ্যারাবিয়ান' },
];

export function DynamicShopClient({ searchQuery, categoryFilter }: { searchQuery?: string; categoryFilter?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchQuery || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFilter ? [categoryFilter] : []);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await categoryServices.getCategories();
      if (res.success) setCategories(res.data || []);
    } catch {}
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { limit: PAGE_SIZE, page };
      if (search) params.search = search;
      if (selectedCategories.length > 0) params.category = selectedCategories.join(',');
      if (selectedFamilies.length > 0) params.tags = selectedFamilies.join(',');
      if (maxPrice < 2500) params.maxPrice = maxPrice;
      if (inStockOnly) params.isActive = true;

      // Handle sort order without filtering out non-featured products
      if (sort === 'price-asc') params.sort = 'basePrice';
      if (sort === 'price-desc') params.sort = '-basePrice';
      if (sort === 'newest') params.sort = '-createdAt';
      if (sort === 'name') params.sort = 'title';

      const res = await productServices.getProducts(params);
      if (res.success) {
        let list = res.data || [];

        // Client-side gender filtering if tags or attributes contain gender
        if (selectedGenders.length > 0) {
          list = list.filter(p => {
            const g = (p.attributes as any)?.gender || '';
            const t = p.tags || [];
            return selectedGenders.some(gen => g.toLowerCase() === gen || t.includes(gen));
          });
        }

        // Client-side sort by featured or name if selected
        if (sort === 'featured') {
          list = [...list].sort((a, b) => Number(b.isFeatured || false) - Number(a.isFeatured || false));
        }
        if (sort === 'name') {
          list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'bn'));
        }

        setProducts(list);
        setTotal(res.meta?.total || list.length);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategories, selectedFamilies, selectedGenders, maxPrice, inStockOnly, sort, page]);

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadProducts(), 300);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, selectedCategories, selectedGenders, selectedFamilies, maxPrice, inStockOnly, sort]);

  const activeCount =
    selectedCategories.length +
    selectedGenders.length +
    selectedFamilies.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 2500 ? 1 : 0);

  const resetAll = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedFamilies([]);
    setMaxPrice(2500);
    setInStockOnly(false);
    setSort('featured');
    setPage(1);
  };

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const FilterContent = (
    <div className="flex flex-col gap-6 p-5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] shadow-md text-[var(--color-text-primary)]">
      {/* Category filter */}
      <div>
        <h3 className="mb-3 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[var(--color-gold)]">ক্যাটাগরি</h3>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <label key={cat._id} className="flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat._id)}
                onChange={() => setSelectedCategories(toggleArray(selectedCategories, cat._id))}
                className="h-4 w-4 rounded border-[var(--color-border)] accent-amber-700 cursor-pointer"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender filter */}
      <div>
        <h3 className="mb-3 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[var(--color-gold)]">কার জন্য</h3>
        <div className="flex flex-col gap-2">
          {GENDER_OPTIONS.map(opt => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              <input
                type="checkbox"
                checked={selectedGenders.includes(opt.value)}
                onChange={() => setSelectedGenders(toggleArray(selectedGenders, opt.value))}
                className="h-4 w-4 rounded border-[var(--color-border)] accent-amber-700 cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance Family filter */}
      <div>
        <h3 className="mb-3 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[var(--color-gold)]">ঘ্রাণের ধরন (Fragrance Family)</h3>
        <div className="flex flex-wrap gap-1.5">
          {FAMILY_OPTIONS.map(fam => {
            const active = selectedFamilies.includes(fam.value);
            return (
              <button
                key={fam.value}
                onClick={() => setSelectedFamilies(toggleArray(selectedFamilies, fam.value))}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200',
                  active
                    ? 'border-[var(--color-gold)] bg-amber-700 text-white font-bold shadow-md'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {fam.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[var(--color-gold)]">সর্বোচ্চ দাম</h3>
          <span className="text-xs font-bold text-amber-700">৳{maxPrice}</span>
        </div>
        <input
          type="range"
          min={100}
          max={2500}
          step={50}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-700 cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-[0.65rem] text-[var(--color-text-tertiary)]">
          <span>৳১০০</span>
          <span>৳২,৫০০+</span>
        </div>
      </div>

      {/* In stock check */}
      <div>
        <label className="flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--color-border)] accent-amber-700 cursor-pointer"
          />
          <span>শুধু স্টকে থাকা পণ্য</span>
        </label>
      </div>

      {/* Reset button */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center justify-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors pt-2 border-t border-[var(--color-border)] w-full"
        >
          <RotateCcw size={13} /> সব ফিল্টার রিসেট করুন ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[270px_1fr] text-[var(--color-text-primary)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[100px]">
          {FilterContent}
        </div>
      </aside>

      <div>
        {/* Top Search + Sort Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
          {/* Search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="আতর, নোটস দিয়ে খুঁজুন..."
              className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-background)] px-4 py-2 text-xs font-bold text-[var(--color-gold)] hover:bg-amber-50 shadow-sm"
            >
              <SlidersHorizontal size={14} />
              ফিল্টার
              {activeCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="hidden text-[var(--color-text-secondary)] sm:inline font-medium">সাজান:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="h-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)] cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <p className="mb-4 text-xs sm:text-sm text-[var(--color-text-secondary)]">
          মোট <span className="font-bold text-[var(--color-text-primary)]">{total}</span> টি আতর পাওয়া গিয়েছে
          {search && <span className="text-amber-700"> — “{search}”</span>}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                <div className="aspect-[4/5] rounded-xl bg-stone-200 dark:bg-stone-800" />
                <div className="mt-3 h-4 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="mt-2 h-3 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <p className="text-base font-semibold text-[var(--color-text-secondary)]">কোনো আতর পাওয়া যায়নি</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">ফিল্টার পরিবর্তন করে আবার খুঁজুন</p>
            <button
              onClick={resetAll}
              className="mt-2 rounded-full bg-amber-700 px-6 py-2 text-xs font-bold text-white hover:bg-amber-800 transition shadow"
            >
              সব ফিল্টার সাফ করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
              <DynamicProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40"
            >
              ← আগে
            </button>
            <span className="px-4 text-sm font-semibold text-[var(--color-text-primary)]">
              পৃষ্ঠা {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40"
            >
              পরে →
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="relative flex w-[85%] max-w-sm flex-col bg-[var(--color-background)] p-5 overflow-y-auto shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <h2 className="font-serif text-lg font-bold text-[var(--color-text-primary)]">ফিল্টার</h2>
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100">
                <X size={20} />
              </button>
            </div>
            {FilterContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-4 w-full rounded-xl bg-amber-700 py-3 text-xs font-bold text-white shadow-lg"
            >
              {total}টি আতর দেখুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
