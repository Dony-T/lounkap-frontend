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
  getMemberById(tontineId: string, userId: string): Promise<any>;
  getMemberStats(tontineId: string, userId: string): Promise<any>;
  addMember(tontineId: string, data: { emailOrPhone: string; role: string }): Promise<void>;
  updateMemberRole(tontineId: string, userId: string, role: string): Promise<void>;
  updateMemberStatus(tontineId: string, userId: string, status: string): Promise<void>;
  removeMember(tontineId: string, userId: string): Promise<void>;

  // Cycles
  createCycle(tontineId: string, data: any): Promise<any>;
  listCycles(tontineId: string): Promise<any[]>;
  getCycleById(tontineId: string, cycleId: string): Promise<any>;
  advanceCycleTurn(tontineId: string, cycleId: string): Promise<void>;
  closeCycle(tontineId: string, cycleId: string): Promise<void>;
  getCycleStats(tontineId: string, cycleId: string): Promise<any>;
  deleteCycle(tontineId: string, cycleId: string): Promise<void>;

  // Transactions
  getTransactions(tontineId: string): Promise<any[]>;
}
