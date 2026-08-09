'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Ticket,
  Star, Image, LogOut, Menu, X, Settings
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { href: '/admin/products', label: 'পণ্য', icon: Package },
  { href: '/admin/categories', label: 'ক্যাটাগরি', icon: FolderTree },
  { href: '/admin/orders', label: 'অর্ডার', icon: ShoppingCart },
  { href: '/admin/coupons', label: 'কুপন', icon: Ticket },
  { href: '/admin/reviews', label: 'রিভিউ', icon: Star },
  { href: '/admin/banners', label: 'ব্যানার', icon: Image },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-amber-700 p-2 text-white lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-stone-900 transition-transform lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center gap-2 border-b border-stone-800 px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 font-bold text-white">K</div>
          <div>
            <p className="text-sm font-bold text-white">KAHF Treasure</p>
            <p className="text-[10px] text-stone-400">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-amber-700 text-white'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-800 px-3 py-4">
          <div className="mb-2 px-3">
            <p className="text-xs font-semibold text-white">{user?.name}</p>
            <p className="text-[10px] text-stone-400">{user?.email}</p>
            <p className="mt-0.5 inline-block rounded bg-amber-900/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-amber-400">
              {user?.role}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-stone-400 hover:bg-stone-800 hover:text-white"
          >
            <Settings className="h-4 w-4" /> ওয়েবসাইট দেখুন
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-stone-400 hover:bg-red-900/30 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" /> লগআউট
          </button>
        </div>
      </aside>
    </>
  );
}
