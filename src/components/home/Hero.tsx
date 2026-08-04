'use client';

import { motion, useReducedMotion, type MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero — full-width luxury editorial hero matching the exact reference image.
 * Left: Eyebrow, H1 title, ornamental gold divider, description, luxury gold CTAs.
 * Right: Product photo blended into the dark background (no visible card/box edge).
 */
export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0): MotionProps =>
    reduce
      ? {}
      : {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: 'easeOut', delay },
        };

  return (
    <section
      className='relative min-h-[85vh] flex items-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:min-h-[92vh] lg:pt-36 lg:pb-24 select-none'
      style={{ background: 'var(--t-hero-bed)' }}
    >
      {/* ── Full banner backdrop ──
          The banner art is a dark studio shot, so these scrims stay dark in both
          themes and the headline stays light-on-dark. The --t-scrim* tokens shift
          with the theme so the fade still resolves into the page background. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'linear-gradient(90deg, var(--t-scrim-strong) 0%, var(--t-scrim) 22%, var(--t-scrim) 38%, var(--t-scrim-soft) 61%, transparent 78%, var(--t-scrim) 100%), radial-gradient(ellipse 65% 75% at 76% 28%, var(--color-accent-tint) 0%, transparent 82%)',
        }}
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 72% 80%, var(--color-accent-tint) 0%, transparent 74%)',
        }}
      />

      <div aria-hidden='true' className='pointer-events-none absolute inset-0' style={{ zIndex: 1 }}>
        <div className='absolute inset-y-0 right-0 w-full sm:w-[85%] lg:w-[78%] overflow-hidden'>
          <Image
            src='/images/hero_banner.png'
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover opacity-90 sm:opacity-95 lg:opacity-100'
            style={{ objectPosition: '75% center' }}
          />
          <div
            className='absolute inset-0'
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, transparent 52%, var(--t-scrim-soft) 100%), radial-gradient(circle at 72% 38%, var(--color-accent-tint), transparent 18%)',
            }}
            aria-hidden='true'
          />
        </div>

        {/* Lightweight translucent overlay on mobile to keep bottle bright & visible while preserving contrast */}
        <div
          className='absolute inset-0 lg:hidden'
          style={{
            background:
              'linear-gradient(180deg, var(--t-scrim-soft) 0%, transparent 40%, var(--t-scrim) 100%), linear-gradient(90deg, var(--t-scrim) 0%, transparent 100%)',
          }}
        />

        {/* Desktop smooth side gradient */}
        <div
          className='hidden lg:block absolute inset-y-0 left-0 w-[62%]'
          style={{
            background:
              'linear-gradient(90deg, var(--t-scrim-strong) 0%, var(--t-scrim) 50%, var(--t-scrim-soft) 78%, transparent 100%)',
          }}
        />
      </div>

      <div className='relative z-10 mx-auto w-full px-4 sm:px-8 lg:px-12' style={{ maxWidth: '82.5rem' }}>
        <div className='grid items-center lg:grid-cols-12'>
          <div className='relative z-20 flex flex-col items-start max-w-xl py-6 sm:py-10 lg:col-span-6 lg:py-16'>
            <motion.span
              className='mb-3 sm:mb-4 text-[0.65rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.24em] sm:tracking-[0.26em] media-halo-sm'
              style={{ color: 'var(--color-gold)' }}
              {...fadeUp(0)}
            >
              PREMIUM ALCOHOL-FREE ATTAR
            </motion.span>

            <motion.h1
              className='font-serif text-3xl font-medium leading-[1.12] tracking-tight on-media sm:text-5xl lg:text-[4.15rem] media-halo'
              {...fadeUp(0.08)}
            >
              A Drop of Gold,
              <br />
              The Earth Turns Royal
            </motion.h1>

            <motion.div className='my-5 sm:my-7 flex items-center gap-3 sm:gap-3.5' {...fadeUp(0.14)} aria-hidden='true'>
              <div className='h-px w-14 sm:w-20 bg-linear-to-r from-transparent via-[var(--color-gold)]/60 to-[var(--color-gold)]' />
              <svg
                viewBox='0 0 24 24'
                className='h-4 w-4 sm:h-5 sm:w-5 fill-current opacity-90'
                style={{ color: 'var(--color-gold)' }}
              >
                <polygon points='12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9' />
                <circle cx='12' cy='12' r='2.5' fill='var(--color-background-deep)' />
              </svg>
              <div className='h-px w-14 sm:w-20 bg-linear-to-l from-transparent via-[var(--color-gold)]/60 to-[var(--color-gold)]' />
            </motion.div>

            <motion.p
              className='max-w-md text-sm leading-relaxed on-media-soft sm:text-lg font-sans media-halo'
              {...fadeUp(0.2)}
            >
              Experience the richness of authentic attars crafted with the finest imported oils for everyday elegance
              and special moments.
            </motion.p>

            <motion.div
              className='mt-6 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto'
              {...fadeUp(0.26)}
            >
              <Link
                href='/shop'
                className='inline-flex w-full sm:w-auto items-center justify-center rounded bg-[var(--color-gold)] px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-on-accent)] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center'
              >
                SHOP COLLECTION
              </Link>
              <Link
                href='/collections'
                className='inline-flex w-full sm:w-auto items-center justify-center rounded border border-[var(--color-border-strong)] bg-transparent px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] on-media-soft on-media-hover hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-tint)] transition-all text-center'
              >
                EXPLORE ATTARS
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


