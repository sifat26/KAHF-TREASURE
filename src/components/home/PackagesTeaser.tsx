'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/**
 * PackagesTeaser / Newsletter — Stay Updated banner matching the reference image.
 */
export function PackagesTeaser() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <Section style={{ background: '#0b0a08' }}>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-12 text-center sm:px-12 lg:py-16"
          style={{
            background: 'linear-gradient(180deg, #141210 0%, #0d0c0a 100%)',
            border: '1px solid rgba(200, 169, 106, 0.2)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Subtle warm center glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,169,106,0.1) 0%, transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span
              className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.25em]"
              style={{ color: '#c8a96a' }}
            >
              STAY UPDATED
            </span>

            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Join Our Fragrance Family
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-[#b8b1a5]">
              Get exclusive offers, new arrivals and fragrance tips directly to your inbox.
            </p>

            {subscribed ? (
              <div className="mt-8 rounded-lg bg-[#c8a96a]/15 p-4 border border-[#c8a96a]/30 text-sm font-semibold text-[#f5dd9e]">
                Thank you for joining our fragrance family!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-12 w-full max-w-md rounded-md border border-[#c8a96a]/20 bg-[#090807] px-4 text-sm text-white placeholder-[#8d8578] outline-none transition-colors focus:border-[#c8a96a]"
                />
                <button
                  type="submit"
                  className="h-12 w-full sm:w-auto rounded-md bg-[#c8a96a] px-8 text-xs font-bold uppercase tracking-[0.15em] text-[#0c0b09] transition-colors hover:bg-[#b89245]"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
