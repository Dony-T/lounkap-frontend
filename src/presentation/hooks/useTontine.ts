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

  return { createTontine, listTontines, joinTontine, getTontineById, getMembers, addMember, isLoading, error };
};
