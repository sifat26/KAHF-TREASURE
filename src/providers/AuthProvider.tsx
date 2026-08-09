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
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      // Verify token is still valid
      authServices.getMe()
        .then(res => {
          if (res.success && res.data) setUser(res.data);
        })
        .catch(() => {
          clearAuth();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authServices.login(email, password);
    if (res.success && res.data) {
      setUser(res.data.user);
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authServices.getMe();
      if (res.success && res.data) setUser(res.data);
    } catch {}
  };

  // Derive isAdmin reactively from user state rather than calling isAdmin()
  // once at render (which would be stale after user state updates)
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
