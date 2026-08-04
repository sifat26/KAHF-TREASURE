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
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'var(--t-scrim)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative mt-0 h-fit w-full max-w-2xl p-5 sm:mt-24 sm:rounded-[20px]"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-soft)',
            }}
            initial={reduce ? undefined : { y: -20, opacity: 0 }}
            animate={reduce ? undefined : { y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Search fragrances"
          >
            <form
              onSubmit={submit}
              className="flex items-center gap-3 pb-4"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <Search size={20} style={{ color: 'var(--color-muted)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, collections…"
                className="w-full bg-transparent text-lg outline-none"
                style={{
                  color: 'var(--color-text-primary)',
                }}
                aria-label="Search query"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                style={{ color: 'var(--color-muted)' }}
              >
                <X size={20} />
              </button>
            </form>

            <div className="mt-4 max-h-[50vh] overflow-y-auto">
              {query.trim().length > 0 && results.length === 0 && (
                <p
                  className="py-8 text-center text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  No fragrances match &ldquo;{query}&rdquo;. Try a different word.
                </p>
              )}
              <ul className="flex flex-col">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-[14px] p-2 transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background =
                          'var(--color-card)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background =
                          'transparent';
                      }}
                    >
                      <ProductBottle
                        name={product.name}
                        family={product.family}
                        className="h-14 w-14 shrink-0 rounded-[10px]"
                        compact
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className="block truncate font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {product.name}
                        </span>
                        <span
                          className="block text-xs capitalize"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {product.family ?? 'Attar'} · {product.category.replace('-', ' ')}
                        </span>
                      </span>
                      <PriceDisplay
                        prices={product.prices}
                        className="shrink-0 text-sm"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {query.trim().length > 0 && results.length > 0 && (
                <button
                  onClick={submit}
                  className="mt-2 w-full rounded-[14px] py-3 text-sm font-medium transition-colors"
                  style={{
                    background: 'var(--color-card)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  See all results for &ldquo;{query}&rdquo;
                </button>
              )}
              {query.trim().length === 0 && (
                <p
                  className="px-2 py-6 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
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
