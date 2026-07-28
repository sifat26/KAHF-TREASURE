'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const SUBJECTS = [
  'Order Inquiry',
  'Package Deal',
  'Product Question',
  'Custom Request',
  'Other',
];

function SubjectSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Close on outside click or scroll */
  useEffect(() => {
    if (!open) return;
    function close() { setOpen(false); }
    document.addEventListener('mousedown', (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) close();
    });
    window.addEventListener('scroll', close, { passive: true, capture: true });
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('scroll', close, { capture: true });
    };
  }, [open]);

  function handleToggle() {
    if (buttonRef.current) setRect(buttonRef.current.getBoundingClientRect());
    setOpen((o) => !o);
  }

  const dropdown = open && rect ? (
    <ul
      role="listbox"
      style={{
        position: 'fixed',
        top: rect.top - (SUBJECTS.length * 44) - 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      }}
      className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-[#161616] shadow-[0_-8px_32px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      {SUBJECTS.map((s) => (
        <li
          key={s}
          role="option"
          aria-selected={value === s}
          onMouseDown={(e) => { e.preventDefault(); onChange(s); setOpen(false); }}
          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
            value === s
              ? 'bg-[rgba(201,168,76,0.15)] text-[var(--color-gold-300)]'
              : 'text-[var(--text-primary)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--color-gold-400)]'
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between bg-[rgba(255,255,255,0.04)] border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 cursor-pointer ${
          open
            ? 'border-[rgba(201,168,76,0.5)] bg-[rgba(255,255,255,0.06)] shadow-[0_0_0_3px_rgba(201,168,76,0.08)]'
            : 'border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.3)]'
        } ${value ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
      >
        <span>{value || 'Select a subject'}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {typeof window !== 'undefined' && createPortal(dropdown, document.body)}
    </div>
  );
}


export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [subject, setSubject] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current || !subject) return;

    setStatus('loading');

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus('success');
      formRef.current.reset();
      setSubject('');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.15)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none transition-all duration-300 focus:border-[rgba(201,168,76,0.5)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]';

  return (
    <div className="max-w-2xl mx-auto mt-14">
      <div className="bg-[var(--gradient-card)] border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-[var(--shadow-gold)] backdrop-blur-md p-8">
        <h3 className="font-display text-xl font-semibold text-white mb-1">
          Send us a Message
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Place an order or ask us anything — we&apos;ll get back to you shortly.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* hidden input so emailjs.sendForm() can read the subject value */}
          <input type="hidden" name="subject" value={subject} readOnly />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf_name" className="text-xs font-medium text-[var(--text-secondary)] tracking-widest uppercase">
                Name <span className="text-[var(--color-gold-400)]">*</span>
              </label>
              <input
                id="cf_name"
                name="from_name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf_email" className="text-xs font-medium text-[var(--text-secondary)] tracking-widest uppercase">
                Email <span className="text-[var(--color-gold-400)]">*</span>
              </label>
              <input
                id="cf_email"
                name="reply_to"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf_phone" className="text-xs font-medium text-[var(--text-secondary)] tracking-widest uppercase">
                Phone
              </label>
              <input
                id="cf_phone"
                name="phone"
                type="tel"
                placeholder="+880 1xxx xxxxxx"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)] tracking-widest uppercase">
                Subject <span className="text-[var(--color-gold-400)]">*</span>
              </label>
              <SubjectSelect value={subject} onChange={setSubject} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cf_message" className="text-xs font-medium text-[var(--text-secondary)] tracking-widest uppercase">
              Message <span className="text-[var(--color-gold-400)]">*</span>
            </label>
            <textarea
              id="cf_message"
              name="message"
              required
              rows={5}
              placeholder="Describe your order or question in detail..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Status feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2.5 rounded-xl border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.06)] px-4 py-3 text-sm text-green-400">
              <CheckCircle size={16} className="shrink-0" />
              Message sent successfully! We&apos;ll be in touch soon.
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2.5 rounded-xl border border-[rgba(229,91,91,0.25)] bg-[rgba(229,91,91,0.06)] px-4 py-3 text-sm text-[var(--red-accent)]">
              <AlertCircle size={16} className="shrink-0" />
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !subject}
            style={{ background: 'var(--gradient-gold)' }}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 text-[#060606] hover:opacity-90 hover:shadow-[0_8px_30px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle size={16} />
                Sent!
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

