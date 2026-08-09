import { Section, SectionHeader } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { faqs } from '@/data/faq';

/** A short FAQ excerpt on the homepage; full list lives at /faq. */
export function FaqPreview() {
  return (
    <Section style={{ background: 'var(--color-background)' }}>
      <Container size="narrow">
        <SectionHeader
          eyebrow="জানতে চান?"
          title="সাধারণ জিজ্ঞাসা"
        />
        <Accordion items={faqs.slice(0, 5)} />
        <div className="mt-10 text-center">
          <ButtonLink
            href="/faq"
            variant="outline"
            className="rounded-[14px] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
          >
            সব প্রশ্ন দেখুন
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
