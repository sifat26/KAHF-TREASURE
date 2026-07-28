'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { Field, Input, Select, Textarea } from '@/components/ui/Field';
import { Button, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { whatsappUrl } from '@/lib/whatsapp';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please choose a subject'),
  message: z.string().min(10, 'Please add a little more detail'),
});

type FormValues = z.infer<typeof schema>;

const SUBJECTS = ['Order Inquiry', 'Product Question', 'Fragrance Recommendation', 'Gift / Package', 'Other'];

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form. Sends via EmailJS when configured; otherwise (and on failure)
 * offers a WhatsApp fallback so the customer is never blocked from reaching us.
 */
export function ContactForm() {
  const [status, setStatus] = React.useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // Lightweight resolver: validate with zod on submit.
    resolver: async (values) => {
      const parsed = schema.safeParse(values);
      if (parsed.success) return { values: parsed.data, errors: {} };
      const fieldErrors: Record<string, { type: string; message: string }> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = { type: 'validation', message: issue.message };
      }
      return { values: {}, errors: fieldErrors };
    },
  });

  const emailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  async function onSubmit(values: FormValues) {
    if (!emailConfigured) {
      // No email backend configured — hand off to WhatsApp.
      window.open(buildWhatsApp(values), '_blank', 'noopener,noreferrer');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          from_name: values.name,
          reply_to: values.email,
          phone: values.phone ?? '',
          subject: values.subject,
          message: values.message,
        },
        { publicKey: PUBLIC_KEY! },
      );
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center">
        <CheckCircle2 size={40} className="text-[var(--color-success)]" strokeWidth={1.5} />
        <h3 className="font-display text-2xl text-ink">Message sent</h3>
        <p className="max-w-sm text-muted">
          Thank you for reaching out. We’ll get back to you shortly. For a faster reply, message us
          on WhatsApp.
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="Your full name" {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" description="Optional">
          <Input id="phone" type="tel" placeholder="+880 1XXX XXXXXX" {...register('phone')} />
        </Field>
        <Field label="Subject" htmlFor="subject" required error={errors.subject?.message}>
          <Select id="subject" defaultValue="" {...register('subject')}>
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" required error={errors.message?.message}>
        <Textarea id="message" rows={5} placeholder="How can we help you?" {...register('message')} />
      </Field>

      {status === 'error' && (
        <div className="rounded-[var(--radius-input)] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 px-4 py-3 text-sm text-[var(--color-error)]">
          Something went wrong sending your message. Please try again or reach us on WhatsApp below.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={status === 'sending'} className="sm:flex-1">
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </Button>
        <ButtonLink
          href={whatsappUrl('Hello KAHF Treasure! I have a question.')}
          external
          variant="secondary"
          size="lg"
          className="sm:flex-1"
        >
          <WhatsAppIcon size={18} /> Chat instead
        </ButtonLink>
      </div>

      {!emailConfigured && (
        <p className="text-xs text-muted">
          {/* Dev note surfaced subtly: email backend not configured. */}
          Tip: submitting will open WhatsApp with your message pre-filled.
        </p>
      )}
    </form>
  );

  function buildWhatsApp(values: FormValues): string {
    const msg = `Hello KAHF Treasure!\n\nName: ${values.name}\nSubject: ${values.subject}\n\n${values.message}`;
    return whatsappUrl(msg);
  }
}
