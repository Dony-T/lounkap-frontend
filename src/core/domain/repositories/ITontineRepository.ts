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

  // Payouts
  createPayout(tontineId: string, data: any): Promise<any>;
  listPayouts(tontineId: string): Promise<any[]>;
  getPayoutStats(tontineId: string): Promise<any>;
  getPayoutById(tontineId: string, payoutId: string): Promise<any>;
  updatePayoutStatus(tontineId: string, payoutId: string, status: string): Promise<void>;
  deletePayout(tontineId: string, payoutId: string): Promise<void>;

  // Savings
  depositSavings(tontineId: string, data: any): Promise<any>;
  withdrawSavings(tontineId: string, data: any): Promise<any>;
  getMySavingsOperations(tontineId: string): Promise<any[]>;
  getMySavingsBalance(tontineId: string): Promise<any>;
  listAllSavingsOperations(tontineId: string): Promise<any[]>;
  getSavingsStats(tontineId: string): Promise<any>;
  getMemberSavingsBalance(tontineId: string, userId: string): Promise<any>;
  reviewSaving(tontineId: string, savingId: string, action: 'APPROVE' | 'REJECT'): Promise<void>;
  createCollectiveSaving(tontineId: string, data: any): Promise<any>;
  getCollectiveSavings(tontineId: string): Promise<any[]>;
  deleteCollectiveSavingEntry(tontineId: string, entryId: string): Promise<void>;

  // Loans
  requestLoan(tontineId: string, data: any): Promise<any>;
  listLoans(tontineId: string): Promise<any[]>;
  getLoansStats(tontineId: string): Promise<any>;
  getLoanById(tontineId: string, loanId: string): Promise<any>;
  approveLoan(tontineId: string, loanId: string): Promise<void>;
  rejectLoan(tontineId: string, loanId: string): Promise<void>;
}
