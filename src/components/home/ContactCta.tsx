import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { contact, mailLink, waLink } from '@/data/site';
import { WhatsAppIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { Mail } from 'lucide-react';

/**
 * ContactCta — final conversion section.
 * Minimal, editorial. Centered layout with 3 clean contact actions.
 */
export function ContactCta() {
  return (
    <Section style={{ background: 'var(--color-surface)' }}>
      <Container size="narrow">
        <Reveal className="text-center">
          <span className="eyebrow mb-5 block">আমরা আছি আপনার পাশে</span>
          <h2
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            কোন আতরটা আপনার মানাবে — বুঝতে পারছেন না?
          </h2>

          <div
            className="mx-auto my-8 h-px w-12"
            style={{ background: 'var(--color-accent)', opacity: 0.4 }}
            aria-hidden="true"
          />

          <p
            className="mx-auto max-w-lg text-lg leading-[1.8]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            আপনার পছন্দ আর উপলক্ষটা বলুন — আমাদের টিম মানানসই সুবাস বেছে দেবে আর অর্ডার
            করতেও সাহায্য করবে।
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={waLink}
              external
              variant="gold"
              size="lg"
              className="rounded-[14px] font-semibold"
            >
              <WhatsAppIcon size={18} /> WhatsApp-এ মেসেজ দিন
            </ButtonLink>
            <ButtonLink
              href={contact.facebook}
              external
              variant="outline"
              size="lg"
              className="rounded-[14px] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
            >
              <FacebookIcon size={18} /> Facebook
            </ButtonLink>
            <ButtonLink
              href={mailLink}
              variant="outline"
              size="lg"
              className="rounded-[14px] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
            >
              <Mail size={18} /> ইমেইল করুন
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
