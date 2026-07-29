import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ShopClient } from '@/components/shop/ShopClient';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/Section';
import type { CategorySlug } from '@/data/products';
import { getAllProducts, priceCeiling, usedFamilies } from '@/lib/products';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop All Fragrances',
  description:
    'Browse the full KAHF Treasure collection of premium alcohol-free attar — filter by category, gender, fragrance family and price.',
  alternates: { canonical: '/shop' },
};

const VALID_CATEGORIES: CategorySlug[] = ['most-wanted', 'new-arrivals', 'oud', 'floral', 'fruit', 'unique'];

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q, category } = await searchParams;
  const initialCategory = VALID_CATEGORIES.includes(category as CategorySlug) ? (category as CategorySlug) : undefined;

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.06),transparent_22%),linear-gradient(180deg,var(--color-background)_0%,#11110f_100%)] pt-24 pb-16 text-white'>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/shop' },
        ]}
      />
      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
          ]}
          className='mb-6 text-xs text-[var(--color-text-secondary)]'
        />
        <SectionHeader
          eyebrow='THE FULL COLLECTION'
          title='All Fragrances'
          description='Explore our complete library of premium alcohol-free attars. Use the interactive filters to uncover your signature scent.'
          align='left'
          className='mb-10 max-w-3xl border-b border-line pb-8'
        />

        <Suspense fallback={<div className='py-24 text-center text-[#c8a96a]'>Loading fragrances…</div>}>
          <ShopClient
            allProducts={getAllProducts()}
            families={usedFamilies()}
            priceCeiling={priceCeiling()}
            initialCategory={initialCategory}
            initialQuery={q}
          />
        </Suspense>
      </Container>
    </div>
  );
}
