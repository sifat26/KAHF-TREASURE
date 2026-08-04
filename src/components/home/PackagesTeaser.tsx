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
    <Section style={{ background: 'var(--color-background-deep)' }}>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-12 text-center sm:px-12 lg:py-16"
          style={{
            background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-background-deep) 100%)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 12px 32px var(--t-scrim)',
          }}
        >
          {/* Subtle warm center glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, var(--color-accent-tint) 0%, transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span
              className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'var(--color-accent)' }}
            >
              STAY UPDATED
            </span>

            <h2 className="font-display text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              Join Our Fragrance Family
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-secondary)]">
              Get exclusive offers, new arrivals and fragrance tips directly to your inbox.
            </p>

            {subscribed ? (
              <div className="mt-8 rounded-lg bg-[var(--color-accent)]/15 p-4 border border-[var(--color-accent)]/30 text-sm font-semibold text-[var(--color-accent-strong)]">
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
                  className="h-12 w-full max-w-md rounded-md border border-[var(--color-accent)]/20 bg-[var(--color-background-deep)] px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-muted)] outline-none transition-colors focus:border-[var(--color-accent)]"
                />
                <button
                  type="submit"
                  className="h-12 w-full sm:w-auto rounded-md bg-[var(--color-accent)] px-8 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-background-deep)] transition-colors hover:bg-[var(--color-accent-hover)]"
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
