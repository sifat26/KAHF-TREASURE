'use client';

import { StoreProvider } from '@/providers/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
}
