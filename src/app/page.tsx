'use client';

import React, { useState, useEffect } from 'react';
import { Plus, UserPlus, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { TontineCard } from '@/presentation/components/dashboard/TontineCard';
import { SummarySection } from '@/presentation/components/dashboard/SummarySection';
import { CreateTontineDrawer } from '@/presentation/components/dashboard/CreateTontineDrawer';
import { JoinTontineDrawer } from '@/presentation/components/dashboard/JoinTontineDrawer';
import { useTontine } from '@/presentation/hooks/useTontine';
import { useTontineContext } from '@/presentation/context/TontineContext';
import { Tontine } from '@/core/domain/entities/Tontine';

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [tontines, setTontines] = useState<Tontine[]>([]);
  const { listTontines, isLoading, error } = useTontine();
  const { setCurrentTontine } = useTontineContext();

  const fetchTontines = async () => {
    const data = await listTontines();
    console.log("Dashboard: Data received from hook:", data);
    if (data !== null) {
      setTontines(data);
    }
  };

  useEffect(() => {
    fetchTontines();
    // Clear context when on dashboard
    setCurrentTontine(null);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl w-full">
        <header className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-xs text-[10px] font-medium text-slate-grey mb-1">
              <span>LounKap</span>
              <ChevronRight size={10} />
              <span className="text-primary font-bold">Tableau de bord</span>
            </div>
            <h1 className="text-4xl font-bold text-slate tracking-tight">Mes Tontines</h1>
            <p className="text-body-md text-slate-grey">Gérez vos cercles d'épargne et suivez vos cotisations.</p>
          </div>
          <div className="flex gap-md mt-6">
            <Button
              variant="secondary"
              className="gap-sm h-11 px-lg rounded-2xl border-slate-light text-slate font-bold"
              onClick={() => setIsJoinOpen(true)}
            >
              <UserPlus size={18} />
              Rejoindre
            </Button>
            <Button
              className="gap-sm h-11 px-lg rounded-2xl bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none font-bold shadow-md shadow-status-warning/20"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus size={18} />
              Créer une tontine
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-md w-full">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-slate-grey font-medium">Chargement de vos tontines...</p>
          </div>
        ) : error ? (
          <div className="w-full bg-status-error/10 border border-status-error/20 rounded-2xl p-xl text-center">
            <p className="text-status-error font-bold">{error}</p>
            <Button variant="secondary" className="mt-md" onClick={fetchTontines}>
              Réessayer
            </Button>
          </div>
        ) : Array.isArray(tontines) && tontines.length === 0 ? (
          <div className="w-full bg-slate-light/30 border border-dashed border-slate-light rounded-[32px] p-20 text-center flex flex-col items-center justify-center gap-lg min-h-[400px]">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-grey shadow-sm mb-4">
              <Plus size={32} />
            </div>
            <div className="flex flex-col gap-sm w-full max-w-lg">
              <h3 className="text-2xl font-bold text-slate">Aucune tontine trouvée</h3>
              <p className="text-slate-grey leading-relaxed">
                Commencez par créer votre propre tontine ou rejoignez-en une existante pour commencer à épargner avec votre communauté.
              </p>
            </div>
            <div className="flex gap-md mt-md">
              <Button variant="secondary" className="h-12 px-xl rounded-2xl" onClick={() => setIsJoinOpen(true)}>Rejoindre</Button>
              <Button className="h-12 px-xl rounded-2xl" onClick={() => setIsCreateOpen(true)}>Créer une tontine</Button>
            </div>
          </div>
        ) : Array.isArray(tontines) ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl w-full">
            {tontines.map((tontine) => (
              <TontineCard key={tontine.id} {...tontine} />
            ))}
          </section>
        ) : (
          <div className="w-full bg-status-error/10 border border-status-error/20 rounded-2xl p-xl text-center">
            <p className="text-status-error font-bold">Format de données invalide reçu du serveur</p>
          </div>
        )}
      </div>

      <CreateTontineDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchTontines}
      />

      <JoinTontineDrawer
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSuccess={fetchTontines}
      />
    </DashboardLayout>
  );
}
