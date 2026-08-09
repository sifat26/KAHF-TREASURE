'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { products } from '@/data/products';
import { filterAndSortProducts, productLabel } from '@/lib/products';
import { familyLabel } from '@/lib/format';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

/** Bangla labels for the catalogue categories shown under each result. */
const CATEGORY_LABEL: Record<string, string> = {
  'most-wanted': 'সবচেয়ে জনপ্রিয়',
  'new-arrivals': 'নতুন এসেছে',
  oud: 'উদ',
  floral: 'ফুলেল',
  fruit: 'ফলের সুবাস',
  packages: 'প্যাকেজ',
  unique: 'বিশেষ',
};

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
            aria-label="সুগন্ধি খুঁজুন"
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
                placeholder="আতর, নোট বা কালেকশন খুঁজুন…"
                className="w-full bg-transparent text-lg outline-none"
                style={{
                  color: 'var(--color-text-primary)',
                }}
                aria-label="যা খুঁজছেন"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="খোঁজা বন্ধ করুন"
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
                  &ldquo;{query}&rdquo; দিয়ে কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজে দেখুন।
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
                        name={productLabel(product)}
                        family={product.family}
                        className="h-14 w-14 shrink-0 rounded-[10px]"
                        compact
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className="block truncate font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {productLabel(product)}
                        </span>
                        <span
                          className="block text-xs"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {product.family ? familyLabel(product.family) : 'আতর'} ·{' '}
                          {CATEGORY_LABEL[product.category] ?? 'শপ'}
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
                  &ldquo;{query}&rdquo;-এর সব ফলাফল দেখুন
                </button>
              )}
              {query.trim().length === 0 && (
                <p
                  className="px-2 py-6 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  আমাদের সুগন্ধির সংগ্রহ ঘুরে দেখতে লিখতে শুরু করুন।
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
