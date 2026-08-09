import { getToken, removeToken, setToken } from './httpClient';
import { UserInfo } from '@/types/user';

const USER_KEY = 'kahf_user';

export function getStoredUser(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserInfo): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  removeToken();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  if (!user) return false;
  return ['super_admin', 'admin', 'editor'].includes(user.role);
}

export { getToken, setToken, removeToken };
