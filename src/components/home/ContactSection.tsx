import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/home/ContactForm';

export function ContactSection() {
  return (
    <section className="container mx-auto px-4 max-w-7xl py-20 animate-on-scroll" id="contact" aria-labelledby="contact-title">
      <SectionHeader title="Contact" id="contact-title" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto">
        {/* WhatsApp / Phone */}
        <a
          href="https://wa.me/8801681253714"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--gradient-card)] border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-[var(--shadow-gold)] backdrop-blur-md transition-all duration-[var(--transition-base)] hover:border-[rgba(201,168,76,0.3)] hover:shadow-[var(--shadow-gold-hover)] hover:-translate-y-1 relative p-6 flex flex-col items-center justify-center text-center gap-3 group"
          aria-label="Contact us via WhatsApp"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] text-[var(--color-gold-400)] transition-transform duration-[var(--transition-spring)] group-hover:scale-110 group-hover:bg-[var(--color-gold-500)] group-hover:text-[#060606]" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div className="font-sans text-[0.8rem] text-[var(--text-secondary)] font-medium tracking-[0.1em] uppercase">WhatsApp</div>
          <div className="font-sans text-[1.1rem] font-semibold text-white">01681253714</div>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/KAHFTreasure"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--gradient-card)] border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-[var(--shadow-gold)] backdrop-blur-md transition-all duration-[var(--transition-base)] hover:border-[rgba(201,168,76,0.3)] hover:shadow-[var(--shadow-gold-hover)] hover:-translate-y-1 relative p-6 flex flex-col items-center justify-center text-center gap-3 group"
          aria-label="Visit our Facebook page"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] text-[var(--color-gold-400)] transition-transform duration-[var(--transition-spring)] group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <div className="font-sans text-[0.8rem] text-[var(--text-secondary)] font-medium tracking-[0.1em] uppercase">Facebook</div>
          <div className="font-sans text-[1.1rem] font-semibold text-white">KAHF Treasure</div>
        </a>

        {/* Email */}
        <a
          href="mailto:kahftreasure@gmail.com"
          className="bg-[var(--gradient-card)] border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-[var(--shadow-gold)] backdrop-blur-md transition-all duration-[var(--transition-base)] hover:border-[rgba(201,168,76,0.3)] hover:shadow-[var(--shadow-gold-hover)] hover:-translate-y-1 relative p-6 flex flex-col items-center justify-center text-center gap-3 group sm:col-span-2 lg:col-span-1"
          aria-label="Email us"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] text-[var(--color-gold-400)] transition-transform duration-[var(--transition-spring)] group-hover:scale-110 group-hover:bg-[#EA4335] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]" aria-hidden="true">
            <Mail size={24} />
          </div>
          <div className="font-sans text-[0.8rem] text-[var(--text-secondary)] font-medium tracking-[0.1em] uppercase">Email</div>
          <div className="font-sans text-[0.95rem] font-semibold text-white">kahftreasure@gmail.com</div>
        </a>
      </div>

      <ContactForm />
    </section>
  );
}
