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
    const response = await apiClient.post<any>('/tontines/join', { code });
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

  async addMember(tontineId: string, data: { emailOrPhone: string; role: string }): Promise<void> {
    await apiClient.post(`/tontines/${tontineId}/members`, data);
  }
}
