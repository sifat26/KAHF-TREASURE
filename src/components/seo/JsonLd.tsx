import { contact, site } from '@/data/site';
import type { Product } from '@/data/products';
import { startingPrice } from '@/lib/format';

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
    email: contact.email,
    telephone: `+${contact.whatsapp}`,
    sameAs: [contact.facebook, `https://wa.me/${contact.whatsapp}`],
    areaServed: 'BD',
  };
  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const from = startingPrice(product.prices);
  const availability =
    product.status === 'available'
      ? 'https://schema.org/InStock'
      : product.status === 'coming-soon'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/OutOfStock';

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? site.description,
    category: product.category,
    brand: { '@type': 'Brand', name: site.name },
    url: `${site.url}/products/${product.slug}`,
  };

  if (from !== null) {
    data.offers = {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: from,
      availability,
      url: `${site.url}/products/${product.slug}`,
      seller: { '@type': 'Organization', name: site.name },
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
