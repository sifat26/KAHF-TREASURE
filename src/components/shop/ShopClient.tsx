'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { CategorySlug, FragranceFamily, Gender, Product } from '@/data/products';
import { toBanglaDigits } from '@/lib/format';
import { filterAndSortProducts, type SortKey } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters, type FilterState } from './ShopFilters';
import { cn } from '@/lib/utils';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'জনপ্রিয়' },
  { value: 'newest', label: 'নতুন' },
  { value: 'price-asc', label: 'দাম: কম → বেশি' },
  { value: 'price-desc', label: 'দাম: বেশি → কম' },
  { value: 'name', label: 'নাম অনুযায়ী' },
];

export function ShopClient({
  allProducts,
  families,
  priceCeiling,
  initialCategory,
  initialQuery,
}: {
  allProducts: Product[];
  families: FragranceFamily[];
  priceCeiling: number;
  initialCategory?: CategorySlug;
  initialQuery?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emptyFilters: FilterState = React.useMemo(
    () => ({
      categories: initialCategory ? [initialCategory] : [],
      genders: [],
      families: [],
      maxPrice: priceCeiling,
      inStockOnly: false,
    }),
    [initialCategory, priceCeiling],
  );

  const [filters, setFilters] = React.useState<FilterState>(emptyFilters);
  const [sort, setSort] = React.useState<SortKey>('featured');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const query = searchParams.get('q') ?? initialQuery ?? '';

  const results = React.useMemo(
    () =>
      filterAndSortProducts(allProducts, {
        query,
        categories: filters.categories,
        genders: filters.genders as Gender[],
        families: filters.families,
        maxPrice: filters.maxPrice < priceCeiling ? filters.maxPrice : undefined,
        inStockOnly: filters.inStockOnly,
        sort,
      }),
    [allProducts, query, filters, sort, priceCeiling],
  );

  const activeCount =
    filters.categories.length +
    filters.genders.length +
    filters.families.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.maxPrice < priceCeiling ? 1 : 0);

  function resetAll() {
    setFilters({ categories: [], genders: [], families: [], maxPrice: priceCeiling, inStockOnly: false });
    router.replace('/shop');
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[270px_1fr] text-[var(--color-text-primary)]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[100px]">
          <ShopFilters
            state={filters}
            onChange={setFilters}
            families={families}
            priceCeiling={priceCeiling}
            onReset={resetAll}
          />
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-accent)]/20 pb-4">
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <span className="font-semibold text-[var(--color-text-primary)]">{toBanglaDigits(results.length)}</span>টি
            আতর
            {query && <span className="text-[var(--color-accent)]"> — “{query}”-এর জন্য</span>}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)] px-3.5 py-2 text-xs font-semibold tracking-[0.04em] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/15 transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal size={15} />
              ফিল্টার
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-[var(--color-accent)] px-1.5 py-0.5 text-[0.65rem] font-bold text-[var(--color-background-deep)]">
                  {toBanglaDigits(activeCount)}
                </span>
              )}
            </button>

            <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="hidden text-[var(--color-text-secondary)] sm:inline font-medium">সাজান</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="সুগন্ধি সাজান"
                className="h-9 w-auto rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-background)] px-3 py-1.5 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center rounded-2xl bg-[var(--color-background)] border border-[var(--color-accent)]/15 p-8">
            <p className="text-[var(--color-text-secondary)]">এই ফিল্টারে কোনো আতর পাওয়া গেল না। ফিল্টার বদলে আবার দেখুন।</p>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-xs font-bold tracking-[0.04em] text-[var(--color-background-deep)] hover:bg-[var(--color-accent-hover)] transition-all"
            >
              সব ফিল্টার মুছে ফেলুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn('fixed inset-0 z-[70] lg:hidden', mobileOpen ? '' : 'pointer-events-none')}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            'absolute inset-0 bg-[var(--t-scrim)] backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-[var(--color-background-deep)] border-r border-[var(--color-accent)]/30 transition-transform duration-300 ease-out shadow-2xl',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-label="ফিল্টার"
        >
          <div className="flex items-center justify-between border-b border-[var(--color-accent)]/20 px-5 py-4">
            <h2 className="font-serif text-lg font-bold text-[var(--color-text-primary)]">ফিল্টার</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="ফিল্টার বন্ধ করুন" className="text-[var(--color-accent)] hover:text-[var(--color-text-primary)] p-1">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <ShopFilters
              state={filters}
              onChange={setFilters}
              families={families}
              priceCeiling={priceCeiling}
              onReset={resetAll}
            />
          </div>
          <div className="border-t border-[var(--color-accent)]/20 p-4 bg-[var(--color-background-deep)]">
            <button
              type="button"
              className="w-full rounded-xl bg-[var(--color-accent)] py-3 text-xs font-bold tracking-[0.04em] text-[var(--color-background-deep)] shadow-lg hover:bg-[var(--color-accent-hover)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {toBanglaDigits(results.length)}টি আতর দেখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
