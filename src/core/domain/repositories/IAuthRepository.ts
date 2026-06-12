import { AuthResponse, User, AuthTokens } from '../entities/User';

export interface IAuthRepository {
  login(credentials: any): Promise<AuthResponse>;
  register(data: any): Promise<esponse>;
  refreshToken(token: string): Promise<AuthTokens>;
  getMe(): Promise<User>;
}
