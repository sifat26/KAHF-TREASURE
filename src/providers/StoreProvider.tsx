'use client';

import { store } from '@/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { hydrateCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { CART_STORAGE_KEY } from '@/store';

function CartHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw);
        if (Array.isArray(items)) {
          dispatch(hydrateCart(items));
        }
      }
    } catch {}
  }, [dispatch]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydrator>{children}</CartHydrator>
    </Provider>
  );
}
