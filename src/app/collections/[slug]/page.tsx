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
import { toBanglaDigits } from '@/lib/format';

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
  if (!collection) return { title: 'কালেকশন খুঁজে পাওয়া যায়নি' };
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
    <div className="bg-[var(--color-background-deep)] text-[var(--color-text-primary)] min-h-screen pt-24 pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'কালেকশন', url: '/collections' },
          { name: collection.title, url: `/collections/${collection.slug}` },
        ]}
      />
      <Container className="py-6 lg:py-10">
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'কালেকশন', href: '/collections' },
            { name: collection.title, href: `/collections/${collection.slug}` },
          ]}
          className="mb-6 text-xs text-[var(--color-text-secondary)]"
        />

        {/* Hero Banner for Collection */}
        <header className="relative mb-12 overflow-hidden rounded-3xl border border-[var(--color-accent)]/25 bg-[var(--color-background)] p-8 sm:p-12 shadow-2xl">
          <Image
            src={bgImage}
            alt={`${collection.title} কালেকশন`}
            fill
            priority
            className="object-cover object-center filter brightness-[0.40]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background-deep)] via-[var(--color-background-deep)]/80 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="text-[0.7rem] font-bold tracking-[0.06em] text-[var(--color-accent)] mb-2 block">
              {collection.tagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {collection.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-text-tertiary)]">
              {collection.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-background-deep)]/70 backdrop-blur px-3.5 py-1 text-xs font-semibold text-[var(--color-accent-strong)]">
              <span>এই কালেকশনে {toBanglaDigits(matched.length)}টি আতর</span>
            </div>
          </div>
        </header>

        {matched.length > 0 ? (
          <ProductGrid products={matched} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center rounded-2xl bg-[var(--color-background)] border border-[var(--color-accent)]/15 p-8">
            <p className="text-[var(--color-text-secondary)]">এই কালেকশনটি এখন সাজানো হচ্ছে। একটু পরে আবার দেখুন।</p>
            <ButtonLink href="/shop" variant="secondary" className="bg-[var(--color-accent)] text-[var(--color-background-deep)] hover:bg-[var(--color-accent-hover)]">
              সব আতর দেখুন
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
