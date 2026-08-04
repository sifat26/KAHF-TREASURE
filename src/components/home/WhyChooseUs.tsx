'use client';

import { ProductBottle } from '@/components/ui/ProductBottle';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { CheckCircle2, Play } from 'lucide-react';

/**
 * WhyChooseUs — split layout matching the reference image.
 * Left: Atmospheric luxury media showcase with bottle and play button.
 * Right: Headline, description, and 2-column gold checkmark list.
 */
export function WhyChooseUs() {
  const points = [
    'Alcohol-Free & Skin Friendly',
    'Elegant & Unique Blends',
    'Premium Imported Oils',
    'Perfect for Every Occasion',
    'Long Lasting Fragrance',
    'Trusted by Thousands',
  ];

  return (
    <Section style={{ background: 'var(--color-background)' }}>
      <div className='mx-auto max-w-[1280px]'>
        <div className='grid items-center gap-12 lg:grid-cols-12'>
          {/* Left: Atmospheric Showcase Container */}
          <Reveal className='lg:col-span-5'>
            <div className='group relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]'>
              {/* Bottle in Media Frame */}
              <ProductBottle
                name='KAHF Treasure'
                family='oud'
                showBackground={true}
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />

              {/* Play Button Overlay */}
              <div className='absolute inset-0 flex items-center justify-center bg-[var(--t-scrim-soft)] backdrop-blur-[1px] transition-colors group-hover:bg-[var(--t-scrim-soft)]'>
                <button
                  type='button'
                  aria-label='Play brand video'
                  className='flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-card)]/80 text-[var(--color-gold)] shadow-lg transition-transform duration-300 group-hover:scale-110'
                >
                  <Play size={20} className='ml-1 fill-[var(--color-gold)]' />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <Reveal className='lg:col-span-7'>
            <div className='flex flex-col items-start lg:pl-6'>
              <span
                className='mb-2 text-[0.68rem] font-bold uppercase tracking-[0.25em]'
                style={{ color: 'var(--color-gold)' }}
              >
                WHY CHOOSE KAHF TREASURE
              </span>

              <h2 className='font-display text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.6rem]'>
                The Essence of Purity & Luxury
              </h2>

              <p className='mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]'>
                Kahf Treasure offers premium alcohol-free attars crafted with the world&apos;s finest imported oils. Our
                fragrances are designed to leave a lasting impression for everyday elegance and royal moments.
              </p>

              {/* 2-Column Checklist */}
              <div className='mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
                {points.map((point) => (
                  <div key={point} className='flex items-center gap-3'>
                    <CheckCircle2 size={18} className='shrink-0 text-[var(--color-gold)]' />
                    <span className='text-sm font-medium text-[var(--color-text-primary)]'>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
