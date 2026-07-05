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
      const [payoutsData, statsData] = await Promise.all([
        tontineRepository.listPayouts(tontineId),
        tontineRepository.getPayoutStats(tontineId)
      ]);

      // Extraction robust from paginated/wrapped response
      const payouts = payoutsData?.data?.payouts || payoutsData?.payouts || (Array.isArray(payoutsData) ? payoutsData : []);
      const stats = statsData?.data || statsData;

      return { payouts, stats };
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
      const [operations, balance, globalStats] = await Promise.all([
        tontineRepository.getMySavingsOperations(tontineId),
        tontineRepository.getMySavingsBalance(tontineId),
        tontineRepository.getSavingsStats(tontineId)
      ]);
      return { operations, balance, globalStats };
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de votre épargne');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const depositSavings = async (tontineId: string, data: { amount: number, note: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.depositSavings(tontineId, data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du dépôt');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawSavings = async (tontineId: string, data: { amount: number, note: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.withdrawSavings(tontineId, data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la demande de retrait');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reviewSaving = async (tontineId: string, savingId: string, status: 'APPROVED' | 'REJECTED') => {
    setIsLoading(true);
    setError(null);
    try {
      // Mapping status to the action field expected by repo
      await tontineRepository.reviewSaving(tontineId, savingId, status);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la revue de l\'opération');
      return false;
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
