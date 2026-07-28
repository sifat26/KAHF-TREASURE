import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PriceChip } from '@/components/ui/PriceChip';
import { featuredProducts } from '@/data/products';

export function MostWantedSection() {
  return (
    <section className="container mx-auto px-4 max-w-7xl py-20 animate-on-scroll" id="most-wanted" aria-labelledby="most-wanted-title">
      <SectionHeader title="Most Wanted" id="most-wanted-title" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, idx) => (
          <GlassPanel key={idx} className="p-4 md:p-6 lg:p-8 flex flex-col relative overflow-hidden group border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)]">
            <div className="absolute -right-[40px] -top-[40px] w-[120px] h-[120px] bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)] rounded-full blur-[30px] transition-all duration-[0.8s] ease-in-out group-hover:bg-[radial-gradient(circle,rgba(201,168,76,0.25)_0%,transparent_70%)] group-hover:scale-[1.3]" aria-hidden="true"></div>
            
            <h3 className="font-display text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-semibold text-white mb-2 transition-all duration-[var(--transition-base)] tracking-[0.03em] group-hover:text-[var(--color-gold-300)] group-hover:tracking-[0.06em] z-10">
              {product.name}
            </h3>
            
            <p className="font-bengali text-[0.8rem] md:text-[0.9rem] text-[var(--text-secondary)] mb-[24px] leading-relaxed flex-1 z-10">
              {product.description}
            </p>
            
            <div className={`grid gap-[8px] md:gap-[10px] mt-auto z-10 ${product.prices.length === 5 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>  
              {product.prices.map((price, pIdx) => (
                <PriceChip key={pIdx} volume={price.volume} price={price.price} />
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
