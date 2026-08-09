'use client';

import { usePathname } from 'next/navigation';
import { waLink } from '@/data/site';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';

/** Floating WhatsApp action — always-available contact shortcut. */
export function WhatsappFAB() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-এ মেসেজ দিন"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 ease-[var(--ease-lux)] hover:scale-105"
      style={{
        background: 'var(--color-whatsapp)',
        boxShadow: '0 4px 20px var(--t-shadow-fab)',
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
