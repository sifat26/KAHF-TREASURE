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

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story behind KAHF Treasure — a premium alcohol-free attar brand built on authenticity, quality and trust.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />

      {/* Hero */}
      <section className="lux-vignette">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <span className="eyebrow mb-4 block">Our Story</span>
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              The essence of elegance, crafted with care
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.name} is a premium alcohol-free attar and Islamic lifestyle brand, dedicated to
              bringing you authentic, long-lasting fragrances with a shopping experience that feels
              as considered as the scents themselves.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section className="bg-canvas">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-card)] border border-line bg-surface p-8 lg:p-10">
            <h2 className="font-display text-2xl text-ink">Our Mission</h2>
            <span className="gold-rule my-4 block w-12" aria-hidden="true" />
            <p className="leading-relaxed text-muted">{brandStory.mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-line bg-surface p-8 lg:p-10">
            <h2 className="font-display text-2xl text-ink">Our Vision</h2>
            <span className="gold-rule my-4 block w-12" aria-hidden="true" />
            <p className="leading-relaxed text-muted">{brandStory.vision}</p>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-surface-2">
        <SectionHeader eyebrow="What we stand for" title="Our Values" />
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
            <h2 className="font-display text-3xl text-ink">Discover your signature scent</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Explore our collections or message us for a personal recommendation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/shop" variant="primary" size="lg">
                Shop Fragrances
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
