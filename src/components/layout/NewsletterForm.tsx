'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Newsletter signup.
 *
 * NOTE: No mailing-list backend is defined in the source docs (Newsletter is a
 * future marketing feature — BUSINESS_REQUIREMENTS.md). This validates input
 * and confirms locally. Wire `onValid` to a real provider (e.g. Mailchimp /
 * a route handler) when the business supplies one.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  if (done) {
    return (
      <p className={cn('flex items-center gap-2 text-sm text-[var(--color-success)]', className)}>
        <Check size={16} /> Thank you — we’ll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(() => setDone(true))}
      className={cn('flex flex-col gap-2', className)}
      noValidate
    >
      <div className="flex overflow-hidden rounded-[var(--radius-input)] border border-line bg-canvas focus-within:border-ink">
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          className="h-11 w-full bg-transparent px-4 text-sm text-ink-soft outline-none placeholder:text-muted/70"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
        />
        <button
          type="submit"
          className="flex h-11 w-12 shrink-0 items-center justify-center bg-ink text-white transition-colors hover:bg-[var(--color-gold-deep)]"
          aria-label="Subscribe"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      {errors.email && (
        <span className="text-xs text-[var(--color-error)]" role="alert">
          {errors.email.message}
        </span>
      )}
    </form>
  );
}
