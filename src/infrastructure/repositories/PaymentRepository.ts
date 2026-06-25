import { IPaymentRepository } from '@/core/domain/repositories/IPaymentRepository';
import apiClient from '../api/apiClient';

export class PaymentRepository implements IPaymentRepository {
  async getMyPayments(): Promise<any[]> {
    const response = await apiClient.get('/payments/me');
    return response.data.data || [];
  }

  async getPaymentById(paymentId: string): Promise<any> {
    const response = await apiClient.get(`/payments/${paymentId}`);
    return response.data.data;
  }

  async cancelPayment(paymentId: string): Promise<void> {
    await apiClient.delete(`/payments/${paymentId}`);
  }

  async submitContribution(tontineId: string, data: any): Promise<any> {
    // Note: special prefix as per documentation
    const response = await apiClient.post(`/payments/tontines/${tontineId}/payments`, data);
    return response.data.data;
  }

  async getTontinePayments(tontineId: string): Promise<any[]> {
    const response = await apiClient.get(`/payments/tontines/${tontineId}/payments`);
    return response.data.data || [];
  }

  async getCollectionStats(tontineId: string): Promise<any> {
    const response = await apiClient.get(`/payments/tontines/${tontineId}/payments/stats`);
    return response.data.data;
  }

  async approvePayment(paymentId: string): Promise<void> {
    await apiClient.patch(`/payments/${paymentId}/approve`);
  }

  async rejectPayment(paymentId: string): Promise<void> {
    await apiClient.patch(`/payments/${paymentId}/reject`);
  }
}
