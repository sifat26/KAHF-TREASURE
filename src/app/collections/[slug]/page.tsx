import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ButtonLink } from '@/components/ui/Button';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { collections, collectionMatcher, getCollection } from '@/data/collections';
import { products } from '@/data/products';
import { site } from '@/data/site';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.title} · ${site.name}`,
      description: collection.description,
      url: `${site.url}/collections/${collection.slug}`,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const matched = products.filter(collectionMatcher(collection));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Collections', url: '/collections' },
          { name: collection.title, url: `/collections/${collection.slug}` },
        ]}
      />
      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Collections', href: '/collections' },
            { name: collection.title, href: `/collections/${collection.slug}` },
          ]}
          className="mb-6"
        />
        <header className="mb-12 max-w-2xl">
          <span className="eyebrow mb-3 block">{collection.tagline}</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{collection.title}</h1>
          <p className="mt-4 text-muted">{collection.description}</p>
          <p className="mt-2 text-sm text-muted">
            {matched.length} {matched.length === 1 ? 'fragrance' : 'fragrances'}
          </p>
        </header>

        {matched.length > 0 ? (
          <ProductGrid products={matched} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-muted">This collection is being curated. Check back soon.</p>
            <ButtonLink href="/shop" variant="secondary">
              Browse all fragrances
            </ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}
