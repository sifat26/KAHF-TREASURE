import { productServices } from '@/services/product.services';
import { DynamicProductDetail } from '@/components/product/DynamicProductDetail';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await productServices.getProduct(slug);
    if (res.success && res.data) {
      return {
        title: res.data.title,
        description: res.data.description || `${res.data.title} — KAHF Treasure`,
      };
    }
  } catch {}
  return { title: 'পণ্য' };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicProductDetail slug={slug} />;
}
