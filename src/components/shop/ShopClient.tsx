'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { CategorySlug, FragranceFamily, Gender, Product } from '@/data/products';
import { filterAndSortProducts, type SortKey } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters, type FilterState } from './ShopFilters';
import { cn } from '@/lib/utils';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
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
    <div className="grid gap-8 lg:grid-cols-[270px_1fr] text-white">
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
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#c8a96a]/20 pb-4">
          <p className="text-sm text-[#b8b0a2]">
            <span className="font-semibold text-white">{results.length}</span>{' '}
            {results.length === 1 ? 'fragrance' : 'fragrances'}
            {query && <span className="text-[#c8a96a]"> for “{query}”</span>}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-[#c8a96a]/40 bg-[#0f0d0b] px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#c8a96a] hover:bg-[#c8a96a]/15 transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-[#c8a96a] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#090807]">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="flex items-center gap-2 text-sm text-[#b8b0a2]">
              <span className="hidden text-[#b8b0a2] sm:inline font-medium">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="h-9 w-auto rounded-xl border border-[#c8a96a]/30 bg-[#0f0d0b] px-3 py-1.5 text-xs sm:text-sm font-medium text-white focus:border-[#c8a96a] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0f0d0b] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center rounded-2xl bg-[#0f0d0b] border border-[#c8a96a]/15 p-8">
            <p className="text-[#b8b0a2]">No fragrances match your selected filters.</p>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-full bg-[#c8a96a] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090807] hover:bg-[#d4b574] transition-all"
            >
              Clear All Filters
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
            'absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-[#0d0c0a] border-r border-[#c8a96a]/30 transition-transform duration-300 ease-out shadow-2xl',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div className="flex items-center justify-between border-b border-[#c8a96a]/20 px-5 py-4">
            <h2 className="font-serif text-lg font-bold text-white">Refine Selection</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="text-[#c8a96a] hover:text-white p-1">
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
          <div className="border-t border-[#c8a96a]/20 p-4 bg-[#090807]">
            <button
              type="button"
              className="w-full rounded-xl bg-[#c8a96a] py-3 text-xs font-bold uppercase tracking-wider text-[#090807] shadow-lg hover:bg-[#d4b574] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Show {results.length} Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
