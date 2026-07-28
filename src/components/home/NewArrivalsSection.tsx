import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProductList } from '@/components/ui/ProductList';
import { newArrivals } from '@/data/products';

export function NewArrivalsSection() {
  return (
    <section className="container mx-auto px-4 max-w-7xl py-20 animate-on-scroll" id="new-arrivals" aria-labelledby="new-arrivals-title">
      <SectionHeader title="New Arrivals" id="new-arrivals-title" />

      <GlassPanel className="overflow-hidden">
        <ProductList products={newArrivals} ariaLabel="New Arrivals Price List" />
      </GlassPanel>
    </section>
  );
}
