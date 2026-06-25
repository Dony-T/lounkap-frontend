'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { StatCards } from '@/presentation/components/tontine/StatCards';
import { CurrentCycle } from '@/presentation/components/tontine/CurrentCycle';
import { TransactionList } from '@/presentation/components/tontine/TransactionList';
import { InfoCards } from '@/presentation/components/tontine/InfoCards';
import { CycleManagement } from '@/presentation/components/tontine/CycleManagement';
import { PayoutManagement } from '@/presentation/components/tontine/PayoutManagement';
import { PaymentManagement } from '@/presentation/components/tontine/PaymentManagement';
import { SavingsManagement } from '@/presentation/components/tontine/SavingsManagement';
import { LoanManagement } from '@/presentation/components/tontine/LoanManagement';
import { MemberTable } from '@/presentation/components/dashboard/MemberTable';
import { useTontine } from '@/presentation/hooks/useTontine';
import { useTontineContext } from '@/presentation/context/TontineContext';
import { Tontine } from '@/core/domain/entities/Tontine';
import { Loader2, ChevronRight, UserPlus, Plus } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { AddMemberDrawer } from '@/presentation/components/dashboard/AddMemberDrawer';
import Link from 'next/link';

export default function TontineDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Aperçu';

  const { getTontineById, getMembers, getTransactions, isLoading, error } = useTontine();
  const { setCurrentTontine } = useTontineContext();
  const [tontine, setTontine] = useState<Tontine | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const fetchData = async () => {
    if (typeof id === 'string') {
      const tontineData = await getTontineById(id);
      if (tontineData) {
        setTontine(tontineData);
        setCurrentTontine(tontineData);
      }

      const [memberList, txList] = await Promise.all([
        getMembers(id),
        getTransactions(id)
      ]);

      if (memberList) setMembers(memberList);
      if (txList) setTransactions(txList);
    }
  };

  useEffect(() => {
    fetchData();
    // Cleanup when leaving the page
    return () => setCurrentTontine(null);
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
      <div className="flex flex-col gap-xl">
        {/* Header with Path on Left and Actions on Right */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-xs text-[10px] font-medium text-slate-grey">
            <Link href="/" className="hover:text-primary transition-colors">Tontines</Link>
            <ChevronRight size={10} />
            <span>Détails de la Tontine</span>
            <ChevronRight size={10} />
            <span className="text-status-warning font-bold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-md">
            <Button
              variant="secondary"
              className="gap-sm h-10 px-md rounded-xl border-slate-light text-slate font-bold text-xs"
              onClick={() => setIsAddMemberOpen(true)}
            >
              <UserPlus size={16} />
              Ajouter un membre
            </Button>
            <Button
              className="gap-sm h-10 px-md rounded-xl bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none font-bold text-xs"
            >
              <Plus size={16} />
              Action
            </Button>
          </div>
        </div>

        {activeTab === 'Aperçu' ? (
          <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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

              <TransactionList transactions={transactions} />
            </div>
          </div>
        ) : activeTab === 'Membres' ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MemberTable members={members} isLoading={isLoading} />
          </section>
        ) : activeTab === 'Cycles' ? (
          <CycleManagement tontineId={tontine.id} />
        ) : activeTab === 'Paiements' ? (
          <PaymentManagement />
        ) : activeTab === 'Payouts' ? (
          <PayoutManagement />
        ) : activeTab === 'Epargne' ? (
          <SavingsManagement tontineId={tontine.id} />
        ) : activeTab === 'Prets' ? (
          <LoanManagement tontineId={tontine.id} />
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
