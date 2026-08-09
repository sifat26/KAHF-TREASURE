'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { ProductCard } from '@/components/product/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/Section';
import type { Product } from '@/data/products';
import { toBanglaDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';

/**
 * "Have we hydrated yet?" as an external store. The wishlist lives in
 * localStorage, so the server render cannot know it; gating on this keeps the
 * first client render identical to the server's without a setState-in-effect.
 */
const neverChanges = () => () => {};

export function FavoritesClient({ allProducts }: { allProducts: Product[] }) {
  const { wishlist } = useEnquiryBag();
  const mounted = React.useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

  const favorites = mounted ? allProducts.filter((product) => wishlist.includes(product.slug)) : [];

  if (!mounted) {
    return (
      <div className='rounded-[var(--radius-card)] border border-line bg-surface/80 p-8 text-center text-muted shadow-[var(--shadow-card)]'>
        আপনার পছন্দের তালিকা লোড হচ্ছে…
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className='rounded-[var(--radius-card)] border border-line bg-surface/80 p-8 text-center shadow-[var(--shadow-card)]'>
        <SectionHeader
          eyebrow='সংরক্ষিত সুগন্ধি'
          title='এখনও কিছু পছন্দ করা হয়নি'
          description='যেকোনো পণ্যের হার্ট আইকনে চাপ দিলে সেটি এখানে জমা থাকবে — পরে মিলিয়ে দেখতে বা উপহার বেছে নিতে কাজে লাগবে।'
          align='center'
          className='mb-0'
        />
        <div className='mt-8 flex justify-center'>
          <ButtonLink href='/shop' variant='gold' size='lg'>
            সুগন্ধি ঘুরে দেখুন
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='eyebrow mb-3'>সংরক্ষিত সুগন্ধি</p>
          <h2 className='font-display text-3xl text-ink sm:text-4xl'>
            {toBanglaDigits(favorites.length)}টি পছন্দের সুগন্ধি
          </h2>
        </div>
        <Link
          href='/shop'
          className='text-sm text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-deep)]'
        >
          কেনাকাটা চালিয়ে যান
        </Link>
      </div>

      <div className={cn('grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
        {favorites.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
