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
      
      let ogImageUrl = `${site.url}/images/hero-banner.png`;
      if (p.images && p.images.length > 0 && p.images[0]) {
        const img = p.images[0];
        ogImageUrl = img.startsWith('http') ? img : `${site.url}${img.startsWith('/') ? '' : '/'}${img}`;
      }

      const categoryName = typeof p.category === 'object' ? p.category?.name : 'আতর';
      const description = p.description
        ? p.description.length > 160 ? p.description.slice(0, 157) + '...' : p.description
        : `${p.title} — ${site.name} থেকে ১০০% অ্যালকোহল-মুক্ত প্রিমিয়াম পারফিউম অয়েল আতর। দীর্ঘস্থায়ী সুবাস ও ঘ্রাণ।`;
      const canonicalUrl = `${site.url}/products/${p.slug}`;

      return {
        title: p.title,
        description: description,
        keywords: [p.title, categoryName, 'আতর', 'attar', 'perfume oil', 'alcohol-free', site.name],
        alternates: { canonical: `/products/${p.slug}` },
        openGraph: {
          type: 'article',
          title: `${p.title} | ${site.name}`,
          description: description,
          url: canonicalUrl,
          siteName: site.name,
          locale: site.locale,
          images: [
            {
              url: ogImageUrl,
              secureUrl: ogImageUrl,
              width: 1200,
              height: 630,
              type: 'image/png',
              alt: `${p.title} — ${site.name}`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${p.title} | ${site.name}`,
          description: description,
          images: [ogImageUrl],
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