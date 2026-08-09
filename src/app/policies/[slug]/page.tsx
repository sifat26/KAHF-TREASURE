import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { policies, policyList, isPlaceholder } from '@/data/policies';
import { waLink } from '@/data/site';

export function generateStaticParams() {
  return policyList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = policies[slug as keyof typeof policies];
  if (!doc) return { title: 'নীতিমালাটি খুঁজে পাওয়া যায়নি' };
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/policies/${doc.slug}` },
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = policies[slug as keyof typeof policies];
  if (!doc) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'হোম', url: '/' },
          { name: doc.title, url: `/policies/${doc.slug}` },
        ]}
      />
      <Container size="narrow" className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'হোম', href: '/' },
            { name: doc.title, href: `/policies/${doc.slug}` },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{doc.title}</h1>
          <span className="gold-rule my-5 block w-16" aria-hidden="true" />
          <p className="text-muted">{doc.intro}</p>
        </header>

        <div className="flex flex-col gap-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-ink">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((para, i) =>
                  isPlaceholder(para) ? (
                    <p
                      key={i}
                      className="rounded-[var(--radius-input)] border border-dashed border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 px-4 py-3 text-sm text-[var(--color-accent-hover)]"
                    >
                      {para}
                    </p>
                  ) : (
                    <p key={i} className="leading-relaxed text-muted">
                      {para}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-surface p-6 text-center">
          <p className="text-muted">এই নীতিমালা নিয়ে কোনো প্রশ্ন আছে?</p>
          <ButtonLink href={waLink} external variant="secondary" className="mt-4">
            <WhatsAppIcon size={18} /> WhatsApp-এ জিজ্ঞেস করুন
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
