import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

/**
 * Auth token management.
 *
 * Phase 0 migration: JWT is now stored in an httpOnly cookie set by the backend.
 * The frontend no longer reads or writes the token to localStorage.
 * The browser automatically sends the cookie with every same-site request,
 * and `credentials: 'include'` is set on all fetch calls for cross-origin dev.
 *
 * The localStorage token functions are kept ONLY for reading stale tokens during
 * the migration window — they return null for new logins.
 */

/** @deprecated Token is now managed via httpOnly cookie. This always returns null. */
export function getToken(): string | null {
  return null;
}

/** @deprecated No-op. Token is set by the backend as an httpOnly cookie. */
/** @deprecated No-op. Token is set by the backend as an httpOnly cookie. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setToken(_: string): void {
  // No-op — cookie is set by backend
}
{
  // No-op — cookie is set by backend
}

/** @deprecated No-op. Call POST /auth/logout to clear the cookie. */
export function removeToken(): void {
  // No-op — cookie is cleared by backend logout endpoint
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // For FormData, let the browser set Content-Type (with multipart boundary).
  // For everything else, default to application/json.
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = isFormData ? {} : { 'Content-Type': 'application/json' };

  // Merge caller-supplied headers (but never inject Authorization ourselves —
  // the httpOnly cookie is sent automatically by the browser).
  const callerHeaders = (options.headers as Record<string, string>) || {};
  const mergedHeaders = { ...callerHeaders, ...headers };

  const response = await fetch(url, {
    ...options,
    headers: mergedHeaders,
    credentials: 'include', // Critical: send httpOnly auth cookie cross-origin
  });

  // Handle 401 Unauthorized — clear stale user data and redirect if in admin
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kahf_user');
      const isAdminLoginPage = window.location.pathname === '/admin/login';
      if (window.location.pathname.startsWith('/admin') && !isAdminLoginPage) {
        window.location.href = '/admin/login';
      }
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw {
      success: false,
      message: data.message || 'Request failed',
      statusCode: response.status,
      data: data.data || null,
    };
  }

  return data as ApiResponse<T>;
}

export const httpClient = {
  get: <T>(endpoint: string, params?: Record<string, unknown>) => {
    const query = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => [k, String(v)]),
        ).toString()
      : '';
    return request<T>(query ? `${endpoint}${query}` : endpoint);
  },

  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),

  upload: <T>(endpoint: string, formData: FormData) =>
    request<T>(endpoint, {
      method: 'POST',
      body: formData,
    }),
};
