import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { DataIcon } from '@/components/ui/DataIcon';
import { Reveal } from '@/components/ui/Reveal';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { brandStory, site, trustPoints } from '@/data/site';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'আমাদের কথা',
  description:
    'KAHF Treasure — বিদেশ থেকে আনা খাঁটি পারফিউম অয়েল দিয়ে তৈরি অ্যালকোহল-মুক্ত আতর। খাঁটি সুবাস, দীর্ঘস্থায়ী গন্ধ, আর আস্থার ব্র্যান্ড।',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'আমাদের কথা', url: '/about' },
        ]}
      />

      {/* Hero */}
      <section className="lux-vignette">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            items={[
              { name: 'হোম', href: '/' },
              { name: 'আমাদের কথা', href: '/about' },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <span className="eyebrow mb-4 block">আমাদের গল্প</span>
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              খাঁটি সুবাসের পেছনের গল্প
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.name} একটি প্রিমিয়াম অ্যালকোহল-মুক্ত আতর ও ইসলামিক লাইফস্টাইল ব্র্যান্ড। খাঁটি,
              দীর্ঘস্থায়ী সুবাস আপনার কাছে পৌঁছে দেওয়াই আমাদের কাজ — আর কেনাকাটার অভিজ্ঞতাটিও যেন
              সুবাসের মতোই যত্নে সাজানো হয়, সেটিই আমাদের চেষ্টা।
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section className="bg-canvas">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-card)] border border-line bg-surface p-8 lg:p-10">
            <h2 className="font-display text-2xl text-ink">যা করতে চাই</h2>
            <span className="gold-rule my-4 block w-12" aria-hidden="true" />
            <p className="leading-relaxed text-muted">{brandStory.mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-line bg-surface p-8 lg:p-10">
            <h2 className="font-display text-2xl text-ink">যেখানে যেতে চাই</h2>
            <span className="gold-rule my-4 block w-12" aria-hidden="true" />
            <p className="leading-relaxed text-muted">{brandStory.vision}</p>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-surface-2">
        <SectionHeader eyebrow="আমাদের নিয়ম" title="যেসব জিনিস আমরা ছাড়ি না" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brandStory.values.map((value, i) => (
            <Reveal
              key={value}
              delay={i * 0.05}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-canvas p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-[var(--color-gold-deep)]">
                <DataIcon name={trustPoints[i % trustPoints.length].icon} size={18} />
              </span>
              <span className="font-medium text-ink">{value}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <WhyChooseUs />

      {/* CTA */}
      <Section className="bg-surface-2">
        <Container size="narrow">
          <div className="rounded-[var(--radius-card)] border border-line bg-canvas p-10 text-center">
            <h2 className="font-display text-3xl text-ink">আপনার পছন্দের আতর খুঁজে নিন</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              কালেকশনটা একটু দেখে নিন। কনফিউশন থাকলে মেসেজ দিন — আমরা সাহায্য করব।
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/shop" variant="primary" size="lg">
                কালেকশন দেখুন
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                মেসেজ দিন
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
