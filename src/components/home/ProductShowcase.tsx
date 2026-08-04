'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { Product } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

interface ProductShowcaseProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  desktopCount?: number;
  mobileCount?: number;
}

export function ProductShowcase({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  desktopCount = 8,
  mobileCount = 8,
}: ProductShowcaseProps) {
  const railRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const updateScrollState = React.useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  React.useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = railRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!products.length) return null;

  return (
    <section className='bg-[var(--color-background)] py-16 text-[var(--color-text-primary)] sm:py-24'>
      <Container>
        <Reveal>
          <div className='mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6'>
            <div>
              {eyebrow && (
                <span className='mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]'>
                  {eyebrow}
                </span>
              )}
              <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]'>
                {title}
              </h2>
              {description && (
                <p className='mt-2 max-w-xl text-sm text-[var(--color-text-secondary)] sm:text-base'>{description}</p>
              )}
            </div>
            {viewAllHref && (
              <ButtonLink
                href={viewAllHref}
                variant='link'
                className='shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-deep)] sm:text-sm'
              >
                {viewAllLabel} →
              </ButtonLink>
            )}
          </div>
        </Reveal>

        {/* Desktop grid */}
        <div className='hidden lg:grid lg:grid-cols-4 lg:gap-6'>
          {products.slice(0, desktopCount).map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.06}>
              <ProductCard product={product} className='w-full h-full' />
            </Reveal>
          ))}
        </div>

        {/* Mobile + tablet: horizontal carousel */}
        <div className='relative lg:hidden -mx-4 px-4 sm:-mx-6 sm:px-6'>
          <div
            ref={railRef}
            className='flex gap-3.5 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 no-scrollbar'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.slice(0, mobileCount).map((product) => (
              <div key={product.slug} className='w-[210px] xs:w-[240px] sm:w-[280px] shrink-0 snap-start'>
                <ProductCard product={product} className='w-full h-full' />
              </div>
            ))}
          </div>

          {/* Arrow buttons for carousel */}
          <div className='mt-4 flex items-center justify-center gap-3'>
            <button
              type='button'
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--color-accent)]/15 transition-all'
              aria-label='Scroll left'
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type='button'
              onClick={() => scroll('right')}
              disabled={!canRight}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--color-accent)]/15 transition-all'
              aria-label='Scroll right'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
