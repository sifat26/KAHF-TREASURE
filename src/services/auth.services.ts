import { clearAuth, setStoredUser } from '@/lib/auth';
import { httpClient, setToken } from '@/lib/httpClient';
import { AuthResponse, UserInfo } from '@/types/user';

export const authServices = {
  register: async (name: string, email: string, password: string, phone?: string) => {
    const res = await httpClient.post<AuthResponse>('/auth/register', { name, email, password, phone });
    if (res.success && res.data) {
      setStoredUser(res.data.user);
      if (res.data.token) setToken(res.data.token);
    }
    return res;
  },

  login: async (email: string, password: string) => {
    const res = await httpClient.post<AuthResponse>('/auth/login', { email, password });
    if (res.success && res.data) {
      setStoredUser(res.data.user);
      if (res.data.token) setToken(res.data.token);
    }
    return res;
  },

  logout: async () => {
    // Call backend to clear the httpOnly cookie
    await httpClient.post('/auth/logout');
    clearAuth();
  },

  getMe: () => httpClient.get<UserInfo>('/auth/me'),

  updateProfile: (data: { name?: string; phone?: string }) => httpClient.patch<UserInfo>('/auth/me', data),

  createAdmin: (data: { name: string; email: string; password: string; role?: 'admin' | 'editor' }) =>
    httpClient.post<UserInfo>('/auth/admin', data),
};
