'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/theme/ThemeProvider';

/* ─────────────────────────────────────────────────────────────────
   KAHF Treasure — Hero v7  "CSS Luxury"
   NO photography background. Instead:
     • Rich radial-gradient base (dark velvet / warm ivory)
     • Giant ghost "KAHF" watermark text
     • Slowly-rotating Islamic geometric SVG mandala
     • Floating gold sparkle particles
     • Product bottle floating on the CSS backdrop
   ───────────────────────────────────────────────────────────────── */

/* 8-pointed Islamic star (khatam) — pre-calculated polygon points */
const STAR_OUTER =
  'M300,50 L340,203 L477,123 L397,260 L550,300 L397,340 ' +
  'L477,477 L340,397 L300,550 L260,397 L123,477 L203,340 ' +
  'L50,300 L203,260 L123,123 L260,203 Z';

const STAR_INNER =
  'M300,168 L321,249 L392,208 L351,279 L432,300 L351,321 ' +
  'L392,392 L321,351 L300,432 L279,351 L208,392 L249,321 ' +
  'L168,300 L249,279 L208,208 L279,249 Z';

const PARTICLES = [
  { x: '8%',  y: '14%', r: 2.8, d: 0 },
  { x: '18%', y: '78%', r: 1.8, d: 0.9 },
  { x: '42%', y: '10%', r: 2.2, d: 0.5 },
  { x: '55%', y: '88%', r: 1.6, d: 1.6 },
  { x: '68%', y: '18%', r: 2.0, d: 0.3 },
  { x: '82%', y: '62%', r: 2.5, d: 1.2 },
  { x: '91%', y: '36%', r: 1.4, d: 0.7 },
  { x: '76%', y: '82%', r: 2.0, d: 1.9 },
  { x: '32%', y: '52%', r: 1.2, d: 2.3 },
  { x: '62%', y: '48%', r: 1.5, d: 0.4 },
];

const STATS = [
  { val: '৫০+',  label: 'আতরের সংগ্রহ' },
  { val: '১০০%', label: 'খাঁটি অয়েল' },
  { val: '৯৮%',  label: 'সন্তুষ্ট গ্রাহক' },
];

export function Hero() {
  const reduce    = useReducedMotion();
  const { theme } = useTheme();
  const isDark    = theme === 'dark';

  /* ── Per-theme raw values ── */
  const G = isDark
    ? {
        /* background */
        baseBg:
          'radial-gradient(ellipse 130% 110% at 70% 44%,' +
          '#27190a 0%,#150e05 45%,#090604 100%)',
        orb1: 'radial-gradient(ellipse 55% 65% at 74% 46%,' +
              'rgba(200,169,106,.28) 0%,rgba(170,120,45,.07) 55%,transparent 78%)',
        orb2: 'radial-gradient(ellipse 38% 28% at 28% 76%,' +
              'rgba(140,95,30,.13) 0%,transparent 62%)',
        orb3: 'radial-gradient(ellipse 25% 20% at 12% 22%,' +
              'rgba(100,70,18,.08) 0%,transparent 55%)',
        mandalaColor: '#c8a96a',
        mandalaOpacity: 0.14,
        ghostOpacity: 0.038,
        ghostColor: '#c8a96a',
        particleColor: '#c8a96a',
        bottomFade: 'linear-gradient(to bottom,transparent,#090604)',
        /* typography */
        h1: '#f3ede0',
        h1Accent: '#f0c56a',
        divider: 'rgba(200,169,106,.8)',
        body: '#bdb5a8',
        bodyAccent: '#d4b574',
        eyebrow: '#c8a96a',
        eyebrowBorder: 'rgba(200,169,106,.35)',
        eyebrowBg: 'rgba(200,169,106,.08)',
        badge: '#c8a96a',
        badgeBorder: 'rgba(200,169,106,.28)',
        badgeBg: 'rgba(200,169,106,.07)',
        /* CTAs */
        ctaABg: 'linear-gradient(130deg,#8c6c1a 0%,#e8ca78 48%,#a87a22 100%)',
        ctaAColor: '#0c0904',
        ctaAGlow: '0 0 32px rgba(200,169,106,.45),0 6px 18px rgba(0,0,0,.55)',
        ctaBBorder: 'rgba(200,169,106,.42)',
        ctaBColor: '#d4b574',
        ctaBBg: 'rgba(200,169,106,.06)',
        /* stats */
        statsBg: 'rgba(10,7,4,.82)',
        statsBorder: 'rgba(200,169,106,.26)',
        statsShadow: '0 8px 36px rgba(0,0,0,.65)',
        statsVal: '#f0c56a',
        statsLabel: 'rgba(200,169,106,.6)',
        statsDivider: 'rgba(200,169,106,.18)',
        /* scroll */
        scrollBorder: 'rgba(200,169,106,.3)',
        scrollDot: '#c8a96a',
        scrollLabel: 'rgba(200,169,106,.46)',
        /* bottle */
        bottleFilter:
          'drop-shadow(0 20px 60px rgba(200,169,106,.48)) ' +
          'drop-shadow(0 2px 12px rgba(0,0,0,.9))',
        groundGlow:
          'radial-gradient(ellipse,rgba(200,169,106,.55) 0%,transparent 70%)',
        outerGlow:
          'radial-gradient(ellipse 70% 80% at center,' +
          'rgba(200,169,106,.22) 0%,rgba(200,169,106,.06) 50%,transparent 78%)',
      }
    : {
        baseBg:
          'radial-gradient(ellipse 130% 110% at 70% 44%,' +
          '#ede0c5 0%,#f6f0e4 45%,#faf7f0 100%)',
        orb1: 'radial-gradient(ellipse 55% 65% at 74% 46%,' +
              'rgba(210,175,110,.35) 0%,rgba(200,165,90,.1) 55%,transparent 78%)',
        orb2: 'radial-gradient(ellipse 38% 28% at 28% 76%,' +
              'rgba(180,145,70,.18) 0%,transparent 62%)',
        orb3: 'radial-gradient(ellipse 25% 20% at 12% 22%,' +
              'rgba(200,170,100,.12) 0%,transparent 55%)',
        mandalaColor: '#8a6a1f',
        mandalaOpacity: 0.1,
        ghostOpacity: 0.055,
        ghostColor: '#8a6a1f',
        particleColor: '#b8921e',
        bottomFade: 'linear-gradient(to bottom,transparent,#faf7f0)',
        h1: '#1c1408',
        h1Accent: '#6b4c10',
        divider: 'rgba(138,106,31,.75)',
        body: '#4a3e28',
        bodyAccent: '#7a5c18',
        eyebrow: '#7a5c18',
        eyebrowBorder: 'rgba(138,106,31,.32)',
        eyebrowBg: 'rgba(138,106,31,.07)',
        badge: '#7a5c18',
        badgeBorder: 'rgba(138,106,31,.26)',
        badgeBg: 'rgba(138,106,31,.06)',
        ctaABg: 'linear-gradient(130deg,#5e4010 0%,#b58428 48%,#705018 100%)',
        ctaAColor: '#fffdf5',
        ctaAGlow: '0 0 28px rgba(138,106,31,.32),0 6px 18px rgba(60,40,10,.28)',
        ctaBBorder: 'rgba(138,106,31,.4)',
        ctaBColor: '#7a5c18',
        ctaBBg: 'rgba(138,106,31,.06)',
        statsBg: 'rgba(255,253,244,.9)',
        statsBorder: 'rgba(138,106,31,.2)',
        statsShadow: '0 8px 36px rgba(60,40,10,.15)',
        statsVal: '#54380e',
        statsLabel: 'rgba(138,106,31,.65)',
        statsDivider: 'rgba(138,106,31,.16)',
        scrollBorder: 'rgba(138,106,31,.28)',
        scrollDot: '#8a6a1f',
        scrollLabel: 'rgba(138,106,31,.44)',
        bottleFilter:
          'drop-shadow(0 20px 60px rgba(138,106,31,.32)) ' +
          'drop-shadow(0 2px 12px rgba(60,40,10,.38))',
        groundGlow:
          'radial-gradient(ellipse,rgba(138,106,31,.4) 0%,transparent 70%)',
        outerGlow:
          'radial-gradient(ellipse 70% 80% at center,' +
          'rgba(200,160,80,.22) 0%,rgba(200,160,80,.05) 50%,transparent 78%)',
      };

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial:    { opacity: 0, y: 22 },
          animate:    { opacity: 1, y: 0  },
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay,
          },
        };

  return (
    <section
      className='relative flex min-h-screen items-center overflow-hidden select-none'
      aria-label='KAHF Treasure প্রিমিয়াম আতর'
      style={{ background: G.baseBg, paddingTop: 'var(--nav-h)' }}
    >

      {/* ══ 1. GRADIENT ATMOSPHERE ══ */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0' style={{ background: G.orb1 }} />
        <div className='absolute inset-0' style={{ background: G.orb2 }} />
        <div className='absolute inset-0' style={{ background: G.orb3 }} />
      </div>

      {/* ══ 2. GHOST WATERMARK: CLEAN ARABIC CALLIGRAPHY & TYPOGRAPHY ══ */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start overflow-hidden pl-0 sm:pl-8 lg:pl-16 xl:pl-24'
        style={{ opacity: isDark ? 0.12 : 0.08 }}
      >
        <div
          className='flex flex-col items-center lg:items-start text-center lg:text-left leading-none'
          style={{ transform: 'rotate(-3deg)', userSelect: 'none' }}
        >

          {/* Large Arabic Calligraphy: كَنْزُ الْكَهْف (KAHF TREASURE) */}
          <span
            className='font-bold tracking-normal'
            style={{
              fontSize: 'clamp(55px, 10vw, 160px)',
              color: G.ghostColor,
              lineHeight: 1.05,
              direction: 'rtl',
              fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
            }}
          >
            كَنْزُ الْكَهْف
          </span>

          {/* Subtitle: KAHF TREASURE */}
          <span
            className='font-serif font-bold tracking-[0.38em] uppercase mt-2'
            style={{
              fontSize: 'clamp(14px, 2.5vw, 36px)',
              color: G.ghostColor,
              lineHeight: 1,
            }}
          >
            KAHF TREASURE
          </span>

          {/* Arabic Tagline: قَطْرَةٌ مِنْ ذَهَبٍ ، تَصِيرُ الأَرْضُ مَلَكِيَّة */}
          <span
            className='font-medium mt-2 tracking-widest'
            style={{
              fontSize: 'clamp(9px, 1.1vw, 15px)',
              color: G.ghostColor,
              direction: 'rtl',
              fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
            }}
          >
            قَطْرَةٌ مِنْ ذَهَبٍ ، تَصِيرُ الأَرْضُ مَلَكِيَّة
          </span>
        </div>
      </div>

      {/* ══ 3. ISLAMIC GEOMETRIC MANDALA (SVG, slowly rotating) ══ */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute'
        style={{
          right:     '-2%',
          top:       '50%',
          width:     'min(60vw, 660px)',
          height:    'min(60vw, 660px)',
          transform: 'translateY(-50%)',
        }}
      >
        <motion.div
          className='w-full h-full'
          style={{ opacity: G.mandalaOpacity, color: G.mandalaColor }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox='0 0 600 600' fill='none' className='w-full h-full'>
            {/* Outer dashed ring */}
            <circle cx='300' cy='300' r='293' stroke='currentColor' strokeWidth='.6' strokeDasharray='3 7' />
            <circle cx='300' cy='300' r='276' stroke='currentColor' strokeWidth='.3' />

            {/* 8 axis lines */}
            <line x1='300' y1='7'   x2='300' y2='593' stroke='currentColor' strokeWidth='.28' opacity='.7'/>
            <line x1='7'   y1='300' x2='593' y2='300' stroke='currentColor' strokeWidth='.28' opacity='.7'/>
            <line x1='93'  y1='93'  x2='507' y2='507' stroke='currentColor' strokeWidth='.28' opacity='.7'/>
            <line x1='507' y1='93'  x2='93'  y2='507' stroke='currentColor' strokeWidth='.28' opacity='.7'/>

            {/* Large 8-pointed star */}
            <path d={STAR_OUTER} stroke='currentColor' strokeWidth='1.4' />

            {/* Circle at outer star tip radius */}
            <circle cx='300' cy='300' r='253' stroke='currentColor' strokeWidth='.4' />
            <circle cx='300' cy='300' r='218' stroke='currentColor' strokeWidth='.3' strokeDasharray='2 4' />

            {/* Mid decorative ring */}
            <circle cx='300' cy='300' r='186' stroke='currentColor' strokeWidth='.5' />

            {/* Small 8-pointed star */}
            <path d={STAR_INNER} stroke='currentColor' strokeWidth='.9' />

            {/* Inner concentric rings */}
            <circle cx='300' cy='300' r='130' stroke='currentColor' strokeWidth='.4' />
            <circle cx='300' cy='300' r='100' stroke='currentColor' strokeWidth='.5' />
            <circle cx='300' cy='300' r='62'  stroke='currentColor' strokeWidth='.6' strokeDasharray='2 3' />
            <circle cx='300' cy='300' r='36'  stroke='currentColor' strokeWidth='.9' />
            <circle cx='300' cy='300' r='15'  stroke='currentColor' strokeWidth='1.1' />
            <circle cx='300' cy='300' r='4'   fill='currentColor' opacity='.6' />

            {/* 8 accent circles at outer star points */}
            {[[300,50],[477,123],[550,300],[477,477],[300,550],[123,477],[50,300],[123,123]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r='5.5' stroke='currentColor' strokeWidth='.8' />
            ))}

            {/* 8 accent circles at mid ring intercepts */}
            {[[300,114],[414,186],[486,300],[414,414],[300,486],[186,414],[114,300],[186,186]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r='3' stroke='currentColor' strokeWidth='.6' />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* ══ 4. GOLD SPARKLE PARTICLES ══ */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full'
            style={{ left: p.x, top: p.y, width: p.r, height: p.r, background: G.particleColor }}
            animate={reduce ? {} : { opacity: [0, .85, 0], scale: [.5, 1.3, .5] }}
            transition={{ duration: 3.2 + i * 0.38, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ══ 5. CONTENT GRID ══ */}
      <div
        className='relative z-10 w-full mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-20'
        style={{ maxWidth: '90rem' }}
      >
        <div className='grid lg:grid-cols-12 items-center gap-8'>

          {/* ── LEFT: Copy ── */}
          <div className='lg:col-span-6 xl:col-span-5 flex flex-col items-start'>

            {/* Eyebrow pill */}
            <motion.div {...fadeUp(0)} className='mb-7'>
              <span
                className='inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase'
                style={{ borderColor: G.eyebrowBorder, background: G.eyebrowBg, color: G.eyebrow }}
              >
                <span className='h-1.5 w-1.5 rounded-full animate-pulse flex-shrink-0' style={{ background: G.eyebrow }} />
                KAHF TREASURE · প্রিমিয়াম আতর
              </span>
            </motion.div>

            {/* H1 — solid colour only, no clip tricks */}
            <motion.h1
              className='font-serif mb-7'
              style={{
                fontSize:   'clamp(2.5rem, 5vw, 4.4rem)',
                lineHeight: 1.14,
                color:      G.h1,
              }}
              {...fadeUp(0.1)}
            >
              খাঁটি সুবাসে{' '}
              <span style={{ color: G.h1Accent }}>লুকিয়ে আছে</span>
              <br />
              আপনার পরিচয়
            </motion.h1>

            {/* Ornamental divider */}
            <motion.div
              className='flex items-center gap-4 mb-7'
              aria-hidden='true'
              {...fadeUp(0.18)}
            >
              <div className='h-px w-20 flex-shrink-0' style={{ background: `linear-gradient(90deg,transparent,${G.divider})` }} />
              <svg viewBox='0 0 30 30' className='w-4 h-4 flex-shrink-0' fill='none'>
                <polygon points='15,1 18,10 27,10 20,16 23,25 15,20 7,25 10,16 3,10 12,10'
                  stroke={G.divider} strokeWidth='1' fill='none' opacity='.9'/>
                <circle cx='15' cy='15' r='3.5' stroke={G.divider} strokeWidth='.8'/>
              </svg>
              <div className='h-px w-20 flex-shrink-0' style={{ background: `linear-gradient(90deg,${G.divider},transparent)` }} />
            </motion.div>

            {/* Description */}
            <motion.p
              className='text-sm sm:text-[.975rem] leading-[1.95] mb-8 max-w-[43ch]'
              style={{ color: G.body }}
              {...fadeUp(0.24)}
            >
              বিদেশ থেকে আনা খাঁটি পারফিউম অয়েল দিয়ে তৈরি।{' '}
              <strong className='font-semibold' style={{ color: G.bodyAccent }}>
                কোনো অ্যালকোহল নেই
              </strong>
              , কোনো ভেজাল নেই। গন্ধ থাকে ঘণ্টার পর ঘণ্টা — ত্বকে আর কাপড়ে।
            </motion.p>

            {/* Trust micro-badges */}
            <motion.div className='flex flex-wrap gap-2 mb-9' {...fadeUp(0.3)}>
              {['১০০% অ্যালকোহল-মুক্ত', 'আসল পারফিউম অয়েল', 'সারাদেশে ডেলিভারি'].map((label) => (
                <span
                  key={label}
                  className='inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.67rem] font-semibold border'
                  style={{ background: G.badgeBg, borderColor: G.badgeBorder, color: G.badge }}
                >
                  <svg viewBox='0 0 6 6' className='w-1 h-1 flex-shrink-0' fill={G.badge}>
                    <circle cx='3' cy='3' r='3'/>
                  </svg>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'
              {...fadeUp(0.36)}
            >
              <Link
                href='/shop'
                id='hero-cta-shop'
                className='inline-flex items-center justify-center rounded-full px-9 py-3.5 text-[0.78rem] font-bold tracking-[0.07em] transition-all duration-300 hover:-translate-y-px hover:brightness-105 active:scale-[0.98]'
                style={{ background: G.ctaABg, color: G.ctaAColor, boxShadow: G.ctaAGlow }}
              >
                আতর দেখুন →
              </Link>
              <Link
                href='/collections'
                id='hero-cta-collections'
                className='inline-flex items-center justify-center rounded-full border px-9 py-3.5 text-[0.78rem] font-bold tracking-[0.07em] transition-all duration-300 hover:-translate-y-px active:scale-[0.98]'
                style={{ borderColor: G.ctaBBorder, color: G.ctaBColor, background: G.ctaBBg }}
              >
                কালেকশন দেখুন
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Product bottle on CSS backdrop ── */}
          <div
            className='hidden lg:flex lg:col-span-6 xl:col-span-7 items-center justify-center relative'
            style={{ minHeight: '560px' }}
          >
            {/* Ambient glow ring behind bottle */}
            <div
              className='absolute inset-0 pointer-events-none'
              style={{ background: G.outerGlow }}
            />

            {/* Floating animated bottle */}
            <motion.div
              className='relative z-10'
              style={{ filter: G.bottleFilter }}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={reduce ? {} : { opacity: 1, y: [20, 0, -16, 0] }}
              transition={reduce ? {} : {
                opacity: { duration: 1, delay: 0.4 },
                y: { duration: 6, times: [0, 0.15, 0.5, 1], repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
              }}
            >
              <Image
                src='/images/hero-perfume-bottle.png'
                alt='KAHF Treasure signature attar bottle'
                width={400}
                height={540}
                priority
                className='object-contain'
                style={{ maxHeight: '66vh', width: 'auto' }}
              />
            </motion.div>

            {/* Ground glow ellipse */}
            <div
              className='absolute bottom-12 left-1/2 -translate-x-1/2 w-52 h-8 rounded-full pointer-events-none'
              style={{ background: G.groundGlow, filter: 'blur(18px)' }}
            />

            {/* Stats card */}
            <motion.div
              className='absolute bottom-8 right-0 z-20 flex items-center gap-5 rounded-2xl border px-5 py-4 backdrop-blur-md'
              style={{ background: G.statsBg, borderColor: G.statsBorder, boxShadow: G.statsShadow }}
              initial={reduce ? {} : { opacity: 0, y: 18 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {STATS.map(({ val, label }, i) => (
                <div
                  key={i}
                  className={`text-center ${i > 0 ? 'border-l pl-5' : ''}`}
                  style={{ borderColor: G.statsDivider }}
                >
                  <p className='text-[1.3rem] font-bold leading-none' style={{ color: G.statsVal }}>{val}</p>
                  <p className='text-[0.57rem] uppercase tracking-[0.06em] mt-1' style={{ color: G.statsLabel }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* ══ 6. SCROLL INDICATOR ══ */}
      <motion.div
        className='hidden lg:flex items-center gap-3 absolute bottom-8 left-16 z-20'
        initial={reduce ? {} : { opacity: 0 }}
        animate={reduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden='true'
      >
        <div
          className='relative flex h-9 w-5 items-start justify-center rounded-full border pt-1.5'
          style={{ borderColor: G.scrollBorder }}
        >
          <motion.div
            className='h-2 w-0.5 rounded-full'
            style={{ background: G.scrollDot }}
            animate={reduce ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span
          className='text-[0.6rem] tracking-[0.14em] font-bold uppercase'
          style={{ color: G.scrollLabel }}
        >
          Scroll
        </span>
      </motion.div>

      {/* ══ 7. BOTTOM PAGE FADE ══ */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute bottom-0 inset-x-0 h-28 z-10'
        style={{ background: G.bottomFade }}
      />
    </section>
  );
}
