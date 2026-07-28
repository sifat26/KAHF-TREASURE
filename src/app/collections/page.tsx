import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { collections, collectionMatcher } from '@/data/collections';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Fragrance Collections',
  description:
    'Explore KAHF Treasure fragrance collections — Most Wanted, New Arrivals, Oud, Floral, Fruit and Best Sellers.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsPage() {
  const ordered = [...collections].sort((a, b) => a.order - b.order);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Collections', url: '/collections' },
        ]}
      />
      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Collections', href: '/collections' },
          ]}
          className="mb-6"
        />
        <header className="mb-12 max-w-2xl">
          <span className="eyebrow mb-3 block">Curated by character</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Collections</h1>
          <p className="mt-4 text-muted">
            Every fragrance has a personality. Explore our collections to find the style that suits
            you — from fresh daily wear to deep, luxurious oud.
          </p>
        </header>

        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((collection) => {
            const count = products.filter(collectionMatcher(collection)).length;
            return (
              <RevealItem key={collection.slug}>
                <CollectionCard collection={collection} count={count} className="h-full" />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </>
  );
}
