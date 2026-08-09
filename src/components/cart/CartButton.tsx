'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/cartSlice';
import { ShoppingBag } from 'lucide-react';

export function CartButton() {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(s =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-amber-700"
      aria-label="কার্ট"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-700 px-1 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
