'use client';

import { usePathname } from 'next/navigation';

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <main id="main" className={isAdmin ? '' : 'pt-[76px]'}>
      {children}
    </main>
  );
}
