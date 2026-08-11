'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart, decreaseQuantity, increaseQuantity, removeFromCart, toggleCart } from '@/store/cartSlice';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(s => s.cart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => dispatch(closeCart())}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-700" />
            <h2 className="text-lg font-semibold text-stone-900">
              কার্ট ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100"
            aria-label="কার্ট বন্ধ করুন"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-stone-300" />
              <p className="text-lg font-medium text-stone-700">কার্ট খালি</p>
              <p className="mt-1 text-sm text-stone-500">পণ্য যোগ করতে শপ পেজ দেখুন</p>
              <Link
                href="/shop"
                onClick={() => dispatch(closeCart())}
                className="mt-4 rounded-full bg-amber-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800"
              >
                শপ করুন
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-stone-800">{item.title}</p>
                    {item.variantLabel && (
                      <p className="text-xs text-stone-500">{item.variantLabel}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-amber-200 bg-white">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-amber-700 hover:bg-amber-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[24px] text-center text-xs font-semibold text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-amber-700 hover:bg-amber-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-stone-900">
                            ৳{item.price * item.quantity}
                          </span>
                          {Boolean(item.compareAtPrice) && Number(item.compareAtPrice) > item.price && (
                            <span className="text-xs text-stone-400 line-through">
                              ৳{Number(item.compareAtPrice) * item.quantity}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-stone-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-stone-600">সাবটোটাল</span>
              <span className="text-xl font-bold text-stone-900">৳{subtotal}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => dispatch(closeCart())}
              className="block w-full rounded-full bg-amber-700 py-3 text-center text-sm font-semibold text-white hover:bg-amber-800"
            >
              চেকআউট করুন →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
