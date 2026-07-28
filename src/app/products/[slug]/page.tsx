import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { ProductAttributes } from '@/components/product/ProductAttributes';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { StickyPurchaseBar } from '@/components/product/StickyPurchaseBar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeader } from '@/components/ui/Section';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { products } from '@/data/products';
import { site } from '@/data/site';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  const desc =
    product.description ??
    `${product.name} — premium alcohol-free attar by ${site.name}.`;

  return {
    title: product.name,
    description: desc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${site.name}`,
      description: desc,
      url: `${site.url}/products/${product.slug}`,
      type: 'website',
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  'most-wanted': 'Most Wanted',
  'new-arrivals': 'New Arrivals',
  oud: 'Oud Collection',
  floral: 'Floral Collection',
  fruit: 'Fruit Collection',
  packages: 'Premium Packages',
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const categoryLabel = CATEGORY_LABEL[product.category] ?? 'Shop';
  const collectionHref =
    product.category === 'most-wanted' ||
    product.category === 'new-arrivals' ||
    product.category === 'oud' ||
    product.category === 'floral' ||
    product.category === 'fruit'
      ? `/collections/${product.category}`
      : '/shop';

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: categoryLabel, href: collectionHref },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={crumbs.map((c) => ({ name: c.name, url: c.href }))} />

      <Container className="py-8 lg:py-12">
        <Breadcrumbs items={crumbs} className="mb-8" />

        {/* Main: gallery + purchase */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery name={product.name} family={product.family} />

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Link
                href={collectionHref}
                className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] hover:underline"
              >
                {categoryLabel}
              </Link>
              {product.bestSeller && <Badge variant="gold">Best Seller</Badge>}
              {product.newArrival && <Badge variant="ink">New</Badge>}
              {product.unique && <Badge variant="outline">Unique</Badge>}
            </div>

            <h1 className="font-display text-4xl leading-tight text-ink">{product.name}</h1>

            {product.description && (
              <p className="mt-4 leading-relaxed text-muted">{product.description}</p>
            )}

            <div className="mt-8 border-t border-line pt-8">
              <ProductPurchase product={product} />
            </div>

            <ul className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted">
              <li>• Alcohol-free concentrated attar oil</li>
              <li>• Premium imported fragrance oils</li>
              <li>• Delivery arranged directly on WhatsApp</li>
            </ul>
          </div>
        </div>

        {/* Notes + attributes */}
        <div className="mt-16 lg:mt-24">
          <ProductAttributes product={product} />
        </div>

        {/* Reviews */}
        <div className="mt-16 lg:mt-20">
          <ProductReviews productName={product.name} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <SectionHeader align="left" eyebrow="You may also like" title="Related Fragrances" />
            <ProductGrid products={related} />
          </div>
        )}

        {/* Recently viewed */}
        <RecentlyViewed currentSlug={product.slug} />
      </Container>

      <StickyPurchaseBar product={product} />
    </>
  );
}
