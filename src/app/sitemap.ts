import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { collections } from '@/data/collections';
import { policyList } from '@/data/policies';
import { blogPosts } from '@/data/blog';
import { productServices } from '@/services/product.services';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${site.url}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${site.url}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/track-order`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/favorites`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Collection routes
  const collectionRoutes: MetadataRoute.Sitemap = collections.map(c => ({
    url: `${site.url}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Policy routes
  const policyRoutes: MetadataRoute.Sitemap = policyList.map(p => ({
    url: `${site.url}/policies/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  // Blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic product routes from API
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await productServices.getProducts({ limit: 200, isActive: true });
    if (res.success && res.data) {
      productRoutes = res.data.map(p => ({
        url: `${site.url}/products/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Backend might be down during build — skip dynamic products
  }

  return [...staticRoutes, ...collectionRoutes, ...policyRoutes, ...blogRoutes, ...productRoutes];
}

