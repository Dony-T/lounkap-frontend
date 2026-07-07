import { AuthResponse, User, AuthTokens } from '../entities/User';

export interface IAuthRepository {
  login(credentials: any): Promise<AuthResponse>;
  register(data: any): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthTokens>;
  getMe(): Promise<User>;
  updateProfile(data: Partial<User>): Promise<User>;
  updatePassword(data: any): Promise<void>;
}
