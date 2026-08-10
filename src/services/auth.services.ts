import { httpClient } from '@/lib/httpClient';
import { setStoredUser, clearAuth } from '@/lib/auth';
import { AuthResponse, UserInfo } from '@/types/user';

export const authServices = {
  register: async (name: string, email: string, password: string, phone?: string) => {
    const res = await httpClient.post<AuthResponse>('/auth/register', { name, email, password, phone });
    // Token is now set as an httpOnly cookie by the backend — we only store user info
    if (res.success && res.data) {
      setStoredUser(res.data.user);
    }
    return res;
  },

  login: async (email: string, password: string) => {
    const res = await httpClient.post<AuthResponse>('/auth/login', { email, password });
    // Token is now set as an httpOnly cookie by the backend — we only store user info
    if (res.success && res.data) {
      setStoredUser(res.data.user);
    }
    return res;
  },

  logout: async () => {
    // Call backend to clear the httpOnly cookie
    await httpClient.post('/auth/logout');
    clearAuth();
  },

  getMe: () => httpClient.get<UserInfo>('/auth/me'),

  updateProfile: (data: { name?: string; phone?: string }) =>
    httpClient.patch<UserInfo>('/auth/me', data),

  createAdmin: (data: { name: string; email: string; password: string; role?: 'admin' | 'editor' }) =>
    httpClient.post<UserInfo>('/auth/admin', data),
};
