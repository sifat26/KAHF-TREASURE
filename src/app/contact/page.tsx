import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';
import { WhatsAppIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { contact, mailLink, telLink, waLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with KAHF Treasure via WhatsApp, Facebook, phone or email — we’re here to help you find your perfect fragrance.',
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    label: 'WhatsApp',
    value: contact.whatsappDisplay,
    href: waLink,
    external: true,
    icon: <WhatsAppIcon size={22} />,
    highlight: true,
  },
  {
    label: 'Phone',
    value: contact.phoneDisplay,
    href: telLink,
    external: false,
    icon: <Phone size={22} />,
  },
  {
    label: 'Facebook',
    value: contact.facebookHandle,
    href: contact.facebook,
    external: true,
    icon: <FacebookIcon size={22} />,
  },
  {
    label: 'Email',
    value: contact.email,
    href: mailLink,
    external: false,
    icon: <Mail size={22} />,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Contact', href: '/contact' },
          ]}
          className="mb-8"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: intro + channels */}
          <div>
            <span className="eyebrow mb-3 block">We’re here to help</span>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">Get in touch</h1>
            <p className="mt-4 max-w-md text-muted">
              Have a question about a fragrance, an order, or a gift? Reach us on your favourite
              channel — WhatsApp is the fastest way to order.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {channels.map((ch) => {
                const extra = ch.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <li key={ch.label}>
                    <a
                      href={ch.href}
                      {...extra}
                      className={
                        'flex items-center gap-4 rounded-[var(--radius-card)] border p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ' +
                        (ch.highlight
                          ? 'border-[var(--color-gold)]/40 bg-[var(--color-gold-soft)]/30'
                          : 'border-line bg-canvas')
                      }
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-[var(--color-gold-deep)]">
                        {ch.icon}
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                          {ch.label}
                        </span>
                        <span className="font-medium text-ink">{ch.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Placeholders for data not defined in source docs */}
            {(!contact.addressLine || !contact.businessHours) && (
              <p className="mt-6 text-xs text-muted">
                {/* Business address, hours, Instagram and Google Maps are not yet
                    provided in the business documentation. Add them to
                    src/data/site.ts when available. */}
                Business address & hours coming soon.
              </p>
            )}
          </div>

          {/* Right: form */}
          <div className="rounded-[var(--radius-card)] border border-line bg-canvas p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="font-display text-2xl text-ink">Send us a message</h2>
            <p className="mt-1 mb-6 text-sm text-muted">
              We usually respond within a few hours during business hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
