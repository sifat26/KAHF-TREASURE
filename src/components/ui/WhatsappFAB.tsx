import { waLink } from '@/data/site';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';

/** Floating WhatsApp action — always-available contact (brand-consistent). */
export function WhatsappFAB() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 ease-[var(--ease-lux)] hover:scale-105"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
