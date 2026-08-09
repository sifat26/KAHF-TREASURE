'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { contact, footerNav, mailLink, site, telLink, waLink } from '@/data/site';
import { toBanglaDigits } from '@/lib/format';
import { FacebookIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <Container className="py-16 lg:py-24">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-xs">
            <Link href="/" aria-label={`${site.name} — হোম`}>
              <span
                className="font-display text-2xl tracking-[0.18em]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                KAHF{' '}
                <span style={{ color: 'var(--color-accent)' }}>TREASURE</span>
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-[1.8]"
              style={{ color: 'var(--color-muted)' }}
            >
              {site.tagline}. {site.description}
            </p>

            <div className="mt-7">
              <p
                className="mb-3 text-[0.65rem] font-medium tracking-[0.06em]"
                style={{ color: 'var(--color-muted)' }}
              >
                আমাদের তালিকায় যোগ দিন
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:contents">
            <FooterColumn title="শপ"       links={footerNav.shop}     />
            <FooterColumn title="আমাদের কথা" links={footerNav.company}  />
            <FooterColumn title="নীতিমালা"   links={footerNav.policies} />
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-16 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {/* Contact */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            <a
              href={telLink}
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-muted)')
              }
            >
              <Phone size={14} /> {contact.phoneDisplay}
            </a>
            <a
              href={mailLink}
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-muted)')
              }
            >
              <Mail size={14} /> {contact.email}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <SocialLink href={waLink} label="WhatsApp">
              <WhatsAppIcon size={17} />
            </SocialLink>
            <SocialLink href={contact.facebook} label="Facebook">
              <FacebookIcon size={17} />
            </SocialLink>
            <SocialLink href={mailLink} label="ইমেইল" external={false}>
              <Mail size={17} />
            </SocialLink>
          </div>
        </div>

        {/* Legal */}
        <div
          className="mt-8 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{ color: 'var(--color-muted)' }}
        >
          <p>© {toBanglaDigits(year)} {site.name}. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>প্রিমিয়াম অ্যালকোহল-মুক্ত আতর · বাংলাদেশে যত্নে তৈরি</p>
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
      <h2
        className="mb-5 text-[0.65rem] font-semibold tracking-[0.06em]"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-muted)')
              }
            >
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
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
      style={{
        border: '1px solid var(--color-border)',
        color: 'var(--color-muted)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'var(--color-accent)';
        el.style.color = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'var(--color-border)';
        el.style.color = 'var(--color-muted)';
      }}
      {...extra}
    >
      {children}
    </a>
  );
}
