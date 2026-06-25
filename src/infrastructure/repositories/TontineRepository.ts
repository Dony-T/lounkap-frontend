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
    const response = await apiClient.get<any>(`/tontines/${id}`);
    return response.data.data;
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

  async getTransactions(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/tontines/${tontineId}/transactions`);
    return response.data.data || [];
  }
}
