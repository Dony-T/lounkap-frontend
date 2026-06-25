import { useState } from 'react';
import { TontineRepository } from '@/infrastructure/repositories/TontineRepository';
import { CreateTontineUseCase } from '@/core/use-cases/tontine/CreateTontineUseCase';
import { ListTontinesUseCase } from '@/core/use-cases/tontine/ListTontinesUseCase';
import { JoinTontineUseCase } from '@/core/use-cases/tontine/JoinTontineUseCase';
import { Tontine, CreateTontineDTO } from '@/core/domain/entities/Tontine';

const tontineRepository = new TontineRepository();
const createTontineUseCase = new CreateTontineUseCase(tontineRepository);
const listTontinesUseCase = new ListTontinesUseCase(tontineRepository);
const joinTontineUseCase = new JoinTontineUseCase(tontineRepository);

export const useTontine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTontine = async (data: CreateTontineDTO): Promise<Tontine | null> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("useTontine: Sending data to API ->", data);
      return await createTontineUseCase.execute(data);
    } catch (err: any) {
      console.error("useTontine: API Error ->", err.response?.data);
      setError(err.response?.data?.message || 'Erreur lors de la création de la tontine');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const listTontines = async (): Promise<Tontine[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await listTontinesUseCase.execute();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des tontines');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const joinTontine = async (code: string): Promise<Tontine | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await joinTontineUseCase.execute(code);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la tentative de rejoindre la tontine');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getTontineById = async (id: string): Promise<Tontine | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.getById(id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de la tontine');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMembers = async (tontineId: string): Promise<any[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.getMembers(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des membres');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addMember = async (tontineId: string, data: { emailOrPhone: string; role: string }): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.addMember(tontineId, data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout du membre");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberRole = async (tontineId: string, userId: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.updateMemberRole(tontineId, userId, role);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du changement de rôle");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberStatus = async (tontineId: string, userId: string, status: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.updateMemberStatus(tontineId, userId, status);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du changement de statut");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeMember = async (tontineId: string, userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.removeMember(tontineId, userId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'exclusion du membre");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberStats = async (tontineId: string, userId: string): Promise<any | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.getMemberStats(tontineId, userId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du chargement des statistiques du membre");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Cycles Hooks
  const createCycle = async (tontineId: string, data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.createCycle(tontineId, data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création du cycle");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const listCycles = async (tontineId: string): Promise<any[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.listCycles(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du chargement des cycles");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const advanceCycleTurn = async (tontineId: string, cycleId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.advanceCycleTurn(tontineId, cycleId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'avancement du tour");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const closeCycle = async (tontineId: string, cycleId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.closeCycle(tontineId, cycleId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la clôture du cycle");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCycle = async (tontineId: string, cycleId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await tontineRepository.deleteCycle(tontineId, cycleId);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression du cycle");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactions = async (tontineId: string): Promise<any[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await tontineRepository.getTransactions(tontineId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du chargement des transactions");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTontine,
    listTontines,
    joinTontine,
    getTontineById,
    getMembers,
    addMember,
    updateMemberRole,
    updateMemberStatus,
    removeMember,
    getMemberStats,
    // Cycles
    createCycle,
    listCycles,
    advanceCycleTurn,
    closeCycle,
    deleteCycle,
    // Transactions
    getTransactions,
    isLoading,
    error
  };
};
