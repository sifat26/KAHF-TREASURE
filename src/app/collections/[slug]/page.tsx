import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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

const collectionHeaderImages: Record<string, string> = {
  oud: '/images/collection-oud.png',
  floral: '/images/collection-floral.png',
  fruity: '/images/collection-fruity.png',
  fresh: '/images/collection-fresh.png',
  arabian: '/images/collection-arabian.png',
  woody: '/images/collection-woody.png',
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const matched = products.filter(collectionMatcher(collection));
  const bgImage = collectionHeaderImages[slug] ?? '/images/collection-oud.png';

  return (
    <div className="bg-[#090807] text-white min-h-screen pt-24 pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Collections', url: '/collections' },
          { name: collection.title, url: `/collections/${collection.slug}` },
        ]}
      />
      <Container className="py-6 lg:py-10">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Collections', href: '/collections' },
            { name: collection.title, href: `/collections/${collection.slug}` },
          ]}
          className="mb-6 text-xs text-[#b8b0a2]"
        />

        {/* Hero Banner for Collection */}
        <header className="relative mb-12 overflow-hidden rounded-3xl border border-[#c8a96a]/25 bg-[#0f0d0b] p-8 sm:p-12 shadow-2xl">
          <Image
            src={bgImage}
            alt={collection.title}
            fill
            priority
            className="object-cover object-center filter brightness-[0.40]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090807] via-[#090807]/80 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#c8a96a] mb-2 block">
              {collection.tagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {collection.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#d6cdbe]">
              {collection.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c8a96a]/30 bg-[#090807]/70 backdrop-blur px-3.5 py-1 text-xs font-semibold text-[#f5dd9e]">
              <span>{matched.length} {matched.length === 1 ? 'fragrance' : 'fragrances'} in this library</span>
            </div>
          </div>
        </header>

        {matched.length > 0 ? (
          <ProductGrid products={matched} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center rounded-2xl bg-[#0f0d0b] border border-[#c8a96a]/15 p-8">
            <p className="text-[#b8b0a2]">This collection is currently being curated. Check back soon.</p>
            <ButtonLink href="/shop" variant="secondary" className="bg-[#c8a96a] text-[#090807] hover:bg-[#d4b574]">
              Browse All Fragrances
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
