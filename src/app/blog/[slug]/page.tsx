import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { site } from '@/data/site';
import { toBanglaDigits } from '@/lib/format';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'লেখা পাওয়া যায়নি' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.title, 'আতর', 'attar', 'সুগন্ধি', 'গাইড', site.name],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <>
      <ArticleJsonLd article={{...post, description: post.excerpt}} />
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'ব্লগ', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Container size="narrow" className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'ব্লগ', href: '/blog' },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {post.title}
          </h1>
          <span className="gold-rule my-5 block w-16" aria-hidden="true" />
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)]">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span>{toBanglaDigits(post.readingTime)} মিনিট পড়া</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-8">
            {post.excerpt}
          </p>
          <article className="leading-relaxed text-[var(--color-text-secondary)] space-y-4">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="font-display text-2xl text-[var(--color-text-primary)] mt-8 mb-2">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="font-serif text-xl text-[var(--color-text-primary)] mt-6 mb-2">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-6 text-[var(--color-text-secondary)]">{line.replace('- ', '')}</li>;
              }
              if (line.trim() === '') return null;
              return <p key={i} className="text-[var(--color-text-secondary)]">{line}</p>;
            })}
          </article>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <h2 className="font-display text-2xl text-[var(--color-text-primary)]">আপনার পছন্দের আতর খুঁজে নিন</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">এই লেখা থেকে আইডিয়া নিয়ে এখনই অর্ডার করুন।</p>
          <ButtonLink href="/shop" variant="primary" size="lg" className="mt-4">
            শপে যান
          </ButtonLink>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-[var(--color-text-primary)] mb-6">সম্পর্কিত লেখা</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition hover:border-[var(--color-accent)]"
                >
                  <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-strong)]">
                    {rp.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}