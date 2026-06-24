'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tontine } from '@/core/domain/entities/Tontine';

interface TontineContextType {
  currentTontine: Tontine | null;
  setCurrentTontine: (tontine: Tontine | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TontineContext = createContext<TontineContextType | undefined>(undefined);

export const TontineProvider = ({ children }: { children: ReactNode }) => {
  const [currentTontine, setCurrentTontine] = useState<Tontine | null>(null);
  const [activeTab, setActiveTab] = useState('Aperçu');

  return (
    <TontineContext.Provider value={{ currentTontine, setCurrentTontine, activeTab, setActiveTab }}>
      {children}
    </TontineContext.Provider>
  );
};

export const useTontineContext = () => {
  const context = useContext(TontineContext);
  if (context === undefined) {
    throw new Error('useTontineContext must be used within a TontineProvider');
  }
  return context;
};
