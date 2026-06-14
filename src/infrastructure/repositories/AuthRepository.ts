import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';
import { AuthResponse, User, AuthTokens } from '@/core/domain/entities/User';
import apiClient from '../api/apiClient';

export class AuthRepository implements IAuthRepository {
  async login(credentials: any): Promise<AuthResponse> {
    console.log("AuthRepository: Appel API Login...");
    const response = await apiClient.post<any>('/auth/login', credentials);
    
    // Log pour voir la structure réelle reçue
    console.log("AuthRepository: Réponse brute reçue:", response.data);

    // Dans votre backend, les données sont dans response.data.data
    const apiData = response.data.data;
    
    if (!apiData || !apiData.accessToken) {
      console.error("AuthRepository: Structure de réponse invalide (pas de token)");
      throw new Error("Structure de réponse invalide");
    }

    return {
      user: apiData.user || {} as any,
      tokens: {
        accessToken: apiData.accessToken,
        refreshToken: apiData.refreshToken || ''
      }
    };
  }

  async register(data: any): Promise<AuthResponse> {
    const response = await apiClient.post<any>('/auth/register', data);
    const apiData = response.data.data;
    return {
      user: apiData?.user || {} as any,
      tokens: {
        accessToken: apiData?.accessToken || '',
        refreshToken: apiData?.refreshToken || ''
      }
    };
  }

  async refreshToken(token: string): Promise<AuthTokens> {
    const response = await apiClient.post<any>('/auth/refresh', { refreshToken: token });
    const apiData = response.data.data;
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken
    };
  }

  async getMe(): Promise<User> {
    const response = await apiClient.get<any>('/auth/me');
    return response.data.data.user;
  }
}
