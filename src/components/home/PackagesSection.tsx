import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { packages } from '@/data/packages';

export function PackagesSection() {
  const isBengaliText = (text: string) => /[\u0980-\u09FF]/.test(text);

  return (
    <section className="container mx-auto px-4 max-w-7xl py-20 animate-on-scroll" id="packages" aria-labelledby="packages-title">
      <SectionHeader title="Royal Packages" id="packages-title" />

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px] mx-auto gap-5">
        {packages.map((pkg, idx) => (
          <GlassPanel 
            key={idx} 
            className={`flex flex-col relative overflow-hidden group border transition-all duration-[var(--transition-base)] ${
              pkg.isVip 
                ? 'col-span-1 lg:col-span-2 p-6 md:p-8 lg:p-10 border-[rgba(201,168,76,0.25)] bg-[linear-gradient(160deg,rgba(35,30,20,0.95)_0%,rgba(14,12,8,0.98)_100%)]' 
                : 'p-6 md:p-8 border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)]'
            }`}
          >
            <div className={`absolute -right-[40px] -top-[40px] w-[100px] h-[100px] rounded-full blur-[25px] transition-all duration-[0.6s] ease-in-out group-hover:scale-125 ${pkg.isVip ? 'bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle,rgba(201,168,76,0.3)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle,rgba(201,168,76,0.25)_0%,transparent_70%)]'}`} aria-hidden="true"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-[18px] mb-[18px] border-b border-[rgba(201,168,76,0.1)] gap-4 sm:gap-0 relative z-10">
              <h3 className={`font-display font-semibold transition-colors duration-[var(--transition-base)] ${pkg.isVip ? 'text-[1.6rem] md:text-[2rem] text-[var(--color-gold-400)]' : 'text-[1.4rem] md:text-[1.6rem] text-white group-hover:text-[var(--color-gold-300)]'}`}>
                {pkg.name}
              </h3>
              <div className={`font-accent font-semibold tracking-[0.02em] border rounded-full transition-all duration-[var(--transition-base)] ${
                pkg.isVip 
                  ? 'bg-[linear-gradient(135deg,#E8D48B,#C9A84C,#A68A3E)] text-[#080604] border-[var(--color-gold-400)] px-[18px] py-[7px] text-[0.85rem] md:text-[0.9rem] shadow-[0_0_20px_rgba(201,168,76,0.3)]' 
                  : 'bg-[rgba(201,168,76,0.06)] text-[var(--gold-300)] border-[rgba(201,168,76,0.18)] px-[14px] md:px-[18px] py-[5px] md:py-[7px] text-[0.8rem] md:text-[0.85rem] group-hover:bg-[linear-gradient(135deg,#E8D48B,#C9A84C,#A68A3E)] group-hover:text-[#080604] group-hover:border-[var(--color-gold-400)]'
              }`}>
                {pkg.price}
              </div>
            </div>
            
            <ul className={`relative z-10 flex-1 ${pkg.isVip ? 'grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1' : 'flex flex-col'}`}>
              {pkg.items.map((item, iIdx) => (
                <li key={iIdx} className="font-sans text-[0.85rem] md:text-[0.9rem] text-[var(--text-secondary)] py-[6px] md:py-[7px] flex items-center gap-[12px] transition-colors duration-[var(--transition-base)] group-hover:text-white">
                  <span className={`flex-shrink-0 transition-shadow duration-[var(--transition-base)] group-hover:shadow-[0_0_8px_rgba(201,168,76,0.5)] ${pkg.isVip ? 'w-[6px] h-[6px] rounded-[2px] bg-[var(--gold-300)] rotate-45' : 'w-[5px] h-[5px] rounded-full bg-[var(--color-gold-400)]'}`}></span>
                  <span className={isBengaliText(item) ? 'font-bengali' : ''}>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
