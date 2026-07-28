'use client';

import * as React from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEnquiryBag } from './EnquiryBagProvider';
import { formatPrice, formatSize } from '@/lib/format';
import { orderBagUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { Button, ButtonLink } from '@/components/ui/Button';

/**
 * Enquiry Drawer — the WhatsApp-first "cart". Collects the customer's
 * selection and hands it off to WhatsApp as a single pre-filled order message.
 */
export function EnquiryDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, clearBag, count } = useEnquiryBag();
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, setOpen]);

  const total = items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);
  const orderUrl = orderBagUrl(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-[var(--shadow-soft)]"
            initial={reduce ? undefined : { x: '100%' }}
            animate={reduce ? undefined : { x: 0 }}
            exit={reduce ? undefined : { x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl text-ink">
                Enquiry Bag {count > 0 && <span className="text-muted">({count})</span>}
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close enquiry bag"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} className="text-line" strokeWidth={1.25} />
                <p className="text-muted">Your enquiry bag is empty.</p>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Explore fragrances
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-4">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="shrink-0"
                      >
                        <ProductBottle
                          name={item.name}
                          family={item.family}
                          className="h-20 w-20 rounded-lg"
                          compact
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="font-medium text-ink hover:text-[var(--color-gold-deep)]"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            aria-label={`Remove ${item.name} (${item.size})`}
                            className="text-muted transition-colors hover:text-[var(--color-error)]"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="text-xs uppercase tracking-wide text-muted">
                          {formatSize(item.size)}
                        </span>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center text-muted hover:text-ink"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center text-muted hover:text-ink"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          {typeof item.price === 'number' && (
                            <span className="text-sm font-medium text-ink">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="border-t border-line px-6 py-5">
                  {total > 0 && (
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-muted">Estimated total</span>
                      <span className="font-display text-xl text-ink">{formatPrice(total)}</span>
                    </div>
                  )}
                  <p className="mb-4 text-xs leading-relaxed text-muted">
                    Delivery is arranged on WhatsApp. We’ll confirm availability, delivery time and
                    charges for your area before you pay.
                  </p>
                  <ButtonLink href={orderUrl} external variant="primary" size="lg" full className="mb-2">
                    <WhatsAppIcon size={18} /> Order on WhatsApp
                  </ButtonLink>
                  <button
                    onClick={clearBag}
                    className="w-full py-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
                  >
                    Clear bag
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
