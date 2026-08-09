'use client';

import * as React from 'react';
import type { Product, ProductSize } from '@/data/products';
import { availableSizes } from '@/lib/format';
import { productLabel } from '@/lib/products';

/**
 * Enquiry Bag — the WhatsApp-first equivalent of a cart.
 *
 * The business has no online checkout (docs/BUSINESS_REQUIREMENTS.md). Instead,
 * customers collect items into this bag and send the whole selection as a
 * pre-filled WhatsApp message. State persists in localStorage so the bag
 * survives navigation and refresh.
 */

export interface BagItem {
  slug: string;
  /**
   * Latin `product.name`. Stays Latin because the WhatsApp order message built
   * from these lines is read by the shop owner, who matches it to inventory.
   */
  name: string;
  /**
   * Bangla `productLabel()` — what the customer sees in the drawer. Optional so
   * bags persisted before this field existed still load; fall back to `name`.
   */
  label?: string;
  size: ProductSize;
  price?: number;
  qty: number;
  family?: Product['family'];
}

interface EnquiryBagState {
  items: BagItem[];
  wishlist: string[]; // product slugs
}

interface EnquiryBagContextValue extends EnquiryBagState {
  addItem: (product: Product, size: ProductSize, qty?: number) => void;
  removeItem: (slug: string, size: ProductSize) => void;
  updateQty: (slug: string, size: ProductSize, qty: number) => void;
  clearBag: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  count: number;
  /** Drawer open state (shared so the navbar button and pages can open it). */
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'kahf-enquiry-bag-v1';

const EnquiryBagContext = React.createContext<EnquiryBagContextValue | null>(null);

export function EnquiryBagProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<EnquiryBagState>({ items: [], wishlist: [] });
  const [isOpen, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Load persisted state on mount.
  React.useEffect(() => {
    React.startTransition(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<EnquiryBagState>;
          setState({
            items: Array.isArray(parsed.items) ? parsed.items : [],
            wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
          });
        }
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    });
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated]);

  const addItem = React.useCallback((product: Product, size: ProductSize, qty = 1) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.slug === product.slug && i.size === size);
      const items = existing
        ? prev.items.map((i) =>
            i.slug === product.slug && i.size === size ? { ...i, qty: i.qty + qty } : i,
          )
        : [
            ...prev.items,
            {
              slug: product.slug,
              name: product.name,
              label: productLabel(product),
              size,
              price: product.prices[size],
              qty,
              family: product.family,
            },
          ];
      return { ...prev, items };
    });
    setOpen(true);
  }, []);

  const removeItem = React.useCallback((slug: string, size: ProductSize) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((i) => !(i.slug === slug && i.size === size)),
    }));
  }, []);

  const updateQty = React.useCallback((slug: string, size: ProductSize, qty: number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    }));
  }, []);

  const clearBag = React.useCallback(() => {
    setState((prev) => ({ ...prev, items: [] }));
  }, []);

  const toggleWishlist = React.useCallback((slug: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(slug)
        ? prev.wishlist.filter((s) => s !== slug)
        : [...prev.wishlist, slug],
    }));
  }, []);

  const isWishlisted = React.useCallback(
    (slug: string) => state.wishlist.includes(slug),
    [state.wishlist],
  );

  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  const value: EnquiryBagContextValue = {
    ...state,
    addItem,
    removeItem,
    updateQty,
    clearBag,
    toggleWishlist,
    isWishlisted,
    count,
    isOpen,
    setOpen,
  };

  return <EnquiryBagContext.Provider value={value}>{children}</EnquiryBagContext.Provider>;
}

export function useEnquiryBag(): EnquiryBagContextValue {
  const ctx = React.useContext(EnquiryBagContext);
  if (!ctx) throw new Error('useEnquiryBag must be used within EnquiryBagProvider');
  return ctx;
}

/** Convenience: the default size to add (first available), for quick-add. */
export function defaultSize(product: Product): ProductSize | undefined {
  return availableSizes(product)[0];
}
