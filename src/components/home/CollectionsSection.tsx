import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProductList } from '@/components/ui/ProductList';
import { previousCollection, flowerCollection } from '@/data/products';

export function CollectionsSection() {
  return (
    <section className="container mx-auto px-4 max-w-7xl py-20 animate-on-scroll" id="collections">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px]">
        {/* Previous Collection */}
        <div>
          <div className="flex items-center gap-[14px] mb-5">
            <h2 className="font-display text-[1.2rem] md:text-[1.8rem] font-semibold text-[var(--color-gold-400)] tracking-[0.12em] uppercase whitespace-nowrap" id="previous-title">
              Previous Collection
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(212,175,55,0.4)] to-transparent"></div>
          </div>
          <GlassPanel className="overflow-hidden">
            <ProductList products={previousCollection} ariaLabel="Previous Collection Price List" />
          </GlassPanel>
        </div>

        {/* ফুলের রাজ্য */}
        <div>
          <div className="flex items-center gap-[14px] mb-5">
            <h2 className="font-bengali text-[1.2rem] md:text-[1.8rem] font-semibold text-[var(--color-gold-400)] whitespace-nowrap" id="flowers-title">
              ফুলের রাজ্য
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(212,175,55,0.4)] to-transparent"></div>
          </div>
          <GlassPanel className="overflow-hidden">
            <ProductList products={flowerCollection} ariaLabel="Flower Fragrance Collection Price List" />
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
