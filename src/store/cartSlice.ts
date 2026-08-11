// Google Analytics 4 e-commerce event tracking
import { trackEvent } from '@/components/seo/GoogleAnalytics';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartVariant {
  _id?: string;
  label: string;
  stock: number;
  priceOverride?: number | null;
  compareAtPrice?: number | null;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image?: string;
  basePrice: number;
  price: number;
  compareAtPrice?: number | null;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
  slug: string;
  maxStock?: number;
  availableVariants?: CartVariant[];
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const MAX_ORDER_ITEMS = 10;

function getTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<Omit<CartItem, 'id'>>) {
      const { productId, variantId } = action.payload;
      const existing = state.items.find(
        item => item.productId === productId && item.variantId === variantId,
      );
      const totalQuantity = getTotalQuantity(state.items);
      if (existing) {
        const availableSlots = Math.max(0, MAX_ORDER_ITEMS - totalQuantity);
        const newQty = existing.quantity + Math.min(action.payload.quantity, availableSlots);
        existing.quantity = existing.maxStock !== undefined ? Math.min(newQty, existing.maxStock) : newQty;
      } else {
        const availableSlots = Math.max(0, MAX_ORDER_ITEMS - totalQuantity);
        const nextQty = Math.min(action.payload.quantity, availableSlots);
        if (nextQty <= 0) return;
        trackEvent('add_to_cart', {
          currency: 'BDT',
          value: action.payload.price * action.payload.quantity,
          items: [{
            item_id: action.payload.productId,
            item_name: action.payload.title,
            price: action.payload.price,
            quantity: action.payload.quantity,
            item_variant: action.payload.variantLabel,
          }],
        });
        state.items.push({
          ...action.payload,
          quantity: nextQty,
          id: variantId ? `${productId}-${variantId}` : `${productId}-default`,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        const totalQuantity = getTotalQuantity(state.items);
        if (totalQuantity >= MAX_ORDER_ITEMS) return;
        const newQty = item.quantity + 1;
        item.quantity = item.maxStock !== undefined ? Math.min(newQty, item.maxStock) : newQty;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(i => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    changeVariant(state, action: PayloadAction<{
      itemId: string;
      variantId: string;
      variantLabel: string;
      price: number;
      compareAtPrice?: number | null;
      maxStock?: number;
    }>) {
      const { itemId, variantId, variantLabel, price, compareAtPrice, maxStock } = action.payload;
      const item = state.items.find(i => i.id === itemId);
      if (!item) return;
      const newId = `${item.productId}-${variantId}`;
      const existing = state.items.find(i => i.id !== itemId && i.id === newId);
      if (existing) {
        const merged = existing.quantity + item.quantity;
        existing.quantity = maxStock !== undefined ? Math.min(merged, maxStock) : merged;
        existing.maxStock = maxStock;
        state.items = state.items.filter(i => i.id !== itemId);
        return;
      }
      item.id = newId;
      item.variantId = variantId;
      item.variantLabel = variantLabel;
      item.price = price;
      item.compareAtPrice = compareAtPrice;
      item.maxStock = maxStock;
      if (maxStock !== undefined && item.quantity > maxStock) {
        item.quantity = maxStock > 0 ? maxStock : 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) { state.isOpen = true; },
    closeCart(state) { state.isOpen = false; },
    toggleCart(state) { state.isOpen = !state.isOpen; },
  },
});

export const {
  hydrateCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity,
  changeVariant, clearCart, openCart, closeCart, toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
