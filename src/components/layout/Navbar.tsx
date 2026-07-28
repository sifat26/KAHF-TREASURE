"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[rgba(212,175,55,0.15)] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-5"
      )}
      role="navigation" 
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        <Link href="#" className="font-display text-[1.4rem] md:text-[1.8rem] font-semibold tracking-[0.1em] text-[var(--color-gold-400)] uppercase" aria-label="KAHF Treasure Home">
          KAHF TREASURE
        </Link>
        
        <button 
          className="md:hidden flex flex-col justify-center items-center w-[30px] h-[30px] cursor-pointer bg-transparent border-none z-[201]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu" 
          aria-expanded={menuOpen}
        >
          <span className={cn("w-full h-[2px] bg-[var(--color-gold-400)] transition-all duration-300 rounded-full", menuOpen ? "rotate-45 translate-y-[8px]" : "mb-[6px]")}></span>
          <span className={cn("w-full h-[2px] bg-[var(--color-gold-400)] transition-all duration-300 rounded-full mb-[6px]", menuOpen ? "opacity-0" : "")}></span>
          <span className={cn("w-full h-[2px] bg-[var(--color-gold-400)] transition-all duration-300 rounded-full", menuOpen ? "-rotate-45 -translate-y-[8px]" : "")}></span>
        </button>

        <ul 
          className={cn(
            "fixed md:static inset-0 bg-[rgba(6,6,6,0.98)] md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none flex-col md:flex-row items-center justify-center md:justify-end gap-10 md:gap-8 transition-all duration-500 ease-in-out md:flex z-[200]",
            menuOpen ? "flex opacity-100 visible" : "hidden opacity-0 invisible md:opacity-100 md:visible"
          )}
          role="menubar"
        >
          <li role="none"><Link href="#most-wanted" onClick={closeMenu} className="text-[1.1rem] md:text-[0.75rem] font-accent font-medium text-[var(--text-secondary)] px-4 py-[7px] rounded-full uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-[var(--transition-base)] hover:text-[var(--color-gold-300)] hover:bg-[rgba(201,168,76,0.08)] relative" role="menuitem">Most Wanted</Link></li>
          <li role="none"><Link href="#new-arrivals" onClick={closeMenu} className="text-[1.1rem] md:text-[0.75rem] font-accent font-medium text-[var(--text-secondary)] px-4 py-[7px] rounded-full uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-[var(--transition-base)] hover:text-[var(--color-gold-300)] hover:bg-[rgba(201,168,76,0.08)] relative" role="menuitem">New Arrivals</Link></li>
          <li role="none"><Link href="#collections" onClick={closeMenu} className="text-[1.1rem] md:text-[0.75rem] font-accent font-medium text-[var(--text-secondary)] px-4 py-[7px] rounded-full uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-[var(--transition-base)] hover:text-[var(--color-gold-300)] hover:bg-[rgba(201,168,76,0.08)] relative" role="menuitem">Collections</Link></li>
          <li role="none"><Link href="#packages" onClick={closeMenu} className="text-[1.1rem] md:text-[0.75rem] font-accent font-medium text-[var(--text-secondary)] px-4 py-[7px] rounded-full uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-[var(--transition-base)] hover:text-[var(--color-gold-300)] hover:bg-[rgba(201,168,76,0.08)] relative" role="menuitem">Packages</Link></li>
          <li role="none"><Link href="#contact" onClick={closeMenu} className="text-[1.2rem] md:text-[0.75rem] font-accent font-semibold text-[#080604] bg-[linear-gradient(135deg,#E8D48B,#C9A84C,#A68A3E)] px-6 py-[9px] rounded-full transition-all duration-[var(--transition-base)] tracking-[0.08em] hover:-translate-y-[2px] hover:shadow-[0_6px_24px_rgba(201,168,76,0.35)] inline-block uppercase" role="menuitem">যোগাযোগ</Link></li>
        </ul>
      </div>
    </nav>
  );
}
