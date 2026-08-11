'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { mainNav, site } from '@/data/site';
import { toBanglaDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Award, ChevronDown, Clock, Flame, Heart, Menu, Search, ShoppingBag, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { SearchOverlay } from './SearchOverlay';
import { CartButton } from '@/components/cart/CartButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const { count, wishlist, setOpen: setBagOpen } = useEnquiryBag();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lastPath = React.useRef(pathname);
  React.useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setMenuOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 transition-all duration-300'>
        {/* ── Top Announcement Bar (matching reference image top bar) ── */}
        <div className='bg-[var(--color-background-deep)] border-b border-[var(--color-accent)]/20 text-[var(--color-accent)] py-1.5 px-3 text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-[0.06em] select-none'>
          <div className='mx-auto max-w-7xl flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-6 gap-y-1 text-center'>
            <div className='flex items-center gap-1.5'>
              <Award className='w-3.5 h-3.5 text-[var(--color-accent)] shrink-0' />
              <span className='whitespace-nowrap'>খাঁটি অ্যালকোহল-মুক্ত আতর</span>
            </div>
            <span className='hidden sm:inline text-[var(--color-accent)]/40 font-light'>|</span>
            <div className='hidden sm:flex items-center gap-1.5'>
              <Flame className='w-3.5 h-3.5 text-[var(--color-accent)] shrink-0' />
              <span className='whitespace-nowrap'>বিদেশ থেকে আনা পারফিউম অয়েল</span>
            </div>
            <span className='hidden md:inline text-[var(--color-accent)]/40 font-light'>|</span>
            <div className='hidden md:flex items-center gap-1.5'>
              <Clock className='w-3.5 h-3.5 text-[var(--color-accent)] shrink-0' />
              <span className='whitespace-nowrap'>গন্ধ থাকে ঘণ্টার পর ঘণ্টা</span>
            </div>
            <span className='hidden lg:inline text-[var(--color-accent)]/40 font-light'>|</span>
            <div className='hidden lg:flex items-center gap-1.5'>
              <Truck className='w-3.5 h-3.5 text-[var(--color-accent)] shrink-0' />
              <span className='whitespace-nowrap'>সারা দেশে ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>
        </div>

        {/* ── Main Navbar ── */}
        <nav
          className={cn(
            'transition-colors duration-300',
            scrolled || menuOpen
              ? 'bg-[var(--color-background-deep)]/95 backdrop-blur-md border-b border-[var(--color-accent)]/20 shadow-xl'
              : 'bg-[var(--color-background-deep)]/90 backdrop-blur-sm border-b border-[var(--color-accent)]/15 shadow-md',
          )}
          aria-label='প্রধান'
        >
          <div
            className='mx-auto flex h-14 items-center justify-between px-3 sm:px-6 lg:px-8'
            style={{ height: '70px', maxWidth: '1480px' }}
          >
            {/* Left: Mobile Menu Toggle */}
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-accent)] transition-colors lg:hidden shrink-0'
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Brand Logo — KAHF shield crest + full wordmark */}
            <Link href='/' className='flex items-center gap-2.5 sm:gap-3 shrink-0 group py-1' aria-label={`${site.name} — হোম`}>
              {/* Shield emblem in dark luxury frame */}
              <div className='relative flex h-11 sm:h-12 w-10 sm:w-11 items-center justify-center rounded-xl bg-stone-950 p-1 border border-amber-500/30 shadow-md group-hover:border-amber-400/60 transition-all duration-300 group-hover:scale-105 shrink-0'>
                <Image
                  src='/images/logo.jpg'
                  alt='KAHF Treasure crest'
                  width={48}
                  height={52}
                  priority
                  className='h-full w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(200,169,106,0.4)]'
                />
              </div>

              {/* Wordmark column */}
              <div className='flex flex-col items-start leading-none'>
                <span
                  className='font-serif font-bold tracking-[0.16em] text-base sm:text-xl leading-none text-[var(--color-accent-strong)] group-hover:text-[var(--color-gold)] transition-colors'
                >
                  KAHF
                </span>
                <span
                  className='font-serif font-semibold tracking-[0.3em] text-[0.6rem] sm:text-[0.68rem] leading-none mt-0.5 text-[var(--color-accent)]'
                >
                  TREASURE
                </span>
                <span
                  className='hidden sm:block text-[0.44rem] tracking-[0.14em] leading-none mt-1 font-medium uppercase text-[var(--color-muted)]'
                >
                  A DROP OF GOLD, THE EARTH TURNS ROYAL
                </span>
              </div>
            </Link>

            {/* Center: Clean Navigation Links (HOME, SHOP, COLLECTIONS ∨, ABOUT, FAQ, CONTACT) */}
            <ul className='hidden items-center gap-6 xl:gap-8 lg:flex mx-auto px-4'>
              {mainNav.map((item) => {
                const hasDrop = 'hasDropdown' in item && item.hasDropdown;
                return (
                  <li key={item.href} className='relative'>
                    {hasDrop ? (
                      <div className='relative group/drop py-1.5 px-1'>
                        <Link
                          href={item.href}
                          className={cn(
                            'relative flex items-center gap-1.5 text-xs xl:text-sm font-semibold tracking-[0.04em] transition-colors duration-200',
                            isActive(item.href) ? 'text-[var(--color-accent-strong)]' : 'text-[var(--color-text-secondary)] group-hover/drop:text-[var(--color-accent-strong)]',
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={14}
                            className='text-[var(--color-accent)] opacity-80 group-hover/drop:rotate-180 transition-transform duration-200'
                          />
                        </Link>

                        {/* Luxury Hover Dropdown Panel */}
                        <div className='absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover/drop:opacity-100 group-hover/drop:translate-y-0 group-hover/drop:pointer-events-auto transition-all duration-200 z-50'>
                          <div className='w-56 rounded-xl bg-[var(--color-background)]/98 border border-[var(--color-accent)]/25 shadow-2xl backdrop-blur-xl p-2 flex flex-col gap-0.5'>
                            <Link
                              href='/collections'
                              className='px-3.5 py-2 text-xs font-semibold text-[var(--color-accent-strong)] rounded-lg hover:bg-[var(--color-accent)]/20 transition-colors border-b border-[var(--color-accent)]/15 mb-1'
                            >
                              সব কালেকশন
                            </Link>
                            <Link
                              href='/collections/oud'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              উদ কালেকশন
                            </Link>
                            <Link
                              href='/collections/floral'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              ফুলেল কালেকশন
                            </Link>
                            <Link
                              href='/collections/fruity'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              ফলের কালেকশন
                            </Link>
                            <Link
                              href='/collections/fresh'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              সজীব কালেকশন
                            </Link>
                            <Link
                              href='/collections/arabian'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              আরবীয় কালেকশন
                            </Link>
                            <Link
                              href='/collections/woody'
                              className='px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] rounded-lg hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-strong)] transition-colors'
                            >
                              কাঠের কালেকশন
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'relative flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-[0.04em] transition-colors duration-200 py-1.5 px-1',
                          isActive(item.href)
                            ? 'text-[var(--color-accent-strong)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-accent)]'
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-strong)] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[var(--color-accent)] after:transition-all after:duration-300',
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right: Favorites, Search & Shopping Bag */}
            <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
              <ThemeToggle />

              <Link
                href='/favorites'
                className='relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-accent)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors'
                aria-label={`পছন্দের তালিকা${wishlist.length ? `, ${toBanglaDigits(wishlist.length)}টি সংরক্ষিত` : ''}`}
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span
                    className='absolute -right-1 -top-1 flex h-4 min-w-[18px] items-center justify-center rounded-full px-1 text-[0.62rem] font-bold shadow-sm'
                    style={{ background: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
                  >
                    {toBanglaDigits(wishlist.length)}
                  </span>
                )}
              </Link>

              {/* Search */}
              <button
                type='button'
                onClick={() => setSearchOpen(true)}
                className='flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-accent)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors'
                aria-label='সুগন্ধি খুঁজুন'
              >
                <Search size={20} />
              </button>

              {/* Cart Drawer Button */}
              <CartButton />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={cn('fixed inset-0 z-40 lg:hidden', menuOpen ? 'pointer-events-auto' : 'pointer-events-none')}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn('absolute inset-0 transition-opacity duration-300', menuOpen ? 'opacity-100' : 'opacity-0')}
          style={{ background: 'var(--t-scrim)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-x-0 top-[100px] origin-top transition-all duration-300 ease-out bg-[var(--color-background-deep)] border-b border-[var(--color-accent)]/20 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <ul className='flex flex-col px-6 py-4'>
            <li className='border-b border-[var(--color-accent)]/15'>
              <Link
                href='/favorites'
                className='flex items-center justify-between py-3.5 text-sm font-semibold tracking-[0.04em] text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-strong)]'
                onClick={() => setMenuOpen(false)}
              >
                <span>পছন্দের তালিকা</span>
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href} className='border-b border-[var(--color-accent)]/15'>
                <Link
                  href={item.href}
                  className='flex items-center justify-between py-3.5 text-sm font-semibold tracking-[0.04em] text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-strong)]'
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
                {/* Sub-menu inside Mobile Drawer for Collections */}
                {'hasDropdown' in item && item.hasDropdown && (
                  <div className='pl-4 pb-3 flex flex-col gap-2'>
                    <Link
                      href='/collections/oud'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • উদ কালেকশন
                    </Link>
                    <Link
                      href='/collections/floral'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • ফুলেল কালেকশন
                    </Link>
                    <Link
                      href='/collections/fruity'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • ফলের কালেকশন
                    </Link>
                    <Link
                      href='/collections/fresh'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • সজীব কালেকশন
                    </Link>
                    <Link
                      href='/collections/arabian'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • আরবীয় কালেকশন
                    </Link>
                    <Link
                      href='/collections/woody'
                      className='text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • কাঠের কালেকশন
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
