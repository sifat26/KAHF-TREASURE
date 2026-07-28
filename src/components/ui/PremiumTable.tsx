import React from 'react';
import { TableProduct } from '@/data/products';

interface PremiumTableProps {
  products: TableProduct[];
  ariaLabel: string;
  isCompact?: boolean;
}

export function PremiumTable({ products, ariaLabel, isCompact = false }: PremiumTableProps) {
  const hasDescription = products.some((p) => p.description);

  return (
    <div className="overflow-x-auto w-full scrollbar-thin">
      <table className="w-full border-collapse text-left" aria-label={ariaLabel}>
        <thead>
          <tr className="bg-[linear-gradient(135deg,#E8D48B,#C9A84C,#A68A3E)] shadow-[0_2px_10px_rgba(201,168,76,0.2)]">
            <th className={`font-bengali font-bold text-[#080604] tracking-[0.05em] ${isCompact ? 'p-[10px_8px] text-[0.65rem] md:p-[14px_16px] md:text-[0.8rem]' : 'p-[12px_10px] text-[0.75rem] md:p-[18px_20px] md:text-[0.95rem]'}`}>
              {hasDescription ? 'সুগন্ধির নাম' : 'নাম'}
            </th>
            <th className={`font-accent font-bold text-[#080604] uppercase tracking-[0.1em] text-center whitespace-nowrap ${isCompact ? 'p-[10px_8px] text-[0.65rem] md:p-[14px_16px] md:text-[0.75rem]' : 'p-[12px_10px] text-[0.7rem] md:p-[18px_20px] md:text-[0.8rem]'}`}>3 ML</th>
            <th className={`font-accent font-bold text-[#080604] uppercase tracking-[0.1em] text-center whitespace-nowrap ${isCompact ? 'p-[10px_8px] text-[0.65rem] md:p-[14px_16px] md:text-[0.75rem]' : 'p-[12px_10px] text-[0.7rem] md:p-[18px_20px] md:text-[0.8rem]'}`}>6 ML</th>
            <th className={`font-accent font-bold text-[#080604] uppercase tracking-[0.1em] text-center whitespace-nowrap ${isCompact ? 'p-[10px_8px] text-[0.65rem] md:p-[14px_16px] md:text-[0.75rem]' : 'p-[12px_10px] text-[0.7rem] md:p-[18px_20px] md:text-[0.8rem]'}`}>12 ML</th>
            {hasDescription && (
              <th className={`font-bengali font-bold text-[#080604] tracking-[0.05em] ${isCompact ? 'p-[10px_8px] text-[0.65rem] md:p-[14px_16px] md:text-[0.8rem]' : 'p-[12px_10px] text-[0.75rem] md:p-[18px_20px] md:text-[0.95rem]'}`}>
                ঘ্রাণ কেমন?
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr 
              key={idx} 
              className={`border-b border-[rgba(201,168,76,0.05)] transition-all duration-[var(--transition-base)] hover:bg-[linear-gradient(90deg,rgba(201,168,76,0.08)_0%,transparent_100%)] hover:shadow-[inset_3px_0_0_0_var(--color-gold-400)] ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.01)]'}`}
            >
              <td className={`font-sans font-semibold text-[var(--color-gold-200)] ${isCompact ? 'p-[10px_8px] text-[0.75rem] md:p-[14px_16px] md:text-[0.9rem]' : 'p-[12px_10px] text-[0.85rem] md:p-[18px_20px] md:text-[1.05rem] tracking-[0.02em]'}`}>
                <span className={product.isBengali ? 'font-bengali' : ''}>
                  {product.name}
                  {product.stockout && (
                    <span className="inline-block ml-1 md:ml-2 px-[4px] md:px-2 py-[2px] bg-[var(--red-bg)] text-[var(--red-accent)] text-[0.45rem] md:text-[0.6rem] font-bold rounded-full uppercase tracking-[0.1em] border border-[rgba(229,91,91,0.2)] align-middle">
                      Stockout
                    </span>
                  )}
                </span>
                {product.subtext && (
                  <span className="block text-[0.6rem] md:text-[0.65rem] text-[var(--text-muted)] font-normal mt-0.5">
                    {product.subtext}
                  </span>
                )}
              </td>
              <td className={`font-accent font-semibold text-[var(--gold-300)] whitespace-nowrap text-center tracking-[0.05em] ${isCompact ? 'p-[10px_8px] text-[0.7rem] md:p-[14px_16px] md:text-[0.85rem]' : 'p-[12px_10px] text-[0.75rem] md:p-[18px_20px] md:text-[0.95rem]'}`}>{product.prices[0]?.price}</td>
              <td className={`font-accent font-semibold text-[var(--gold-300)] whitespace-nowrap text-center tracking-[0.05em] ${isCompact ? 'p-[10px_8px] text-[0.7rem] md:p-[14px_16px] md:text-[0.85rem]' : 'p-[12px_10px] text-[0.75rem] md:p-[18px_20px] md:text-[0.95rem]'}`}>{product.prices[1]?.price}</td>
              <td className={`font-accent font-semibold text-[var(--gold-300)] whitespace-nowrap text-center tracking-[0.05em] ${isCompact ? 'p-[10px_8px] text-[0.7rem] md:p-[14px_16px] md:text-[0.85rem]' : 'p-[12px_10px] text-[0.75rem] md:p-[18px_20px] md:text-[0.95rem]'}`}>{product.prices[2]?.price}</td>
              {hasDescription && (
                <td className={`text-[0.65rem] md:text-[0.8rem] text-[var(--text-secondary)] leading-relaxed min-w-[120px] md:min-w-[200px] md:max-w-[400px] ${isCompact ? 'p-[10px_8px] md:p-[14px_16px]' : 'p-[12px_10px] md:p-[18px_20px]'}`}>
                  <span className={product.description === '—' ? 'text-center block text-[var(--text-muted)]' : ''}>
                    {product.description}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
