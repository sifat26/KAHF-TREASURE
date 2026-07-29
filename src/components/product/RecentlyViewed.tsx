'use client';

import * as React from 'react';
import { products, type Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SectionHeader } from '@/components/ui/Section';

const KEY = 'kahf-recently-viewed-v1';
const MAX = 8;

/** Read the recently-viewed slugs from storage. */
function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Records the current product as viewed, then shows previously-viewed items
 * (excluding the current one). Renders nothing until it has something to show.
 */
export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [items, setItems] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const prev = readRecent().filter((s) => s !== currentSlug);

    // Show what was viewed before this visit.
    const list = prev
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 4);
    React.startTransition(() => {
      setItems(list);
    });

    // Then record the current product at the front.
    const next = [currentSlug, ...prev].slice(0, MAX);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <section aria-label="Recently viewed" className="mt-4">
      <SectionHeader align="left" title="Recently Viewed" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
