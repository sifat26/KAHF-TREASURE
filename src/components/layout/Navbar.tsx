'use client';

import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { mainNav, site } from '@/data/site';
import { cn } from '@/lib/utils';
import { Award, ChevronDown, Clock, Flame, Heart, Menu, Search, ShoppingBag, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { SearchOverlay } from './SearchOverlay';

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

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 transition-all duration-300'>
        {/* ── Top Announcement Bar (matching reference image top bar) ── */}
        <div className='bg-[#0b0907] border-b border-[#c8a96a]/20 text-[#c8a96a] py-1.5 px-3 text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase select-none'>
          <div className='mx-auto max-w-7xl flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-6 gap-y-1 text-center'>
            <div className='flex items-center gap-1.5'>
              <Award className='w-3.5 h-3.5 text-[#c8a96a] shrink-0' />
              <span className='whitespace-nowrap'>PREMIUM ALCOHOL-FREE ATTAR</span>
            </div>
            <span className='hidden sm:inline text-[#c8a96a]/40 font-light'>|</span>
            <div className='hidden sm:flex items-center gap-1.5'>
              <Flame className='w-3.5 h-3.5 text-[#c8a96a] shrink-0' />
              <span className='whitespace-nowrap'>IMPORTED PERFUME OILS</span>
            </div>
            <span className='hidden md:inline text-[#c8a96a]/40 font-light'>|</span>
            <div className='hidden md:flex items-center gap-1.5'>
              <Clock className='w-3.5 h-3.5 text-[#c8a96a] shrink-0' />
              <span className='whitespace-nowrap'>LONG LASTING FRAGRANCE</span>
            </div>
            <span className='hidden lg:inline text-[#c8a96a]/40 font-light'>|</span>
            <div className='hidden lg:flex items-center gap-1.5'>
              <Truck className='w-3.5 h-3.5 text-[#c8a96a] shrink-0' />
              <span className='whitespace-nowrap'>FAST DELIVERY IN BD</span>
            </div>
          </div>
        </div>

        {/* ── Main Navbar ── */}
        <nav
          className={cn(
            'transition-colors duration-300',
            scrolled || menuOpen
              ? 'bg-[#090807]/95 backdrop-blur-md border-b border-[#c8a96a]/20 shadow-xl'
              : 'bg-[#090807]/90 backdrop-blur-sm border-b border-[#c8a96a]/15 shadow-md',
          )}
          aria-label='Main'
        >
          <div
            className='mx-auto flex h-14 items-center justify-between px-3 sm:px-6 lg:px-8'
            style={{ height: '70px', maxWidth: '1480px' }}
          >
            {/* Left: Mobile Menu Toggle */}
            <button
              type='button'
              className='flex h-10 w-10 items-center justify-center rounded-full text-[#c8a96a] transition-colors lg:hidden shrink-0'
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Brand Logo with exact gold shield calligraphy emblem */}
            <Link href='/' className='flex items-center gap-2 sm:gap-3 shrink-0 group py-1' aria-label={`${site.name} — home`}>
              <Image
                src='/images/logo.jpg'
                alt='KAHF Treasure'
                width={48}
                height={52}
                priority
                className='h-9 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(200,169,106,0.45)] transform group-hover:scale-105 transition-transform'
              />

              {/* Brand Text */}
              <div className='flex flex-col'>
                <span className='font-serif text-base sm:text-[1.35rem] font-bold tracking-[0.14em] sm:tracking-[0.16em] text-[#f5dd9e] leading-tight group-hover:text-white transition-colors'>
                  KAHF
                </span>
                <span className='font-serif text-[0.55rem] sm:text-[0.65rem] tracking-[0.28em] sm:tracking-[0.32em] text-[#c8a96a] font-medium leading-none'>
                  TREASURE
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
                            'relative flex items-center gap-1.5 text-xs xl:text-sm font-semibold tracking-widest uppercase transition-colors duration-200',
                            isActive(item.href) ? 'text-[#f5dd9e]' : 'text-[#b8b0a2] group-hover/drop:text-[#f5dd9e]',
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={14}
                            className='text-[#c8a96a] opacity-80 group-hover/drop:rotate-180 transition-transform duration-200'
                          />
                        </Link>

                        {/* Luxury Hover Dropdown Panel */}
                        <div className='absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover/drop:opacity-100 group-hover/drop:translate-y-0 group-hover/drop:pointer-events-auto transition-all duration-200 z-50'>
                          <div className='w-56 rounded-xl bg-[#0f0d0b]/98 border border-[#c8a96a]/25 shadow-2xl backdrop-blur-xl p-2 flex flex-col gap-0.5'>
                            <Link
                              href='/collections'
                              className='px-3.5 py-2 text-xs font-semibold text-[#f5dd9e] rounded-lg hover:bg-[#c8a96a]/20 transition-colors border-b border-[#c8a96a]/15 mb-1'
                            >
                              All Collections
                            </Link>
                            <Link
                              href='/collections/oud'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              OUD Collection
                            </Link>
                            <Link
                              href='/collections/floral'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              FLORAL Collection
                            </Link>
                            <Link
                              href='/collections/fruity'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              FRUITY Collection
                            </Link>
                            <Link
                              href='/collections/fresh'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              FRESH Collection
                            </Link>
                            <Link
                              href='/collections/arabian'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              ARABIAN Collection
                            </Link>
                            <Link
                              href='/collections/woody'
                              className='px-3.5 py-1.5 text-xs font-medium text-[#d6cdbe] rounded-lg hover:bg-[#c8a96a]/15 hover:text-[#f5dd9e] transition-colors'
                            >
                              WOODY Collection
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'relative flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-widest uppercase transition-colors duration-200 py-1.5 px-1',
                          isActive(item.href)
                            ? 'text-[#f5dd9e] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#c8a96a]'
                            : 'text-[#b8b0a2] hover:text-[#f5dd9e] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#c8a96a] after:transition-all after:duration-300',
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
              <Link
                href='/favorites'
                className='relative flex h-10 w-10 items-center justify-center rounded-full text-[#c8a96a]/80 hover:text-[#c8a96a] hover:bg-[#c8a96a]/10 transition-colors'
                aria-label={`Favorites${wishlist.length ? `, ${wishlist.length} saved` : ''}`}
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span
                    className='absolute -right-1 -top-1 flex h-4 min-w-[18px] items-center justify-center rounded-full px-1 text-[0.62rem] font-bold shadow-sm'
                    style={{ background: '#c8a96a', color: '#090807' }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Search */}
              <button
                type='button'
                onClick={() => setSearchOpen(true)}
                className='flex h-10 w-10 items-center justify-center rounded-full text-[#c8a96a]/80 hover:text-[#c8a96a] hover:bg-[#c8a96a]/10 transition-colors'
                aria-label='Search fragrances'
              >
                <Search size={20} />
              </button>

              {/* Shopping Bag with accurate dynamic count badge */}
              <button
                type='button'
                onClick={() => setBagOpen(true)}
                className='relative flex h-10 w-10 items-center justify-center rounded-full text-[#c8a96a]/80 hover:text-[#c8a96a] hover:bg-[#c8a96a]/10 transition-colors'
                aria-label={`Enquiry bag${count ? `, ${count} items` : ''}`}
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span
                    className='absolute -right-1 -top-1 flex h-4 items-center justify-center rounded-full px-1 text-[0.62rem] font-bold shadow-sm animate-in fade-in zoom-in'
                    style={{
                      background: '#c8a96a',
                      color: '#090807',
                      minWidth: '18px',
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
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
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-x-0 top-[100px] origin-top transition-all duration-300 ease-out bg-[#0d0c0a] border-b border-[#c8a96a]/20 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <ul className='flex flex-col px-6 py-4'>
            <li className='border-b border-[#c8a96a]/15'>
              <Link
                href='/favorites'
                className='flex items-center justify-between py-3.5 text-sm font-semibold tracking-wider text-[#d6cdbe] hover:text-[#f5dd9e]'
                onClick={() => setMenuOpen(false)}
              >
                <span>FAVORITES</span>
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href} className='border-b border-[#c8a96a]/15'>
                <Link
                  href={item.href}
                  className='flex items-center justify-between py-3.5 text-sm font-semibold tracking-wider text-[#d6cdbe] hover:text-[#f5dd9e]'
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
                {/* Sub-menu inside Mobile Drawer for Collections */}
                {item.label === 'COLLECTIONS' && (
                  <div className='pl-4 pb-3 flex flex-col gap-2'>
                    <Link
                      href='/collections/oud'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • OUD Collection
                    </Link>
                    <Link
                      href='/collections/floral'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • FLORAL Collection
                    </Link>
                    <Link
                      href='/collections/fruity'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • FRUITY Collection
                    </Link>
                    <Link
                      href='/collections/fresh'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • FRESH Collection
                    </Link>
                    <Link
                      href='/collections/arabian'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • ARABIAN Collection
                    </Link>
                    <Link
                      href='/collections/woody'
                      className='text-xs text-[#b8b0a2] hover:text-[#c8a96a] py-1'
                      onClick={() => setMenuOpen(false)}
                    >
                      • WOODY Collection
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
