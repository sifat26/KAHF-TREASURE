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
      style={{ background: 'var(--color-background)' }}
    >
      {/* ── Full banner backdrop ── */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(15, 15, 13, 0.99) 0%, rgba(15, 15, 13, 0.97) 22%, rgba(15, 15, 13, 0.88) 38%, rgba(15, 15, 13, 0.46) 61%, rgba(15, 15, 13, 0.16) 78%, rgba(15, 15, 13, 0.92) 100%), radial-gradient(ellipse 65% 75% at 76% 28%, rgba(200, 169, 106, 0.24) 0%, rgba(60, 42, 14, 0.1) 42%, transparent 82%)',
        }}
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 72% 80%, rgba(200, 169, 106, 0.14) 0%, transparent 74%)',
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
            className='absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,7,0.0)_0%,rgba(9,8,7,0.0)_52%,rgba(9,8,7,0.08)_70%,rgba(9,8,7,0.42)_100%),radial-gradient(circle_at_72%_38%,rgba(200,169,106,0.15),transparent_18%),radial-gradient(circle_at_80%_72%,rgba(200,169,106,0.08),transparent_14%)]'
            aria-hidden='true'
          />
        </div>

        {/* Lightweight translucent overlay on mobile to keep bottle bright & visible while preserving contrast */}
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,13,0.50)_0%,rgba(15,15,13,0.30)_40%,rgba(15,15,13,0.65)_100%),linear-gradient(90deg,rgba(15,15,13,0.65)_0%,rgba(15,15,13,0.25)_100%)] lg:hidden' />

        {/* Desktop smooth side gradient */}
        <div className='hidden lg:block absolute inset-y-0 left-0 w-[62%] bg-[linear-gradient(90deg,rgba(15,15,13,0.98)_0%,rgba(15,15,13,0.94)_50%,rgba(15,15,13,0.58)_78%,rgba(15,15,13,0.0)_100%)]' />
      </div>

      <div className='relative z-10 mx-auto w-full px-4 sm:px-8 lg:px-12' style={{ maxWidth: '82.5rem' }}>
        <div className='grid items-center lg:grid-cols-12'>
          <div className='relative z-20 flex flex-col items-start max-w-xl py-6 sm:py-10 lg:col-span-6 lg:py-16'>
            <motion.span
              className='mb-3 sm:mb-4 text-[0.65rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.24em] sm:tracking-[0.26em] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]'
              style={{ color: 'var(--color-gold)' }}
              {...fadeUp(0)}
            >
              PREMIUM ALCOHOL-FREE ATTAR
            </motion.span>

            <motion.h1
              className='font-serif text-3xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[4.15rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]'
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
                <circle cx='12' cy='12' r='2.5' fill='#090807' />
              </svg>
              <div className='h-px w-14 sm:w-20 bg-linear-to-l from-transparent via-[var(--color-gold)]/60 to-[var(--color-gold)]' />
            </motion.div>

            <motion.p
              className='max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-lg font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
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
                className='inline-flex w-full sm:w-auto items-center justify-center rounded bg-[var(--color-gold)] px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-background)] shadow-xl shadow-[rgba(200,169,106,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all text-center'
              >
                SHOP COLLECTION
              </Link>
              <Link
                href='/collections'
                className='inline-flex w-full sm:w-auto items-center justify-center rounded border border-[var(--color-border)] bg-transparent px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-gold-tint)] transition-all text-center'
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


