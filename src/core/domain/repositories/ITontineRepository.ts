import { Tontine, CreateTontineDTO, UpdateTontineDTO } from '../entities/Tontine';

export interface ITontineRepository {
  create(data: CreateTontineDTO): Promise<Tontine>;
  listAll(): Promise<Tontine[]>;
  join(code: string): Promise<Tontine>;
  getById(id: string): Promise<Tontine>;
  update(id: string, data: UpdateTontineDTO): Promise<Tontine>;
  delete(id: string): Promise<void>;
  leave(id: string): Promise<void>;
  getMembers(tontineId: string): Promise<any[]>;
  addMember(tontineId: string, data: { emailOrPhone: string; role: string }): Promise<void>;
}
