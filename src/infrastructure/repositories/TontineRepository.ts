import { ITontineRepository } from '@/core/domain/repositories/ITontineRepository';
import { Tontine, CreateTontineDTO, UpdateTontineDTO } from '@/core/domain/entities/Tontine';
import apiClient from '../api/apiClient';

export class TontineRepository implements ITontineRepository {
  async create(data: CreateTontineDTO): Promise<Tontine> {
    console.log("TontineRepository: Creating tontine with data:", data);
    const response = await apiClient.post<any>('/tontines', data);
    console.log("TontineRepository: Creation response:", response.data);
    return response.data.data;
  }

  async listAll(): Promise<Tontine[]> {
    console.log("TontineRepository: Fetching all tontines...");
    const response = await apiClient.get<any>('/tontines');
    console.log("TontineRepository: Raw response data:", response.data);

    // Check if the structure is response.data.data.tontines or just response.data.data
    const apiData = response.data.data;

    if (Array.isArray(apiData)) {
      return apiData;
    }

    if (apiData && Array.isArray(apiData.tontines)) {
      return apiData.tontines;
    }

    console.warn("TontineRepository: Unexpected data structure", apiData);
    return [];
  }

  async join(code: string): Promise<Tontine> {
    const response = await apiClient.post<any>('/tontines/join', { inviteCode: code });
    return response.data.data;
  }

  async getById(id: string): Promise<Tontine> {
    console.log(`TontineRepository: Fetching tontine by ID: ${id}`);
    const response = await apiClient.get<any>(`/tontines/${id}`);
    console.log("TontineRepository: getById Raw Response.data:", response.data);

    // Backend confirms: data is in response.data.data.tontine
    // We handle variations to be safe
    const data = response.data?.data?.tontine || response.data?.tontine || response.data?.data || response.data;
    console.log("TontineRepository: Unboxed tontine object:", data);

    return data;
  }

  async update(id: string, data: UpdateTontineDTO): Promise<Tontine> {
    const response = await apiClient.patch<any>(`/tontines/${id}`, data);
    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/tontines/${id}`);
  }

  async leave(id: string): Promise<void> {
    await apiClient.delete(`/tontines/${id}/leave`);
  }

  async getMembers(tontineId: string): Promise<any[]> {
    const response = await apiClient.get<any>(`/tontines/${tontineId}/members`);
    return response.data.data || [];
  }

  async getMemberById(tontineId: string, userId: string): Promise<any> {
    const response = await apiClient.get<any>(`/tontines/${tontineId}/members/${userId}`);
    return response.data.data;
  }

  async getMemberStats(tontineId: string, userId: string): Promise<any> {
    const response = await apiClient.get<any>(`/tontines/${tontineId}/members/${userId}/stats`);
    return response.data.data;
  }

  async addMember(tontineId: string, data: { emailOrPhone: string; role: string }): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/add-member`, {
      identifier: data.emailOrPhone
    });
  }

  async updateMemberRole(tontineId: string, userId: string, role: string): Promise<void> {
    await apiClient.patch(`/tontines/${tontineId}/members/${userId}/role`, { role });
  }

  async updateMemberStatus(tontineId: string, userId: string, status: string): Promise<void> {
    await apiClient.patch(`/tontines/${tontineId}/members/${userId}/status`, { status });
  }

  async removeMember(tontineId: string, userId: string): Promise<void> {
    await apiClient.delete(`/tontines/${tontineId}/members/${userId}`);
  }

  // Cycles
  async createCycle(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/cycles`, data);
    return response.data.data;
  }

  async listCycles(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/cycles`);
    return response.data.data || [];
  }

  async getCycleById(tontineId: string, cycleId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/cycles/${cycleId}`);
    return response.data.data;
  }

  async advanceCycleTurn(tontineId: string, cycleId: string): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/cycles/${cycleId}/next-turn`);
  }

  async closeCycle(tontineId: string, cycleId: string): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/cycles/${cycleId}/close`);
  }

  async getCycleStats(tontineId: string, cycleId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/cycles/${cycleId}/stats`);
    return response.data.data;
  }

  async deleteCycle(tontineId: string, cycleId: string): Promise<void> {
    await apiClient.delete(`/tontines/${tontineId}/cycles/${cycleId}`);
  }

  // Transactions
  async getTransactions(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/transactions`);
    return response.data.data || [];
  }

  // Payouts
  async createPayout(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/payouts`, data);
    return response.data.data;
  }

  async listPayouts(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/payouts`);
    return response.data.data || [];
  }

  async getPayoutStats(tontineId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/payouts/stats`);
    return response.data.data;
  }

  async getPayoutById(tontineId: string, payoutId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/payouts/${payoutId}`);
    return response.data.data;
  }

  async updatePayoutStatus(tontineId: string, payoutId: string, status: string): Promise<void> {
    await apiClient.patch(`/tontines/${tontineId}/payouts/${payoutId}/status`, { status });
  }

  async deletePayout(tontineId: string, payoutId: string): Promise<void> {
    await apiClient.delete(`/tontines/${tontineId}/payouts/${payoutId}`);
  }

  // Savings
  async depositSavings(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/savings/deposit`, data);
    return response.data.data;
  }

  async withdrawSavings(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/savings/withdraw`, data);
    return response.data.data;
  }

  async getMySavingsOperations(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings/me`);
    return response.data.data || [];
  }

  async getMySavingsBalance(tontineId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings/me/balance`);
    return response.data.data;
  }

  async listAllSavingsOperations(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings`);
    return response.data.data || [];
  }

  async getSavingsStats(tontineId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings/stats`);
    return response.data.data;
  }

  async getMemberSavingsBalance(tontineId: string, userId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings/members/${userId}/balance`);
    return response.data.data;
  }

  async reviewSaving(tontineId: string, savingId: string, action: 'APPROVE' | 'REJECT'): Promise<void> {
    await apiClient.patch(`/tontines/${tontineId}/savings/${savingId}/review`, { action });
  }

  async createCollectiveSaving(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/savings/collective`, data);
    return response.data.data;
  }

  async getCollectiveSavings(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/savings/collective`);
    return response.data.data || [];
  }

  async deleteCollectiveSavingEntry(tontineId: string, entryId: string): Promise<void> {
    await apiClient.delete(`/tontines/${tontineId}/savings/collective/${entryId}`);
  }

  // Loans
  async requestLoan(tontineId: string, data: any): Promise<any> {
    const response = await apiClient.post(`/tontines/${tontineId}/loans`, data);
    return response.data.data;
  }

  async listLoans(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/loans`);
    return response.data.data || [];
  }

  async getLoansStats(tontineId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/loans/stats`);
    return response.data.data;
  }

  async getLoanById(tontineId: string, loanId: string): Promise<any> {
    const response = await apiClient.get(`/tontines/${tontineId}/loans/${loanId}`);
    return response.data.data;
  }

  async approveLoan(tontineId: string, loanId: string): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/loans/${loanId}/approve`);
  }

  async rejectLoan(tontineId: string, loanId: string): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/loans/${loanId}/reject`);
  }
}
