'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { products } from '@/data/products';
import { filterAndSortProducts } from '@/lib/products';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

/** Instant search overlay — filters the local catalogue as you type. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const reduce = useReducedMotion();

  const wasOpen = React.useRef(false);
  React.useEffect(() => {
    if (open && !wasOpen.current) {
      wasOpen.current = true;
      setQuery('');
      // Focus the field once the overlay is painted.
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    if (!open) wasOpen.current = false;
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = React.useMemo(() => {
    if (query.trim().length < 1) return [];
    return filterAndSortProducts(products, { query, sort: 'featured' }).slice(0, 6);
  }, [query]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative mt-0 h-fit w-full max-w-2xl bg-canvas p-5 shadow-[var(--shadow-soft)] sm:mt-24 sm:rounded-[var(--radius-card)]"
            initial={reduce ? undefined : { y: -20, opacity: 0 }}
            animate={reduce ? undefined : { y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Search fragrances"
          >
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-line pb-4">
              <Search size={20} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, collections…"
                className="w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted/70"
                aria-label="Search query"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="text-muted hover:text-ink">
                <X size={20} />
              </button>
            </form>

            <div className="mt-4 max-h-[50vh] overflow-y-auto">
              {query.trim().length > 0 && results.length === 0 && (
                <p className="py-8 text-center text-sm text-muted">
                  No fragrances match “{query}”. Try a different word.
                </p>
              )}
              <ul className="flex flex-col">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-surface"
                    >
                      <ProductBottle
                        name={product.name}
                        family={product.family}
                        className="h-14 w-14 shrink-0 rounded-lg"
                        compact
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-ink">{product.name}</span>
                        <span className="block text-xs capitalize text-muted">
                          {product.family ?? 'Attar'} · {product.category.replace('-', ' ')}
                        </span>
                      </span>
                      <PriceDisplay prices={product.prices} className="shrink-0 text-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
              {query.trim().length > 0 && results.length > 0 && (
                <button
                  onClick={submit}
                  className="mt-2 w-full rounded-xl bg-surface py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
                >
                  See all results for “{query}”
                </button>
              )}
              {query.trim().length === 0 && (
                <p className="px-2 py-6 text-sm text-muted">
                  Start typing to explore our fragrance library.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
