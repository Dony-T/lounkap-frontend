'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { DetailHeader } from '@/presentation/components/tontine/DetailHeader';
import { StatCards } from '@/presentation/components/tontine/StatCards';
import { CurrentCycle } from '@/presentation/components/tontine/CurrentCycle';
import { TransactionList } from '@/presentation/components/tontine/TransactionList';
import { InfoCards } from '@/presentation/components/tontine/InfoCards';
import { CycleManagement } from '@/presentation/components/tontine/CycleManagement';
import { PayoutManagement } from '@/presentation/components/tontine/PayoutManagement';
import { AddMemberDrawer } from '@/presentation/components/dashboard/AddMemberDrawer';
import { MemberTable } from '@/presentation/components/dashboard/MemberTable';
import { useTontine } from '@/presentation/hooks/useTontine';
import { Tontine } from '@/core/domain/entities/Tontine';
import { Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';

export default function TontineDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Aperçu';

  const { getTontineById, getMembers, isLoading, error } = useTontine();
  const [tontine, setTontine] = useState<Tontine | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    router.push(`/tontines/${id}?tab=${tab}`);
  };

  const fetchData = async () => {
    if (typeof id === 'string') {
      const tontineData = await getTontineById(id);
      if (tontineData) setTontine(tontineData);

      const memberList = await getMembers(id);
      if (memberList) setMembers(memberList);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading && !tontine) {
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
            <Button variant="secondary" className="mt-md" onClick={fetchData}>
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
          title={tontine.title || (tontine as any).name || "Tontine sans nom"}
          code={tontine.code || (tontine as any).inviteCode || "N/A"}
          onAddMember={() => setIsAddMemberOpen(true)}
          selectedTab={activeTab}
          onTabChange={handleTabChange}
        />

        {activeTab === 'Aperçu' ? (
          <div className="flex flex-col gap-xl">
            <StatCards
              amount={tontine.amount || tontine.contribution}
              frequency={tontine.frequency}
              maxMembers={tontine.maxMembers || (tontine as any).max_members || 10}
              currentMembers={members.length || tontine.members?.current || 1}
            />

            <div className="flex flex-col lg:flex-row gap-xl items-start">
              <div className="flex-1 flex flex-col gap-xl w-full">
                <CurrentCycle />
                <InfoCards />
              </div>

              <TransactionList />
            </div>
          </div>
        ) : activeTab === 'Membres' ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MemberTable members={members} isLoading={isLoading} />
          </section>
        ) : activeTab === 'Cycles' ? (
          <CycleManagement tontineId={tontine.id} />
        ) : activeTab === 'Payouts' ? (
          <PayoutManagement />
        ) : (
          <div className="bg-white rounded-3xl shadow-air p-20 text-center border border-slate-light/50">
            <p className="text-slate-grey font-medium italic">Cette section ({activeTab}) est en cours de développement.</p>
          </div>
        )}
      </div>

      <AddMemberDrawer
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        tontineId={tontine.id}
        onSuccess={fetchData}
      />
    </DashboardLayout>
  );
}
