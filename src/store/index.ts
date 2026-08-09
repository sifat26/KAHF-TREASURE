import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { type CartItem } from './cartSlice';

export const CART_STORAGE_KEY = 'kahf_cart';

function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export const store = configureStore({
  reducer: { cart: cartReducer },
});

store.subscribe(() => {
  if (typeof window === 'undefined') return;
  saveCartToStorage(store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
