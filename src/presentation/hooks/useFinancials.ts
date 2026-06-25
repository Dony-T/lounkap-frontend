import { useState } from 'react';
import { TontineRepository } from '@/infrastructure/repositories/TontineRepository';

const tontineRepository = new TontineRepository();

export const useFinancials = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Payouts ---
  const listPayouts = async (tontineId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.listPayouts(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des versements');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const markPayoutPaid = async (tontineId: string, payoutId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.updatePayoutStatus(tontineId, payoutId, 'PAID');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la validation du versement');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // --- Savings ---
  const getMySavings = async (tontineId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const operations = await tontineRepository.getMySavingsOperations(tontineId);
      const balance = await tontineRepository.getMySavingsBalance(tontineId);
      return { operations, balance };
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de votre épargne');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const depositSavings = async (tontineId: string, amount: number) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.depositSavings(tontineId, { amount });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du dépôt');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // --- Loans ---
  const listLoans = async (tontineId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.listLoans(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des prêts');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const requestLoan = async (tontineId: string, data: { amount: number, reason: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.requestLoan(tontineId, data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la demande de prêt');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listPayouts,
    markPayoutPaid,
    getMySavings,
    depositSavings,
    listLoans,
    requestLoan,
    isLoading,
    error
  };
};
