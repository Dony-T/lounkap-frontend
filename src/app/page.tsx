'use client';

import React, { useState, useEffect } from 'react';
import { Plus, UserPlus, Loader2, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { TontineCard } from '@/presentation/components/dashboard/TontineCard';
import { SummarySection } from '@/presentation/components/dashboard/SummarySection';
import { CreateTontineDrawer } from '@/presentation/components/dashboard/CreateTontineDrawer';
import { JoinTontineDrawer } from '@/presentation/components/dashboard/JoinTontineDrawer';
import { useTontine } from '@/presentation/hooks/useTontine';
import { useTontineContext } from '@/presentation/context/TontineContext';
import { Tontine } from '@/core/domain/entities/Tontine';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [tontines, setTontines] = useState<Tontine[]>([]);
  const { listTontines, isLoading, error } = useTontine();
  const { setCurrentTontine } = useTontineContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const fetchTontines = async () => {
    const data = await listTontines();
    if (data !== null) {
      setTontines(data);
    }
  };

  useEffect(() => {
    fetchTontines();
    setCurrentTontine(null);
  }, []);

  const filteredTontines = tontines.filter(t =>
    (t.name || (t as any).title || '').toLowerCase().includes(searchQuery) ||
    (t.description || '').toLowerCase().includes(searchQuery)
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl w-full">
        <header className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-xs text-xs font-medium text-slate-grey mb-1">
              <span>LounKap</span>
              <ChevronRight size={12} />
              <span className="text-primary font-bold">Tableau de bord</span>
            </div>
            <h1 className="text-4xl font-bold text-slate tracking-tight">Mes Tontines</h1>
            <p className="text-sm text-slate-grey">Gérez vos cercles d'épargne et suivez vos cotisations.</p>
          </div>

          <div className="flex gap-md mt-6">
            <Button
              variant="secondary"
              className="gap-sm h-11 px-lg rounded-2xl border-slate-light text-slate font-bold shadow-sm"
              onClick={() => setIsJoinOpen(true)}
            >
              <UserPlus size={18} />
              Rejoindre
            </Button>
            <Button
              className="gap-sm h-11 px-lg rounded-2xl bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none font-bold shadow-lg shadow-status-warning/30"
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
          /* ... existing error content ... */
          null
        ) : filteredTontines.length === 0 ? (
          <div className="w-full bg-slate-light/30 border border-dashed border-slate-light rounded-[32px] p-20 text-center flex flex-col items-center justify-center gap-lg min-h-[400px]">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-grey shadow-sm mb-4">
              <Search size={32} />
            </div>
            <div className="flex flex-col gap-sm w-full max-w-lg">
              <h3 className="text-2xl font-bold text-slate">Aucun résultat trouvé</h3>
              <p className="text-slate-grey leading-relaxed">
                Nous n'avons trouvé aucune tontine correspondant à "{searchQuery}". Essayez avec d'autres mots-clés.
              </p>
            </div>
            <Button variant="secondary" onClick={() => fetchTontines()}>Afficher tout</Button>
          </div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl w-full">
            {filteredTontines.map((tontine) => (
              <TontineCard key={tontine.id} {...tontine} />
            ))}
          </section>
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
