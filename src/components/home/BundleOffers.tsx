'use client';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import Link from 'next/link';

const bundleOffers = [
  {
    title: 'নতুনদের ট্রায়াল সেট',
    description: 'প্রথমবার আতর নিচ্ছেন? ৩টি বেস্ট সেলার আতরের ছোট্ট সেট — ট্রাই করে দেখুন।',
    highlights: ['৩টি বেস্ট সেলার আতর', 'প্রতিদিনের জন্য মানানসই', 'উপহার দেওয়ারও উপযুক্ত'],
  },
  {
    title: 'উপহারের জুটি সেট',
    description: 'কারো জন্য উপহার দিতে চান? ২টি বাছাই করা আতর — সুন্দর প্যাকেজিংসহ।',
    highlights: ['২টি পছন্দের আতর', 'সুন্দর প্যাকেজিংসহ', 'যেকোনো উপলক্ষে মানানসই'],
  },
  {
    title: 'পূর্ণ কালেকশন সেট',
    description: 'যাঁরা প্রতিটি অনুষ্ঠানের জন্য আলাদা গন্ধ চান — তাঁদের জন্য বড় প্যাকেজ।',
    highlights: ['বিভিন্ন ধরনের আতর', 'বেশি নিলে ছাড় বেশি', 'আমাদের সাহায্যে বেছে নিন'],
  },
] as const;

export function BundleOffers() {
  return (
    <Section id='bundles' style={{ background: 'var(--color-surface)' }}>
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow='অফার ও প্যাকেজ'
            title='উপহার আর নিজের ব্যবহারের জন্য তৈরি প্যাকেজ'
            description='তৈরি প্যাকেজ থেকে বেছে নিন, কিংবা বলুন আপনার পছন্দ — আমরা সাজিয়ে দেব।'
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
                <span className='eyebrow mb-4 block'>বান্ডেল</span>
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
                  <span className='text-xs tracking-[0.06em] text-muted'>দাম চাহিদা অনুযায়ী</span>
                  <ButtonLink href='/contact' variant='outline' size='sm'>
                    জেনে নিন
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
              নিজের মতো করে উপহারের সেট চান? বাজেট আর পছন্দের সুবাসের ধরন বলুন — মানানসই মিশ্রণ
              বেছে দেব।
            </p>
            <Link
              href='/contact'
              className='text-sm font-semibold transition-colors'
              style={{ color: 'var(--color-gold)' }}
            >
              নিজের মতো বান্ডেল নিয়ে কথা বলুন →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
