import { ProductAttributes } from '@/components/product/ProductAttributes';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { StickyPurchaseBar } from '@/components/product/StickyPurchaseBar';
import { BreadcrumbJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/Section';
import { products } from '@/data/products';
import { site } from '@/data/site';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  const desc = product.description ?? `${product.name} — premium alcohol-free attar by ${site.name}.`;

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
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

      <div className='bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.08),transparent_24%),linear-gradient(180deg,var(--color-background)_0%,#10100e_100%)]'>
        <Container className='py-8 lg:py-12'>
          <Breadcrumbs items={crumbs} className='mb-8' />

          <section className='overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/80 shadow-[var(--shadow-card)] backdrop-blur-sm'>
            <div className='grid gap-0 lg:grid-cols-[1.05fr_0.95fr]'>
              <div className='border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8 xl:p-10'>
                <ProductGallery name={product.name} family={product.family} />
              </div>

              <div className='p-5 sm:p-7 lg:p-8 xl:p-10'>
                <div className='mb-4 flex flex-wrap items-center gap-2'>
                  <Link
                    href={collectionHref}
                    className='text-xs uppercase tracking-[0.18em] transition-colors'
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {categoryLabel}
                  </Link>
                  {product.bestSeller && <Badge variant='gold'>Best Seller</Badge>}
                  {product.newArrival && <Badge variant='ink'>New</Badge>}
                  {product.unique && <Badge variant='outline'>Unique</Badge>}
                </div>

                <h1 className='font-display text-4xl leading-tight text-ink sm:text-5xl'>{product.name}</h1>

                {product.description && (
                  <p className='mt-4 max-w-xl leading-relaxed text-muted'>{product.description}</p>
                )}

                <div className='mt-8 rounded-[var(--radius-card)] border border-line bg-canvas/80 p-5 sm:p-6'>
                  <ProductPurchase product={product} />
                </div>

                <ul className='mt-6 grid gap-2 text-sm text-muted sm:grid-cols-1'>
                  <li>• Alcohol-free concentrated attar oil</li>
                  <li>• Premium imported fragrance oils</li>
                  <li>• Delivery arranged directly on WhatsApp</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Notes + attributes */}
          <div className='mt-16 lg:mt-24'>
            <ProductAttributes product={product} />
          </div>

          {/* Reviews */}
          <div className='mt-16 lg:mt-20'>
            <ProductReviews productName={product.name} />
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className='mt-16 lg:mt-24'>
              <SectionHeader align='left' eyebrow='You may also like' title='Related Fragrances' />
              <ProductGrid products={related} />
            </div>
          )}

          {/* Recently viewed */}
          <RecentlyViewed currentSlug={product.slug} />
        </Container>
      </div>

      <StickyPurchaseBar product={product} />
    </>
  );
}
