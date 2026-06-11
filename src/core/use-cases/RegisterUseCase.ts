import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { AuthResponse } from '../domain/entities/User';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: any): Promise<AuthResponse> {
    return this.authRepository.register(data);
  }
}
