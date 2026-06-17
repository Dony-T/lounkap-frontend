import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { User } from '../domain/entities/User';

export class GetProfileUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<User> {
    return this.authRepository.getMe();
  }
}
