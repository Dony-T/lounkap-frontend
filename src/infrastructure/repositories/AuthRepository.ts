import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';
import { AuthResponse, User, AuthTokens } from '@/core/domain/entities/User';
import apiClient from '../api/apiClient';

export class AuthRepository implements IAuthRepository {
  async login(credentials: any): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(data: any): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  async refreshToken(token: string): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken: token });
    return response.data;
  }

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  }
}
