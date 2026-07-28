import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShopClient } from '@/components/shop/ShopClient';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getAllProducts, priceCeiling, usedFamilies } from '@/lib/products';
import type { CategorySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop All Fragrances',
  description:
    'Browse the full KAHF Treasure collection of premium alcohol-free attar — filter by category, gender, fragrance family and price.',
  alternates: { canonical: '/shop' },
};

const VALID_CATEGORIES: CategorySlug[] = ['most-wanted', 'new-arrivals', 'oud', 'floral', 'fruit'];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const initialCategory = VALID_CATEGORIES.includes(category as CategorySlug)
    ? (category as CategorySlug)
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/shop' },
        ]}
      />
      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
          ]}
          className="mb-6"
        />
        <header className="mb-10 max-w-2xl">
          <span className="eyebrow mb-3 block">The Collection</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">All Fragrances</h1>
          <p className="mt-4 text-muted">
            Explore our complete library of premium alcohol-free attar. Use the filters to find your
            signature scent.
          </p>
        </header>

        <Suspense fallback={<div className="py-24 text-center text-muted">Loading fragrances…</div>}>
          <ShopClient
            allProducts={getAllProducts()}
            families={usedFamilies()}
            priceCeiling={priceCeiling()}
            initialCategory={initialCategory}
            initialQuery={q}
          />
        </Suspense>
      </Container>
    </>
  );
}
