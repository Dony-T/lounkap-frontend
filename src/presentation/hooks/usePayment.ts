import { useState } from 'react';
import { PaymentRepository } from '@/infrastructure/repositories/PaymentRepository';

const paymentRepository = new PaymentRepository();

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyPayments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      return await paymentRepository.getMyPayments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des paiements');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitContribution = async (tontineId: string, data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      return await paymentRepository.submitContribution(tontineId, data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la soumission de la cotisation');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getTontinePayments = async (tontineId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await paymentRepository.getTontinePayments(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des paiements de la tontine');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const approvePayment = async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await paymentRepository.approvePayment(paymentId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la validation du paiement');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const rejectPayment = async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await paymentRepository.rejectPayment(paymentId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du rejet du paiement');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getMyPayments,
    submitContribution,
    getTontinePayments,
    approvePayment,
    rejectPayment,
    isLoading,
    error
  };
};
