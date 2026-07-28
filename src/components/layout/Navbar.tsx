'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav, site } from '@/data/site';
import { useEnquiryBag } from '@/components/bag/EnquiryBagProvider';
import { SearchOverlay } from './SearchOverlay';

export function Navbar() {
  const pathname = usePathname();
  const { count, setOpen: setBagOpen } = useEnquiryBag();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Solidify nav after slight scroll.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route actually changes. Guarding on a
  // ref means we only call setState on a real transition, not every render.
  const lastPath = React.useRef(pathname);
  React.useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setMenuOpen(false);
    }
  }, [pathname]);

  // Lock body scroll + Esc-to-close while the mobile menu is open.
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-lux)]',
          scrolled || menuOpen
            ? 'border-b border-line bg-canvas/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
        style={{ ['--nav-h' as string]: '76px' }}
      >
        <nav
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
          aria-label="Main"
        >
          {/* Left: mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-xl tracking-[0.15em] text-ink sm:text-2xl">
              KAHF <span className="text-[var(--color-gold-deep)]">TREASURE</span>
            </span>
          </Link>

          {/* Center: primary links (desktop) */}
          <ul className="hidden items-center gap-8 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative text-sm tracking-wide text-ink-soft transition-colors hover:text-ink',
                    'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[var(--color-gold)] after:transition-all after:duration-300 after:content-[""]',
                    isActive(item.href) ? 'text-ink after:w-full' : 'after:w-0 hover:after:w-full',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label="Search fragrances"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label={`Enquiry bag${count ? `, ${count} item${count > 1 ? 's' : ''}` : ', empty'}`}
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-gold-deep)] px-1 text-[0.65rem] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu panel */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            'absolute inset-0 bg-ink/20 transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-x-0 top-[76px] origin-top border-b border-line bg-canvas transition-all duration-300 ease-[var(--ease-lux)]',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <ul className="flex flex-col px-5 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block border-b border-line py-4 font-display text-xl text-ink',
                    isActive(item.href) && 'text-[var(--color-gold-deep)]',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
