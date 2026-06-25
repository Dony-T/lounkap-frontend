export interface IPaymentRepository {
  getMyPayments(): Promise<any[]>;
  getPaymentById(paymentId: string): Promise<any>;
  cancelPayment(paymentId: string): Promise<void>;
  submitContribution(tontineId: string, data: any): Promise<any>;
  getTontinePayments(tontineId: string): Promise<any[]>;
  getCollectionStats(tontineId: string): Promise<any>;
  approvePayment(paymentId: string): Promise<void>;
  rejectPayment(paymentId: string): Promise<void>;
}
