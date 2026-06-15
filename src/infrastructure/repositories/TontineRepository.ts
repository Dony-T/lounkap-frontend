import { ITontineRepository } from '@/core/domain/repositories/ITontineRepository';
import { Tontine, CreateTontineDTO, UpdateTontineDTO } from '@/core/domain/entities/Tontine';
import apiClient from '../api/apiClient';

export class TontineRepository implements ITontineRepository {
  async create(data: CreateTontineDTO): Promise<Tontine> {
    const response = await apiClient.post<any>('/tontines', data);
    return response.data.data;
  }

  async listAll(): Promise<Tontine[]> {
    const response = await apiClient.get<any>('/tontines');
    // The API wraps the array in a 'data' field
    return response.data.data || [];
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
}
