import { ITontineRepository } from '@/core/domain/repositories/ITontineRepository';
import { Tontine, CreateTontineDTO, UpdateTontineDTO } from '@/core/domain/entities/Tontine';
import apiClient from '../api/apiClient';

export class TontineRepository implements ITontineRepository {
  async create(data: CreateTontineDTO): Promise<Tontine> {
    const response = await apiClient.post<Tontine>('/tontines', data);
    return response.data;
  }

  async listAll(): Promise<Tontine[]> {
    const response = await apiClient.get<Tontine[]>('/tontines');
    return response.data;
  }

  async join(code: string): Promise<Tontine> {
    const response = await apiClient.post<Tontine>('/tontines/join', { code });
    return response.data;
  }

  async getById(id: string): Promise<Tontine> {
    const response = await apiClient.get<Tontine>(`/tontines/${id}`);
    return response.data;
  }

  async update(id: string, data: UpdateTontineDTO): Promise<Tontine> {
    const response = await apiClient.patch<Tontine>(`/tontines/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/tontines/${id}`);
  }

  async leave(id: string): Promise<void> {
    await apiClient.delete(`/tontines/${id}/leave`);
  }
}
