import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

const TOKEN_KEY = 'kahf_access_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // For FormData, let the browser set Content-Type (with multipart boundary).
  // For everything else, default to application/json.
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = isFormData
    ? {}
    : { 'Content-Type': 'application/json' };

  // Always inject Authorization if a token exists — critical for upload endpoints too
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge caller-supplied headers last (but never override Authorization)
  const callerHeaders = (options.headers as Record<string, string>) || {};
  const mergedHeaders = { ...callerHeaders, ...headers };

  const response = await fetch(url, {
    ...options,
    headers: mergedHeaders,
  });

  // Handle 401 Unauthorized — clear stale credentials and redirect to login
  if (response.status === 401) {
    removeToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kahf_user');
      // Only redirect inside admin area to avoid disrupting public pages
      if (window.location.pathname.startsWith('/admin')) {
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
      ? '?' + new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => [k, String(v)])
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

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),

  // Upload FormData (images etc.) — Authorization header is included automatically
  upload: <T>(endpoint: string, formData: FormData) =>
    request<T>(endpoint, {
      method: 'POST',
      body: formData,
      // No Content-Type header here — browser sets it with proper multipart boundary
    }),
};
