'use client';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import Link from 'next/link';

const bundleOffers = [
  {
    title: 'Starter Discovery Set',
    description: 'A compact trio for first-time buyers who want to explore our most versatile signatures.',
    highlights: ['3 best-selling attars', 'Ideal for daily wear', 'Gift-ready presentation'],
  },
  {
    title: 'Gift Pair Set',
    description: 'A refined matching pair designed for gifting, special occasions, and elegant impressions.',
    highlights: ['2 curated fragrances', 'Premium gift feel', 'Perfect for occasions'],
  },
  {
    title: 'Royal Wardrobe Set',
    description: 'A richer bundle for fragrance lovers who want a complete selection for every mood.',
    highlights: ['Multi-fragrance variety', 'Best value per ml', 'Personal consultation available'],
  },
] as const;

export function BundleOffers() {
  return (
    <Section id='bundles' style={{ background: 'var(--color-surface)' }}>
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow='Bundle Offers'
            title='Curated sets for gifting and daily use'
            description='Choose a ready-made set or ask us to help you build a custom bundle around your taste and occasion.'
            align='left'
          />
        </Reveal>

        <RevealGroup className='grid gap-5 lg:grid-cols-3'>
          {bundleOffers.map((bundle) => (
            <RevealItem key={bundle.title}>
              <article
                className='flex h-full flex-col border border-line bg-canvas p-6'
                style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
              >
                <span className='eyebrow mb-4 block'>Bundle</span>
                <h3 className='font-display text-2xl leading-tight text-ink'>{bundle.title}</h3>
                <p className='mt-3 text-sm leading-[1.8] text-muted'>{bundle.description}</p>

                <ul className='mt-6 space-y-3 text-sm text-ink-soft'>
                  {bundle.highlights.map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <span
                        className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full'
                        style={{ backgroundColor: 'var(--color-gold)' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className='mt-8 flex items-center justify-between gap-3 border-t border-line pt-5'>
                  <span className='text-xs uppercase tracking-[0.16em] text-muted'>Custom pricing</span>
                  <ButtonLink href='/contact' variant='outline' size='sm'>
                    Enquire Now
                  </ButtonLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <div
            className='mt-8 flex flex-wrap items-center justify-between gap-4 border border-line bg-surface/80 px-5 py-4'
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <p className='text-sm text-muted'>
              Want a custom gift set? Tell us the budget and fragrance style, and we will suggest the right mix.
            </p>
            <Link
              href='/contact'
              className='text-sm font-semibold transition-colors'
              style={{ color: 'var(--color-gold)' }}
            >
              Talk to us about a custom bundle →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
