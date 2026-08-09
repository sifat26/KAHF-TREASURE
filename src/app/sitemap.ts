import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${site.url}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/track-order`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
