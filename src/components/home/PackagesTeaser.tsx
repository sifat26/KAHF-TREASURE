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
              className="mb-2 block text-[0.68rem] font-bold tracking-[0.06em]"
              style={{ color: 'var(--color-accent)' }}
            >
              যোগাযোগে থাকুন
            </span>

            <h2 className="font-display text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              আমাদের সুবাসের পরিবারে যোগ দিন
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-secondary)]">
              বিশেষ অফার, নতুন আতর আর সুগন্ধি ব্যবহারের টিপস সরাসরি আপনার ইমেইলে।
            </p>

            {subscribed ? (
              <div className="mt-8 rounded-lg bg-[var(--color-accent)]/15 p-4 border border-[var(--color-accent)]/30 text-sm font-semibold text-[var(--color-accent-strong)]">
                আমাদের সুবাসের পরিবারে যোগ দেওয়ার জন্য ধন্যবাদ।
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল লিখুন"
                  required
                  className="h-12 w-full max-w-md rounded-md border border-[var(--color-accent)]/20 bg-[var(--color-background-deep)] px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-muted)] outline-none transition-colors focus:border-[var(--color-accent)]"
                />
                <button
                  type="submit"
                  className="h-12 w-full sm:w-auto rounded-md bg-[var(--color-accent)] px-8 text-xs font-bold tracking-[0.06em] text-[var(--color-background-deep)] transition-colors hover:bg-[var(--color-accent-hover)]"
                >
                  সাবস্ক্রাইব করুন
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
