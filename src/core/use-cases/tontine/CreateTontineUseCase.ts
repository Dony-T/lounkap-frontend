import { ITontineRepository } from '../../domain/repositories/ITontineRepository';
import { Tontine, CreateTontineDTO } from '../../domain/entities/Tontine';

export class CreateTontineUseCase {
  constructor(private tontineRepository: ITontineRepository) {}

  async execute(data: CreateTontineDTO): Promise<Tontine> {
    return this.tontineRepository.create(data);
  }
}
