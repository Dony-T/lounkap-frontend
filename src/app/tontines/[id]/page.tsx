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
import { Loader2, ChevronRight, UserPlus, Plus, AlertCircle, Copy } from 'lucide-react';
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
    console.log("TontineDetailPage: Starting fetchData for ID:", id);
    if (typeof id === 'string') {
      const tontineData = await getTontineById(id);
      console.log("TontineDetailPage: Received tontineData:", tontineData);

      if (tontineData) {
        setTontine(tontineData);
        setCurrentTontine(tontineData);
      } else {
        console.warn("TontineDetailPage: tontineData is null or undefined");
      }

      const [memberList, txList] = await Promise.all([
        getMembers(id),
        getTransactions(id)
      ]);

      console.log("TontineDetailPage: memberList:", memberList);
      console.log("TontineDetailPage: txList:", txList);

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

  if (error && !tontine) {
    console.log("TontineDetailPage: Rendering Error State. Error:", error);
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-base py-xxl">
          <div className="bg-white border border-slate-light/50 rounded-[32px] p-xxl text-center max-w-md w-full shadow-air animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-status-error/10 flex items-center justify-center text-status-error mx-auto mb-lg">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate mb-sm">Oups ! Une erreur est survenue</h3>
            <p className="text-sm text-slate-grey font-medium leading-relaxed mb-xl">
              {error === "Route not found."
                ? `La tontine avec l'ID "${id}" n'a pas été trouvée sur le serveur.`
                : error || "Impossible de charger les détails de la tontine."}
            </p>
            <div className="flex flex-col gap-sm">
              <Button
                variant="primary"
                className="w-full h-12 rounded-2xl shadow-lg shadow-primary/20 font-bold"
                onClick={fetchData}
              >
                Réessayer le chargement
              </Button>
              <Link href="/" className="text-sm font-bold text-slate-grey hover:text-primary transition-colors py-2">
                Retour au tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!tontine) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] w-full gap-md">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-slate-grey font-medium">Récupération des informations...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xl w-full">
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
            {activeTab === 'Epargne' && (
              <Button
                className="gap-sm h-10 px-md rounded-xl bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none font-bold text-xs"
              >
                <Plus size={16} />
                Déposer de l'épargne
              </Button>
            )}
            {(activeTab === 'Aperçu' || activeTab === 'Membres') && (
              <>
                {(tontine as any).myRole === 'PRESIDENT' && (
                  <Button
                    variant="secondary"
                    className="gap-sm h-10 px-md rounded-xl border-slate-light text-slate font-bold text-xs"
                    onClick={() => setIsAddMemberOpen(true)}
                  >
                    <UserPlus size={16} />
                    Ajouter un membre
                  </Button>
                )}
                <Button
                  className="gap-sm h-10 px-md rounded-xl bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none font-bold text-xs"
                  onClick={() => {
                    const code = tontine.inviteCode || (tontine as any).code;
                    navigator.clipboard.writeText(code);
                    alert(`Code d'invitation copié : ${code}`);
                  }}
                >
                  <Copy size={16} />
                  Inviter par code
                </Button>
              </>
            )}
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
          <PaymentManagement tontineId={tontine.id} />
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
