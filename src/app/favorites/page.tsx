import { FavoritesClient } from '@/components/bag/FavoritesClient';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { products } from '@/data/products';
import type { Metadata } from 'next';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'পছন্দের তালিকা',
  description: 'KAHF Treasure-এর যে আতরগুলো আপনি সংরক্ষণ করেছেন।',
  alternates: { canonical: '/favorites' },
};

export default function FavoritesPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,var(--color-accent-tint),transparent_22%),linear-gradient(180deg,var(--color-background)_0%,var(--color-surface)_100%)] pt-24 pb-16 text-[var(--color-text-primary)]'>
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'পছন্দের তালিকা', url: '/favorites' },
        ]}
      />

      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'পছন্দের তালিকা', href: '/favorites' },
          ]}
          className='mb-6 text-xs text-(--color-text-secondary)'
        />

        <div className='mb-10 max-w-3xl border-b border-line pb-8'>
          <span className='eyebrow mb-4 block'>আপনার বাছাই</span>
          <h1 className='font-display text-4xl font-semibold leading-[1.1] text-(--color-text-primary) sm:text-5xl lg:text-[3rem]'>
            পছন্দের তালিকা
          </h1>
          <p className='mt-5 max-w-2xl text-base leading-[1.8] text-(--color-text-secondary)'>
            পছন্দের আতরগুলো এক জায়গায় রাখুন — মিলিয়ে দেখুন, বাছাই করুন, কিংবা পরে এসে আবার দেখে নিন।
          </p>
        </div>

        <FavoritesClient allProducts={products} />
      </Container>
    </div>
  );
}
