'use client';

import React, { useState, useEffect } from 'react';
import { Plus, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { TontineCard } from '@/presentation/components/dashboard/TontineCard';
import { SummarySection } from '@/presentation/components/dashboard/SummarySection';
import { CreateTontineDrawer } from '@/presentation/components/dashboard/CreateTontineDrawer';
import { JoinTontineDrawer } from '@/presentation/components/dashboard/JoinTontineDrawer';
import { useTontine } from '@/presentation/hooks/useTontine';
import { Tontine } from '@/core/domain/entities/Tontine';

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [tontines, setTontines] = useState<Tontine[]>([]);
  const { listTontines, isLoading, error } = useTontine();

  const fetchTontines = async () => {
    const data = await listTontines();
    console.log("Dashboard: Data received from hook:", data);
    if (data !== null) {
      setTontines(data);
    }
  };

  useEffect(() => {
    fetchTontines();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl">
        <header className="flex justify-between items-end">
          <div className="flex flex-col gap-sm">
            <h1 className="text-4xl font-bold text-slate tracking-tight">Mes Tontines</h1>
            <p className="text-body-md text-slate-grey">Gérez vos cercles d'épargne et suivez vos cotisations.</p>
          </div>
          <div className="flex gap-md">
            <Button
              variant="secondary"
              className="gap-sm"
              onClick={() => setIsJoinOpen(true)}
            >
              <UserPlus size={18} />
              Rejoindre
            </Button>
            <Button
              className="gap-sm"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus size={18} />
              Créer une tontine
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-md">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-slate-grey font-medium">Chargement de vos tontines...</p>
          </div>
        ) : error ? (
          <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-xl text-center">
            <p className="text-status-error font-bold">{error}</p>
            <Button variant="secondary" className="mt-md" onClick={fetchTontines}>
              Réessayer
            </Button>
          </div>
        ) : Array.isArray(tontines) && tontines.length === 0 ? (
          <div className="bg-slate-light/30 border border-dashed border-slate-light rounded-[32px] p-20 text-center flex flex-col items-center gap-lg">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-grey shadow-sm">
              <Plus size={32} />
            </div>
            <div className="flex flex-col gap-xs w-full max-w-md mx-auto">
              <h3 className="text-xl font-bold text-slate">Aucune tontine trouvée</h3>
              <p className="text-slate-grey leading-relaxed">Commencez par créer votre propre tontine ou rejoignez-en une existante.</p>
            </div>
            <div className="flex gap-md mt-md">
              <Button variant="secondary" onClick={() => setIsJoinOpen(true)}>Rejoindre</Button>
              <Button onClick={() => setIsCreateOpen(true)}>Créer une tontine</Button>
            </div>
          </div>
        ) : Array.isArray(tontines) ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            {tontines.map((tontine) => (
              <TontineCard key={tontine.id} {...tontine} />
            ))}
          </section>
        ) : (
          <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-xl text-center">
            <p className="text-status-error font-bold">Format de données invalide reçu du serveur</p>
          </div>
        )}

        <SummarySection totalTontines={Array.isArray(tontines) ? tontines.length : 0} />
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
