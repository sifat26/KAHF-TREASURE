import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { faqs } from '@/data/faq';
import { waLink } from '@/data/site';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'সাধারণ জিজ্ঞাসা',
  description:
    'KAHF Treasure-এর আতর নিয়ে সাধারণ প্রশ্নের উত্তর — অ্যালকোহল-মুক্ত ফর্মুলা, সাইজ, অর্ডার, স্থায়িত্ব আর ডেলিভারি।',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: 'সাধারণ জিজ্ঞাসা', url: '/faq' },
        ]}
      />

      <Container size="narrow" className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: 'সাধারণ জিজ্ঞাসা', href: '/faq' },
          ]}
          className="mb-8"
        />
        <header className="mb-10 text-center">
          <span className="eyebrow mb-3 block">জেনে রাখা ভালো</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">সাধারণ জিজ্ঞাসা</h1>
          <span className="gold-rule mx-auto mt-5 block w-16" aria-hidden="true" />
        </header>

        <Accordion items={faqs} />

        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl text-ink">আরও কিছু জানতে চান?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            মানানসই সুগন্ধি বেছে নিতে কিংবা অর্ডার নিয়ে যেকোনো প্রশ্নে আমাদের টিম সাহায্য করতে
            প্রস্তুত।
          </p>
          <ButtonLink href={waLink} external variant="primary" size="lg" className="mt-6">
            <WhatsAppIcon size={18} /> WhatsApp-এ জিজ্ঞেস করুন
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
