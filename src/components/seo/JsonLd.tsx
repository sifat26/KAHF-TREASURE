import { contact, site } from '@/data/site';
import type { Product as ApiProduct } from '@/types/product';

/**
 * Structured data (schema.org) rendered as native <script type="application/ld+json">.
 * Per Next.js guidance, JSON is escaped to prevent XSS via "<".
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    logo: `${site.url}/images/logo-shield.png`,
    email: contact.email,
    telephone: `+${contact.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contact.addressLine || 'ঢাকা',
      addressCountry: 'BD',
    },
    sameAs: [
      contact.facebook,
      contact.instagram || `https://instagram.com/${contact.facebookHandle}`,
      `https://wa.me/${contact.whatsapp}`,
    ],
    areaServed: 'BD',
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${contact.whatsapp}`,
    email: contact.email,
    image: `${site.url}/images/logo-shield.png`,
    logo: `${site.url}/images/logo-shield.png`,
    priceRange: '৳100 - ৳2000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: contact.addressLine || 'ঢাকা',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.8103,
      longitude: 90.4125,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '22:00',
    }],
    sameAs: [
      contact.facebook,
      `https://wa.me/${contact.whatsapp}`,
    ],
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
  };
  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: 'bn-BD',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Product JSON-LD from the API Product type (database-driven).
 * Used on /products/[slug] pages where data comes from the backend.
 */
export function ApiProductJsonLd({ product }: { product: ApiProduct }) {
  const availability = product.isActive
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const offers = product.variants && product.variants.length > 0
    ? product.variants.map(v => ({
        '@type': 'Offer',
        priceCurrency: 'BDT',
        price: v.priceOverride || product.basePrice,
        availability: v.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `${site.url}/products/${product.slug}`,
        seller: { '@type': 'Organization', name: site.name },
        sku: v.sku || undefined,
      }))
    : [{
        '@type': 'Offer',
        priceCurrency: 'BDT',
        price: product.basePrice,
        availability,
        url: `${site.url}/products/${product.slug}`,
        seller: { '@type': 'Organization', name: site.name },
      }];

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || `${product.title} — ${site.name}`,
    url: `${site.url}/products/${product.slug}`,
    image: product.images?.length ? product.images : [`${site.url}/images/exact-attar-bottle.png`],
    brand: { '@type': 'Brand', name: product.brand || site.name },
    sku: product.sku || undefined,
    category: typeof product.category === 'object' ? product.category?.name : undefined,
    offers: offers.length === 1 ? offers[0] : offers,
  };

  // Add aggregate rating if reviews exist
  if (product.averageRating && (product.reviewCount || 0) > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${site.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * ItemList JSON-LD for collection/shop pages — helps Google understand
 * a group of related products.
 */
export function ItemListJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${site.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * Article JSON-LD for blog posts.
 */
export function ArticleJsonLd({ article }: {
  article: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    updatedAt?: string;
    author?: string;
  };
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${site.url}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { '@type': 'Organization', name: article.author || site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/images/logo-shield.png` },
    },
    inLanguage: 'bn-BD',
  };
  return <JsonLd data={data} />;
}

