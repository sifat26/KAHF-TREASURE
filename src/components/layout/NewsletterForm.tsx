'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Newsletter signup.
 *
 * NOTE: No mailing-list backend is defined in the source docs. This validates
 * input and confirms locally. Wire `onValid` to a real provider when ready.
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
      <p
        className={cn('flex items-center gap-2 text-sm', className)}
        style={{ color: 'var(--color-success)' }}
      >
        <Check size={16} /> Thank you — we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(() => setDone(true))}
      className={cn('flex flex-col gap-2', className)}
      noValidate
    >
      <div
        className="flex overflow-hidden rounded-[var(--radius-input)] transition-colors focus-within:border-[var(--color-accent)]"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-card)',
        }}
      >
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          className="h-11 w-full bg-transparent px-4 text-sm outline-none"
          style={{
            color: 'var(--color-text-primary)',
          }}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
        />
        <button
          type="submit"
          className="flex h-11 w-12 shrink-0 items-center justify-center transition-colors"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-background)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'var(--color-accent-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'var(--color-accent)';
          }}
          aria-label="Subscribe"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      {errors.email && (
        <span
          className="text-xs"
          style={{ color: 'var(--color-error)' }}
          role="alert"
        >
          {errors.email.message}
        </span>
      )}
    </form>
  );
}
