'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { ProductCard } from '@/components/product/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/Section';
import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';

export function FavoritesClient({ allProducts }: { allProducts: Product[] }) {
  const { wishlist } = useEnquiryBag();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const favorites = mounted ? allProducts.filter((product) => wishlist.includes(product.slug)) : [];

  if (!mounted) {
    return (
      <div className='rounded-[var(--radius-card)] border border-line bg-surface/80 p-8 text-center text-muted shadow-[var(--shadow-card)]'>
        Loading your favorites...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className='rounded-[var(--radius-card)] border border-line bg-surface/80 p-8 text-center shadow-[var(--shadow-card)]'>
        <SectionHeader
          eyebrow='Saved Fragrances'
          title='No favorites yet'
          description='Tap the heart on any product to save it here for later comparison or gifting.'
          align='center'
          className='mb-0'
        />
        <div className='mt-8 flex justify-center'>
          <ButtonLink href='/shop' variant='gold' size='lg'>
            Browse Fragrances
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='eyebrow mb-3'>Saved Fragrances</p>
          <h2 className='font-display text-3xl text-ink sm:text-4xl'>
            {favorites.length} favorite{favorites.length === 1 ? '' : 's'}
          </h2>
        </div>
        <Link
          href='/shop'
          className='text-sm text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-deep)]'
        >
          Continue shopping
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
