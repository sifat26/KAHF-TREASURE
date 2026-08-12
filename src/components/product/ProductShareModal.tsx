'use client';

import React, { useState } from 'react';
import { site } from '@/data/site';
import { Check, Copy, Link2, Share2, X } from 'lucide-react';
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { cn } from '@/lib/utils';

export interface ProductShareProps {
  title: string;
  description?: string | null;
  price?: number | null;
  image?: string | null;
  slug: string;
  variant?: 'button' | 'icon' | 'full';
  className?: string;
}

export function ProductShareButton({
  title,
  description,
  price,
  image,
  slug,
  variant = 'button',
  className,
}: ProductShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Build canonical absolute URL
  const origin = typeof window !== 'undefined' ? window.location.origin : site.url;
  const canonicalUrl = `${origin}/products/${slug}`;

  // Image URL for preview
  const previewImage = image
    ? image.startsWith('http')
      ? image
      : `${origin}${image.startsWith('/') ? '' : '/'}${image}`
    : `${origin}/images/hero-banner.png`;

  const shortDesc = description
    ? description.length > 120
      ? description.slice(0, 117) + '...'
      : description
    : `${title} — ${site.name} থেকে ১০০% অ্যালকোহল-মুক্ত প্রিমিয়াম আতর।`;

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | ${site.name}`,
          text: `${title} — ${shortDesc}`,
          url: canonicalUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to modal
        if ((err as Error).name === 'AbortError') return;
      }
    }
    setIsOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Pre-formatted messages for social platforms
  const whatsappMsg = encodeURIComponent(
    `আসসালামু আলাইকুম! KAHF Treasure-এর এই প্রিমিয়াম আতরটি দেখুন:\n\n✨ *${title}*\n${price ? `💰 মূল্য: ৳${price}\n` : ''}📝 ${shortDesc}\n\n🔗 ${canonicalUrl}`,
  );

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
  const waShareUrl = `https://wa.me/?text=${whatsappMsg}`;
  const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(`${title} — ${site.name}`)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(`${title} — ${shortDesc}`)}`;

  return (
    <>
      {variant === 'icon' ? (
        <button
          type='button'
          onClick={handleNativeShare}
          title='শেয়ার করুন'
          aria-label='শেয়ার করুন'
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
            className,
          )}
        >
          <Share2 size={18} />
        </button>
      ) : variant === 'full' ? (
        <button
          type='button'
          onClick={handleNativeShare}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 px-4 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]/80',
            className,
          )}
        >
          <Share2 size={16} className='text-[var(--color-accent)]' />
          <span>সোশ্যাল মিডিয়ায় শেয়ার করুন</span>
        </button>
      ) : (
        <button
          type='button'
          onClick={handleNativeShare}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]',
            className,
          )}
        >
          <Share2 size={15} className='text-[var(--color-accent)]' />
          <span>{copied ? 'লিংক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
        </button>
      )}

      {/* Social Share Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-2xl animate-in zoom-in-95 duration-200'>
            {/* Close Button */}
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
            >
              <X size={18} />
            </button>

            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]'>
                <Share2 size={20} />
              </div>
              <div>
                <h3 className='font-serif text-lg font-bold text-[var(--color-text-primary)]'>পণ্যটি শেয়ার করুন</h3>
                <p className='text-xs text-[var(--color-text-secondary)]'>সোশ্যাল মিডিয়ায় বন্ধুদের সাথে শেয়ার করুন</p>
              </div>
            </div>

            {/* Social Unfurl Card Preview */}
            <div className='mb-5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3'>
              <div className='flex gap-3'>
                <img
                  src={previewImage}
                  alt={title}
                  className='h-16 w-16 rounded-xl object-cover border border-[var(--color-border)] bg-white'
                />
                <div className='min-w-0 flex-1'>
                  <span className='block text-[10px] font-bold tracking-wider uppercase text-[var(--color-accent)]'>
                    {site.name}
                  </span>
                  <h4 className='truncate text-sm font-bold text-[var(--color-text-primary)]'>{title}</h4>
                  <p className='line-clamp-2 text-xs text-[var(--color-text-secondary)]'>{shortDesc}</p>
                </div>
              </div>
            </div>

            {/* Quick Share Grid */}
            <div className='mb-5 grid grid-cols-4 gap-3'>
              <a
                href={waShareUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center gap-1.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400 transition hover:scale-105'
              >
                <WhatsAppIcon size={22} />
                <span className='text-[11px] font-bold'>WhatsApp</span>
              </a>

              <a
                href={fbShareUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center gap-1.5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400 transition hover:scale-105'
              >
                <FacebookIcon size={22} />
                <span className='text-[11px] font-bold'>Facebook</span>
              </a>

              <a
                href={tgShareUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center gap-1.5 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-600 dark:text-sky-400 transition hover:scale-105'
              >
                <TelegramIcon size={22} />
                <span className='text-[11px] font-bold'>Telegram</span>
              </a>

              <a
                href={twitterShareUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center gap-1.5 rounded-2xl border border-stone-500/20 bg-stone-500/10 p-3 text-stone-700 dark:text-stone-300 transition hover:scale-105'
              >
                <TwitterIcon size={22} />
                <span className='text-[11px] font-bold'>Twitter</span>
              </a>
            </div>

            {/* Copy Link Input Bar */}
            <div className='flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 pl-3'>
              <Link2 size={16} className='text-[var(--color-text-tertiary)] shrink-0' />
              <input
                type='text'
                readOnly
                value={canonicalUrl}
                className='w-full bg-transparent text-xs text-[var(--color-text-secondary)] focus:outline-none'
              />
              <button
                type='button'
                onClick={handleCopyLink}
                className={cn(
                  'flex shrink-0 items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition',
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:brightness-110',
                )}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
