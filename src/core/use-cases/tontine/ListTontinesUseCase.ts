import { ITontineRepository } from '../../domain/repositories/ITontineRepository';
import { Tontine } from '../../domain/entities/Tontine';

export class ListTontinesUseCase {
  constructor(private tontineRepository: ITontineRepository) {}

  async execute(): Promise<Tontine[]> {
    return this.tontineRepository.listAll();
  }
}
