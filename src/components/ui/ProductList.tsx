import React from 'react';
import { TableProduct } from '@/data/products';

interface ProductListProps {
  products: TableProduct[];
  ariaLabel: string;
}

export function ProductList({ products, ariaLabel }: ProductListProps) {
  const hasDescription = products.some((p) => p.description && p.description !== '—');

  return (
    <div role="list" aria-label={ariaLabel} className="divide-y divide-[rgba(201,168,76,0.07)]">
      {/* Column header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[linear-gradient(135deg,#E8D48B,#C9A84C,#A68A3E)]">
        <span className="font-bengali font-bold text-[#080604] text-[0.72rem] md:text-[0.8rem] tracking-[0.05em]">
          {hasDescription ? 'সুগন্ধির নাম' : 'নাম'}
        </span>
        <div className="flex gap-3 md:gap-5 shrink-0">
          {['3 ML', '6 ML', '12 ML'].map((v) => (
            <span key={v} className="font-accent font-bold text-[#080604] text-[0.65rem] md:text-[0.75rem] tracking-[0.1em] uppercase w-10 md:w-12 text-center">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Product rows */}
      {products.map((product, idx) => (
        <div
          key={idx}
          role="listitem"
          className={`flex items-center justify-between gap-3 px-5 transition-colors duration-200 hover:bg-[rgba(201,168,76,0.05)] ${
            idx % 2 === 1 ? 'bg-[rgba(255,255,255,0.015)]' : ''
          } ${hasDescription ? 'py-4' : 'py-3'}`}
        >
          {/* Name + optional description */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-semibold text-[var(--color-gold-200)] leading-snug ${
                  product.isBengali ? 'font-bengali text-[0.9rem] md:text-[1rem]' : 'text-[0.88rem] md:text-[1rem]'
                }`}
              >
                {product.name}
              </span>
              {product.stockout && (
                <span className="inline-flex items-center px-1.5 py-[2px] rounded-full bg-[var(--red-bg)] text-[var(--red-accent)] text-[0.5rem] font-bold uppercase tracking-[0.08em] border border-[rgba(229,91,91,0.2)]">
                  Stockout
                </span>
              )}
            </div>
            {product.subtext && (
              <span className="block text-[0.65rem] text-[var(--text-muted)] mt-0.5">{product.subtext}</span>
            )}
            {hasDescription && product.description && product.description !== '—' && (
              <p className="font-bengali text-[0.72rem] md:text-[0.78rem] text-[var(--text-secondary)] mt-1 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Price chips */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {product.prices.slice(0, 3).map((p, pIdx) => (
              <div key={pIdx} className="flex flex-col items-center w-10 md:w-12">
                <span className="font-accent text-[0.55rem] text-[var(--text-muted)] uppercase tracking-wider leading-none mb-0.5">
                  {p.volume}
                </span>
                <span className="font-sans font-bold text-[0.8rem] md:text-[0.9rem] text-white leading-none">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
