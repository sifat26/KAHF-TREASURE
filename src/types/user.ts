export type UserRole = 'super_admin' | 'admin' | 'editor' | 'customer';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked?: boolean;
  phone?: string;
  image?: string | null;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}
