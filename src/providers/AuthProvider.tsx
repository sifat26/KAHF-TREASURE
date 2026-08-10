'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getStoredUser, clearAuth } from '@/lib/auth';
import { authServices } from '@/services/auth.services';
import type { UserInfo } from '@/types/user';

interface AuthContextValue {
  user: UserInfo | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize synchronously from localStorage to avoid cascading renders
  const [user, setUser] = useState<UserInfo | null>(() => {
    if (typeof window === 'undefined') return null;
    return getStoredUser();
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify the httpOnly cookie is still valid by calling /auth/me
    authServices.getMe()
      .then(res => {
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          if (getStoredUser()) {
            clearAuth();
            setUser(null);
          }
        }
      })
      .catch(() => {
        // Cookie might be expired or the user wasn't logged in — that's fine
        if (getStoredUser()) {
          clearAuth();
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authServices.login(email, password);
    if (res.success && res.data) {
      setUser(res.data.user);
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await authServices.logout();
    } catch {
      // Even if the backend call fails, clear local state
    }
    clearAuth();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authServices.getMe();
      if (res.success && res.data) setUser(res.data);
    } catch {}
  };

  const adminRoles = ['super_admin', 'admin', 'editor'];
  const isAdminUser = !!user && adminRoles.includes(user.role);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      isAdmin: isAdminUser,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
