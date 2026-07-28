import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { contact, mailLink, waLink } from '@/data/site';
import { WhatsAppIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { Mail } from 'lucide-react';

/** Final conversion band — every homepage should end with a clear CTA. */
export function ContactCta() {
  return (
    <Section className="bg-canvas">
      <Container size="narrow">
        <Reveal className="text-center">
          <span className="eyebrow mb-4 block">Here to help</span>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Not sure which fragrance is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Tell us what you love and the occasion — our team will recommend the perfect scent and
            help you place your order.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={waLink} external variant="primary" size="lg">
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </ButtonLink>
            <ButtonLink href={contact.facebook} external variant="secondary" size="lg">
              <FacebookIcon size={18} /> Facebook
            </ButtonLink>
            <ButtonLink href={mailLink} variant="secondary" size="lg">
              <Mail size={18} /> Email
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
