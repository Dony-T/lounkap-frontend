export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  currency?: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
