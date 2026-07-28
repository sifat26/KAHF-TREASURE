import React from 'react';

export function PriceChip({ volume, price }: { volume: string; price: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-[6px] md:p-2 rounded-xl bg-[linear-gradient(160deg,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0.4)_100%)] border border-[rgba(201,168,76,0.1)] transition-all duration-[var(--transition-base)] hover:bg-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_4px_15px_rgba(212,175,55,0.15)] group/chip relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(201,168,76,0.12)_0%,transparent_60%)] opacity-0 transition-opacity duration-[var(--transition-base)] group-hover/chip:opacity-100"></div>
      <span className="font-accent text-[0.55rem] md:text-[0.6rem] text-[var(--gold-400)] mb-[2px] uppercase tracking-[0.15em] z-10">{volume}</span>
      <span className="font-sans font-bold text-[0.8rem] md:text-[0.95rem] text-[#fff] z-10">{price}</span>
    </div>
  );
}
