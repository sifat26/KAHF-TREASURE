import { Section, SectionHeader } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { faqs } from '@/data/faq';

/** A short FAQ excerpt on the homepage; full list lives at /faq. */
export function FaqPreview() {
  return (
    <Section className="bg-surface-2">
      <Container size="narrow">
        <SectionHeader
          eyebrow="Good to know"
          title="Frequently asked questions"
        />
        <Accordion items={faqs.slice(0, 5)} />
        <div className="mt-8 text-center">
          <ButtonLink href="/faq" variant="secondary">
            View all questions
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
