import { Container } from '@/components/ui/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { collections } from '@/data/collections';
import Image from 'next/image';
import Link from 'next/link';

/** Mapping of real photorealistic background images & seal badge colors */
const collectionMedia: Record<string, { bgImage: string; sealBg: string; sealBorder: string }> = {
  oud: {
    bgImage: '/images/collection-oud.png',
    sealBg: 'from-[#c8a96a]/40 via-[#59441a]/60 to-[#1e1607]/90',
    sealBorder: 'border-[#c8a96a]/70',
  },
  floral: {
    bgImage: '/images/collection-floral.png',
    sealBg: 'from-[#b82e46]/60 via-[#661220]/70 to-[#240409]/90',
    sealBorder: 'border-[#e26b80]/70',
  },
  fruity: {
    bgImage: '/images/collection-fruity.png',
    sealBg: 'from-[#c85a20]/60 via-[#66280b]/70 to-[#240c03]/90',
    sealBorder: 'border-[#e28850]/70',
  },
  fresh: {
    bgImage: '/images/collection-fresh.png',
    sealBg: 'from-[#1c7844]/60 via-[#0d3b20]/70 to-[#03140a]/90',
    sealBorder: 'border-[#4ec480]/70',
  },
  arabian: {
    bgImage: '/images/collection-arabian.png',
    sealBg: 'from-[#c8a96a]/50 via-[#59441a]/60 to-[#1e1607]/90',
    sealBorder: 'border-[#c8a96a]/80',
  },
  woody: {
    bgImage: '/images/collection-woody.png',
    sealBg: 'from-[#9a6e42]/50 via-[#4a341e]/70 to-[#1a1109]/90',
    sealBorder: 'border-[#c8a96a]/60',
  },
};

/** Featured 6 signature collections grid matching reference image layout. */
export function CollectionsShowcase() {
  return (
    <Section className='select-none bg-[var(--color-background)] py-16 text-white sm:py-24'>
      <Container>
        {/* Section Header matching other homepage sections */}
        <Reveal>
          <div className='mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6'>
            <div>
              <span className='mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]'>
                EXPLORE OUR COLLECTIONS
              </span>
              <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white'>
                Curated Fragrance Libraries
              </h2>
              <p className='mt-2 max-w-xl text-sm text-[var(--color-text-secondary)] sm:text-base'>
                Discover scents grouped by character — from fresh daily wear to deep, luxurious oud.
              </p>
            </div>
            <Link
              href='/collections'
              className='shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-deep)] sm:text-sm'
            >
              View All Collections →
            </Link>
          </div>
        </Reveal>

        {/* 6 Realistic Collection Cards */}
        <RevealGroup className='grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'>
          {collections.map((collection) => {
            const media = collectionMedia[collection.slug] ?? collectionMedia.oud;

            return (
              <RevealItem key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className='group relative flex h-[180px] sm:h-[220px] lg:h-[250px] flex-col items-center justify-between overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] p-3.5 sm:p-5 text-center shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]'
                  aria-label={`${collection.title} Collection`}
                >
                  {/* Realistic Background Image */}
                  <Image
                    src={media.bgImage}
                    alt={`${collection.title} collection background`}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw'
                    priority
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.70] group-hover:brightness-[0.85]'
                  />

                  {/* Dark Vignette Overlay for Crisp Contrast */}
                  <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[var(--color-background)] via-black/40 to-black/25' />

                  {/* Middle Wax Seal Emblem Stamp */}
                  <div
                    className={`relative z-10 my-auto flex h-10 w-10 items-center justify-center rounded-full border ${media.sealBorder} bg-linear-to-br ${media.sealBg} text-[var(--color-gold)] shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11`}
                  >
                    <span className='text-[var(--color-gold)]'>
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

                  {/* Bottom Title & Subtitle */}
                  <div className='relative z-10 mt-auto'>
                    <h3 className='font-sans text-base font-extrabold uppercase tracking-[0.14em] text-white transition-colors leading-none drop-shadow-md group-hover:text-[var(--color-gold)] sm:text-lg'>
                      {collection.title}
                    </h3>
                    <p className='mt-1.5 text-[0.62rem] font-medium tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors leading-none drop-shadow group-hover:text-[var(--color-text-primary)] sm:text-[0.68rem]'>
                      Collection
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
