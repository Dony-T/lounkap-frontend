import { useState, useCallback } from 'react';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import { LoginUseCase } from '@/core/use-cases/LoginUseCase';
import { RegisterUseCase } from '@/core/use-cases/RegisterUseCase';
import { GetProfileUseCase } from '@/core/use-cases/GetProfileUseCase';
import { AuthResponse, User } from '@/core/domain/entities/User';

const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const getProfileUseCase = new GetProfileUseCase(authRepository);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: any): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUseCase.execute(credentials);
      
      if (!response.tokens || !response.tokens.accessToken) {
        throw new Error("Tokens manquants dans la réponse");
      }

      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken || '');
      document.cookie = "auth_session=true; path=/";
      
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue lors de la connexion');
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

      if (response.tokens && response.tokens.accessToken) {
        localStorage.setItem('accessToken', response.tokens.accessToken);
        localStorage.setItem('refreshToken', response.tokens.refreshToken || '');
        document.cookie = "auth_session=true; path=/";
      }

      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = useCallback(async (): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userData = await getProfileUseCase.execute();
      setUser(userData);
      return userData;
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log("useAuth: Session expirée (401)");
      } else {
        console.error("useAuth: Erreur lors de la récupération du profil", err);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/auth/login";
  };

  const updateProfile = async (data: Partial<User>): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await authRepository.updateProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du profil");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await authRepository.updatePassword(data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du mot de passe");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authRepository.uploadAvatar(file);
      if (user) {
        setUser({ ...user, avatarUrl: response.avatarUrl });
      }
      return response.avatarUrl;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du téléchargement de l'image");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, getProfile, updateProfile, updatePassword, uploadAvatar, logout, user, isLoading, error };
};
