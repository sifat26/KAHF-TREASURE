import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getCollectionMedia } from '@/lib/collectionMedia';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/Section';
import { collections } from '@/data/collections';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fragrance Collections',
  description: 'Explore KAHF Treasure fragrance collections — Oud, Floral, Fruity, Fresh, Arabian and Woody.',
  alternates: { canonical: '/collections' },
};


export default function CollectionsPage() {
  return (
    <div className='min-h-screen select-none bg-[radial-gradient(circle_at_top,var(--color-accent-tint),transparent_20%),linear-gradient(180deg,var(--color-background)_0%,var(--color-surface)_100%)] pt-24 pb-16 text-[var(--color-text-primary)]'>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Collections', url: '/collections' },
        ]}
      />
      <Container className='py-6 lg:py-10'>
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Collections', href: '/collections' },
          ]}
          className='mb-6 text-xs text-(--color-text-secondary)'
        />
        <SectionHeader
          eyebrow='CURATED BY CHARACTER'
          title='Fragrance Libraries'
          description='Every fragrance has a unique personality. Explore our signature collections to discover the scent profile that defines your presence.'
          align='left'
          className='mb-12 max-w-3xl border-b border-line pb-8'
        />

        <RevealGroup className='grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6'>
          {collections.map((collection) => {
            const media = getCollectionMedia(collection.slug);

            return (
              <RevealItem key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className='group relative flex h-[180px] sm:h-[220px] flex-col items-center justify-between overflow-hidden rounded-2xl p-3.5 sm:p-5 text-center border border-[var(--color-accent)]/25 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/70 hover:shadow-[0_16px_36px_var(--t-scrim-strong)]'
                  aria-label={`${collection.title} Collection`}
                >
                  {/* Photorealistic Background Image */}
                  <Image
                    src={media.bgImage}
                    alt={`${collection.title} collection background`}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw'
                    priority
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.70] group-hover:brightness-[0.85]'
                  />

                  {/* Dark vignette. Anchored to --t-scrim-*, which stays dark in
                      both themes: the artwork is a dark photo and the label sits
                      on it in white, so fading into an ivory page background
                      would strand the text on a near-white card foot. */}
                  <div className='absolute inset-0 bg-linear-to-t from-[var(--t-scrim-strong)] via-[var(--t-scrim-soft)] to-[var(--t-scrim-soft)] pointer-events-none' />

                  {/* Wax Seal Emblem Stamp */}
                  <div
                    className={`relative z-10 my-auto flex h-11 w-11 items-center justify-center rounded-full border ${media.sealBorder} bg-linear-to-br ${media.sealBg} text-[var(--color-accent-strong)] shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className='text-[var(--color-accent-strong)]'>
                      {collection.slug === 'oud' ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <path d='M12 2L12 22M12 2C8 6 4 10 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 10 16 6 12 2Z' />
                        </svg>
                      ) : collection.slug === 'floral' ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <circle cx='12' cy='12' r='3' />
                          <path d='M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4z' />
                          <path d='M12 22a4 4 0 0 0 4-4c0-3-4-6-4-6s-4 3-4 6a4 4 0 0 0 4 4z' />
                        </svg>
                      ) : collection.slug === 'fruity' ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <circle cx='12' cy='13' r='7' />
                          <path d='M12 6V2M15 4L12 2' />
                        </svg>
                      ) : collection.slug === 'fresh' ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <path d='M11 20A9 9 0 0 0 20 11C20 5 13 2 13 2S14 8 9 11A9 9 0 0 0 11 20Z' />
                        </svg>
                      ) : collection.slug === 'arabian' ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <path d='M12 2L15 8H9L12 2Z' />
                          <rect x='7' y='8' width='10' height='11' rx='2' />
                        </svg>
                      ) : (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                        >
                          <path d='M12 3v18M6 8l6-5 6 5M4 14l8-5 8 5' />
                        </svg>
                      )}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className='relative z-10 mt-auto'>
                    <h3 className='font-sans text-base sm:text-lg font-extrabold uppercase tracking-[0.14em] on-media group-hover:text-[var(--color-accent)] transition-colors leading-none drop-shadow-md'>
                      {collection.title}
                    </h3>
                    <p className='mt-1.5 text-[0.62rem] sm:text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-strong)] transition-colors leading-none drop-shadow'>
                      Collection
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </div>
  );
}
