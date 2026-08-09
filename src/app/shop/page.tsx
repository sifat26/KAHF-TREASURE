import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/Section';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DynamicShopClient } from '@/components/shop/DynamicShopClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'সব আতর',
  description: '১০০% অ্যালকোহল-মুক্ত খাঁটি আতরের কালেকশন — সব ধরনের সুগন্ধি এক জায়গায়। সেরা দামে অরিজিনাল পণ্য অর্ডার করুন।',
  alternates: { canonical: '/shop' },
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q, category } = await searchParams;

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,var(--color-accent-tint),transparent_22%),linear-gradient(180deg,var(--color-background)_0%,var(--color-surface)_100%)] pt-24 pb-16 text-[var(--color-text-primary)]'>
      <BreadcrumbJsonLd items={[{ name: 'হোম', url: '/' }, { name: 'শপ', url: '/shop' }]} />
      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[{ name: 'হোম', href: '/' }, { name: 'শপ', href: '/shop' }]}
          className='mb-6 text-xs text-[var(--color-text-secondary)]'
        />
        <SectionHeader
          eyebrow='সব আতর'
          title='সব আতর'
          description='আমাদের সব আতর এক জায়গায় — আপনার পছন্দের সুগন্ধি খুঁজে নিন এবং সহজেই অর্ডার করুন।'
          align='left'
          className='mb-10 max-w-3xl border-b border-line pb-8'
        />
        <Suspense fallback={<div className='py-24 text-center text-[var(--color-accent)]'>পণ্য লোড হচ্ছে...</div>}>
          <DynamicShopClient searchQuery={q} categoryFilter={category} />
        </Suspense>
      </Container>
    </div>
  );
}
