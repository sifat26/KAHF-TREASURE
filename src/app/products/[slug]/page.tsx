import { productServices } from '@/services/product.services';
import { DynamicProductDetail } from '@/components/product/DynamicProductDetail';
import { ApiProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { site } from '@/data/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await productServices.getProduct(slug);
    if (res.success && res.data) {
      const p = res.data;
      const ogImage = p.images?.[0] || `${site.url}/images/exact-attar-bottle.png`;
      const categoryName = typeof p.category === 'object' ? p.category?.name : 'আতর';
      return {
        title: p.title,
        description: p.description || `${p.title} — ${site.name} থেকে ১০০% অ্যালকোহল-মুক্ত প্রিমিয়াম আতর।`,
        keywords: [p.title, categoryName, 'আতর', 'attar', 'perfume oil', 'alcohol-free', site.name],
        alternates: { canonical: `/products/${p.slug}` },
        openGraph: {
          type: 'website',
          title: `${p.title} | ${site.name}`,
          description: p.description || `${p.title} — প্রিমিয়াম আতর`,
          url: `${site.url}/products/${p.slug}`,
          images: [{ url: ogImage, width: 1200, height: 1200, alt: p.title }],
          siteName: site.name,
          locale: site.locale,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${p.title} | ${site.name}`,
          description: p.description || '',
          images: [ogImage],
        },
      };
    }
  } catch {}
  return {
    title: 'পণ্য পাওয়া যায়নি',
    description: 'এই পণ্যটি খুঁজে পাওয়া যায়নি। আমাদের সব আতর দেখতে শপে যান।',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch product server-side for JSON-LD (the client component fetches it again for interactivity)
  let product = null;
  try {
    const res = await productServices.getProduct(slug);
    if (res.success && res.data) {
      product = res.data;
    }
  } catch {
    // Backend might be down — the client component will handle the error
  }

  if (!product) {
    return <DynamicProductDetail slug={slug} />;
  }

  return (
    <>
      <ApiProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'শপ', url: '/shop' },
          { name: product.title, url: `/products/${product.slug}` },
        ]}
      />
      <DynamicProductDetail slug={slug} initialProduct={product} />
    </>
  );
}