import { FavoritesClient } from '@/components/bag/FavoritesClient';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { products } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Your saved KAHF Treasure fragrances.',
  alternates: { canonical: '/favorites' },
};

export default function FavoritesPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.06),transparent_22%),linear-gradient(180deg,var(--color-background)_0%,#11110f_100%)] pt-24 pb-16 text-white'>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Favorites', url: '/favorites' },
        ]}
      />

      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Favorites', href: '/favorites' },
          ]}
          className='mb-6 text-xs text-(--color-text-secondary)'
        />

        <div className='mb-10 max-w-3xl border-b border-line pb-8'>
          <span className='eyebrow mb-4 block'>Your Shortlist</span>
          <h1 className='font-display text-4xl font-semibold leading-[1.1] text-(--color-text-primary) sm:text-5xl lg:text-[3rem]'>
            Favorites
          </h1>
          <p className='mt-5 max-w-2xl text-base leading-[1.8] text-(--color-text-secondary)'>
            Keep the attars you like in one place while you compare, shortlist, or return later.
          </p>
        </div>

        <FavoritesClient allProducts={products} />
      </Container>
    </div>
  );
}
