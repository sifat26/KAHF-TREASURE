'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { CategorySlug, FragranceFamily, Gender, Product } from '@/data/products';
import { filterAndSortProducts, type SortKey } from '@/lib/products';
import { Select } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
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

  // Search term is owned by the URL (set via the search overlay), so we derive
  // it rather than mirroring into state — keeps results shareable and avoids a
  // sync effect.
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
    // Clearing the URL query also resets the derived search term.
    router.replace('/shop');
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
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
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">{results.length}</span>{' '}
            {results.length === 1 ? 'fragrance' : 'fragrances'}
            {query && <span> for “{query}”</span>}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-ink px-1.5 text-[0.65rem] text-white">
                  {activeCount}
                </span>
              )}
            </Button>

            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted sm:inline">Sort</span>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="h-9 w-auto min-w-[9rem] text-sm"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </label>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-muted">No fragrances match your filters.</p>
            <Button variant="secondary" onClick={resetAll}>
              Clear filters
            </Button>
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
            'absolute inset-0 bg-ink/30 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-canvas transition-transform duration-300 ease-[var(--ease-lux)]',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-lg text-ink">Filters</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="text-muted hover:text-ink">
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
          <div className="border-t border-line p-4">
            <Button full onClick={() => setMobileOpen(false)}>
              Show {results.length} results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
