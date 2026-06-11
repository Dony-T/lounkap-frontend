import { ITontineRepository } from '../../domain/repositories/ITontineRepository';
import { Tontine } from '../../domain/entities/Tontine';

export class JoinTontineUseCase {
  constructor(private tontineRepository: ITontineRepository) {}

  async execute(code: string): Promise<Tontine> {
    return this.tontineRepository.join(code);
  }
}
