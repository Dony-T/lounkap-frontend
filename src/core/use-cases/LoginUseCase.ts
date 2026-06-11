import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { AuthResponse } from '../domain/entities/User';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: any): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}
