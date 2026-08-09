'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    // Allow access to login page without auth
    if (pathname === '/admin/login') return;
    // Redirect to login if not authenticated or not admin
    if (!user || !isAdmin) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router, pathname]);

  // Show login page without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="animate-pulse text-stone-400">লোড হচ্ছে...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="text-stone-400">অ্যাডমিন প্যানেলে অ্যাক্সেস নেই। রিডাইরেক্ট হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
