import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { contact, footerNav, mailLink, site, telLink, waLink } from '@/data/site';
import { FacebookIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface" role="contentinfo">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Link href="/" aria-label={`${site.name} — home`}>
              <span className="font-display text-2xl tracking-[0.15em] text-ink">
                KAHF <span className="text-[var(--color-gold-deep)]">TREASURE</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.tagline}. {site.description}</p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Join our list
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Shop" links={footerNav.shop} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Policies" links={footerNav.policies} />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Contact + social */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <a href={telLink} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
              <Phone size={15} /> {contact.phoneDisplay}
            </a>
            <a href={mailLink} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
              <Mail size={15} /> {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <SocialLink href={waLink} label="WhatsApp">
              <WhatsAppIcon size={18} />
            </SocialLink>
            <SocialLink href={contact.facebook} label="Facebook">
              <FacebookIcon size={18} />
            </SocialLink>
            <SocialLink href={mailLink} label="Email" external={false}>
              <Mail size={18} />
            </SocialLink>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Premium alcohol-free attar · Handcrafted in Bangladesh</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-ink">{title}</h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white"
      {...extra}
    >
      {children}
    </a>
  );
}
