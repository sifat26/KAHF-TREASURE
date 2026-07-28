import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { faqs } from '@/data/faq';
import { waLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about KAHF Treasure attar — alcohol-free formulation, sizes, ordering, longevity and delivery.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />

      <Container size="narrow" className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'FAQ', href: '/faq' },
          ]}
          className="mb-8"
        />
        <header className="mb-10 text-center">
          <span className="eyebrow mb-3 block">Good to know</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Frequently Asked Questions</h1>
          <span className="gold-rule mx-auto mt-5 block w-16" aria-hidden="true" />
        </header>

        <Accordion items={faqs} />

        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl text-ink">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Our team is happy to help you choose the right fragrance and answer anything about your
            order.
          </p>
          <ButtonLink href={waLink} external variant="primary" size="lg" className="mt-6">
            <WhatsAppIcon size={18} /> Ask us on WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
