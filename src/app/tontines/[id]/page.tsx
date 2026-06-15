'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { DetailHeader } from '@/presentation/components/tontine/DetailHeader';
import { StatCards } from '@/presentation/components/tontine/StatCards';
import { CurrentCycle } from '@/presentation/components/tontine/CurrentCycle';
import { TransactionList } from '@/presentation/components/tontine/TransactionList';
import { InfoCards } from '@/presentation/components/tontine/InfoCards';
import { useTontine } from '@/presentation/hooks/useTontine';
import { Tontine } from '@/core/domain/entities/Tontine';
import { Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';

export default function TontineDetailPage() {
  const { id } = useParams();
  const { getTontineById, isLoading, error } = useTontine();
  const [tontine, setTontine] = useState<Tontine | null>(null);

  const fetchTontine = async () => {
    if (typeof id === 'string') {
      const data = await getTontineById(id);
      if (data) setTontine(data);
    }
  };

  useEffect(() => {
    fetchTontine();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-md">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-slate-grey font-medium">Chargement des détails...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !tontine) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-lg">
          <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-xl text-center max-w-md">
            <p className="text-status-error font-bold">{error || "Tontine non trouvée"}</p>
            <Button variant="secondary" className="mt-md" onClick={fetchTontine}>
              Réessayer
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl -mt-xxl">
        <DetailHeader
          title={tontine.title || tontine.name || "Tontine sans nom"}
          code={tontine.code || tontine.inviteCode || "N/A"}
        />

        <div className="flex flex-col gap-xl">
          <StatCards
            amount={tontine.amount || tontine.contribution}
            frequency={tontine.frequency}
            maxMembers={tontine.maxMembers || (tontine as any).max_members || 10}
            currentMembers={tontine.members?.current || (tontine as any).currentMembers || 1}
          />

          <div className="flex flex-col lg:flex-row gap-xl items-start">
            <div className="flex-1 flex flex-col gap-xl w-full">
              <CurrentCycle />
              <InfoCards />
            </div>

            <TransactionList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
