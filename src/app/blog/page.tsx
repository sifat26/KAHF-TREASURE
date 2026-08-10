import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/Section';
import { BreadcrumbJsonLd, ItemListJsonLd } from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { site } from '@/data/site';
import { toBanglaDigits } from '@/lib/format';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'ব্লগ — আতর গাইড ও সুগন্ধি শিক্ষা',
  description:
    'আতর নিয়ে সব — কীভাবে বেছে নেবেন, কীভাবে লাগাবেন, সুগন্ধির পরিবার, উপহারের গাইড আর আরও অনেক কিছু।',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `ব্লগ | ${site.name}`,
    description: 'আতর গাইড ও সুগন্ধি শিক্ষা — KAHF Treasure ব্লগ',
    url: `${site.url}/blog`,
  },
};

const categoryLabels: Record<string, string> = {
  guide: 'গাইড',
  'scent-notes': 'সুগন্ধির নোট',
  tips: 'টিপস',
  brand: 'ব্র্যান্ড',
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'ব্লগ', url: '/blog' },
        ]}
      />
      <ItemListJsonLd
        items={blogPosts.map(p => ({ name: p.title, url: `/blog/${p.slug}` }))}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'ব্লগ', href: '/blog' },
          ]}
          className="mb-8"
        />

        <SectionHeader
          eyebrow="জ্ঞান ভাণ্ডার"
          title="আতর ব্লগ"
          description="সুগন্ধির জগতে নতুন? নাকি পুরোনো প্রেমিক? আমাদের লেখাগুলো আপনাকে সাহায্য করবে সঠিক আতর বেছে নিতে।"
          align="center"
          className="mb-12"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(post => (
            <article
              key={post.slug}
              className="group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <span className="mb-3 inline-block rounded-full bg-[var(--color-accent-tint)] px-3 py-0.5 text-xs font-semibold text-[var(--color-accent-strong)]">
                {categoryLabels[post.category]}
              </span>
              <h2 className="font-serif text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-strong)] transition">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
                <span>{toBanglaDigits(post.readingTime)} মিনিট পড়া</span>
                <span>·</span>
                <span>{post.publishedAt}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
              >
                পড়ুন →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}