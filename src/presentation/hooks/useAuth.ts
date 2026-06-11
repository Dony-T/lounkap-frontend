import { useState } from 'react';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import { LoginUseCase } from '@/core/use-cases/LoginUseCase';
import { RegisterUseCase } from '@/core/use-cases/RegisterUseCase';
import { AuthResponse } from '@/core/domain/entities/User';

const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: any): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUseCase.execute(credentials);
      // Persist tokens
      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      document.cookie = "auth_session=true; path=/";
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUseCase.execute(data);
      // Persist tokens
      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      document.cookie = "auth_session=true; path=/";
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/auth/login";
  };

  return { login, register, logout, isLoading, error };
};
