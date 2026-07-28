import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { products } from '@/data/products';
import { collections } from '@/data/collections';
import { policyList } from '@/data/policies';

/** Programmatic sitemap covering every static + dynamic route. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/shop'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/collections'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: url('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: url(`/collections/${c.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const policyRoutes: MetadataRoute.Sitemap = policyList.map((p) => ({
    url: url(`/policies/${p.slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...policyRoutes];
}
