'use client';

import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import type { CategorySlug, FragranceFamily, Gender } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

export interface FilterState {
  categories: CategorySlug[];
  genders: Gender[];
  families: FragranceFamily[];
  maxPrice: number;
  inStockOnly: boolean;
}

const CATEGORY_OPTIONS: { value: CategorySlug; label: string }[] = [
  { value: 'most-wanted', label: 'Most Wanted' },
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'oud', label: 'Oud' },
  { value: 'floral', label: 'Floral' },
  { value: 'fruit', label: 'Fruity' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
];

/** Filter panel shared by the desktop sidebar and the mobile drawer. */
export function ShopFilters({
  state,
  onChange,
  families,
  priceCeiling,
  onReset,
  className,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
  families: FragranceFamily[];
  priceCeiling: number;
  onReset: () => void;
  className?: string;
}) {
  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className={cn('flex flex-col gap-7 p-5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-accent)]/20 shadow-xl text-[var(--color-text-primary)]', className)}>
      <FilterGroup title="Category">
        <div className="flex flex-col gap-2.5">
          {CATEGORY_OPTIONS.map((opt) => (
            <CheckRow
              key={opt.value}
              label={opt.label}
              checked={state.categories.includes(opt.value)}
              onChange={() => onChange({ ...state, categories: toggle(state.categories, opt.value) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Gender">
        <div className="flex flex-col gap-2.5">
          {GENDER_OPTIONS.map((opt) => (
            <CheckRow
              key={opt.value}
              label={opt.label}
              checked={state.genders.includes(opt.value)}
              onChange={() => onChange({ ...state, genders: toggle(state.genders, opt.value) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Fragrance Family">
        <div className="flex flex-wrap gap-2">
          {families.map((fam) => {
            const active = state.families.includes(fam);
            return (
              <button
                key={fam}
                onClick={() => onChange({ ...state, families: toggle(state.families, fam) })}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs capitalize transition-all duration-200',
                  active
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-background-deep)] font-bold shadow-md'
                    : 'border-[var(--color-accent)]/30 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] bg-[var(--color-background-deep)]',
                )}
              >
                {fam}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title={`Max Price · ${formatPrice(state.maxPrice)}`}>
        <input
          type="range"
          min={100}
          max={priceCeiling}
          step={50}
          value={state.maxPrice}
          onChange={(e) => onChange({ ...state, maxPrice: Number(e.target.value) })}
          className="w-full accent-[var(--color-accent)] cursor-pointer"
          aria-label="Maximum starting price"
        />
        <div className="mt-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>{formatPrice(100)}</span>
          <span>{formatPrice(priceCeiling)}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckRow
          label="In stock only"
          checked={state.inStockOnly}
          onChange={() => onChange({ ...state, inStockOnly: !state.inStockOnly })}
        />
      </FilterGroup>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-strong)] transition-colors pt-2 border-t border-[var(--color-accent)]/15 w-full"
      >
        <RotateCcw size={13} /> Reset All Filters
      </button>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs sm:text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-all duration-200',
          checked ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-background-deep)]' : 'border-[var(--color-accent)]/40 bg-[var(--color-background-deep)]',
        )}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6l3 3 5-6" stroke="var(--color-background-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}
