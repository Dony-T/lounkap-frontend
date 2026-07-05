'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  ChevronLeft,
  Wallet,
  TrendingUp,
  Calendar,
  Users,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Megaphone,
  CreditCard,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useTontine } from '@/presentation/hooks/useTontine';

export default function CycleDetailPage() {
  const { id, cycleId } = useParams();
  const router = useRouter();
  const { getTontineById, getCycleById, getCycleStats, isLoading, error } = useTontine();
  const [cycle, setCycle] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [tontine, setTontine] = useState<any>(null);

  const fetchData = async () => {
    console.log("CycleDetailPage: Fetching data for cycle:", cycleId);
    if (typeof id === 'string' && typeof cycleId === 'string') {
      const tontineData = await getTontineById(id);
      setTontine(tontineData);

      const [cycleData, statsData] = await Promise.all([
        getCycleById(id, cycleId),
        getCycleStats(id, cycleId)
      ]);

      console.log("CycleDetailPage: API cycleData:", cycleData);
      console.log("CycleDetailPage: API statsData:", statsData);

      if (cycleData) {
        setCycle(cycleData);
      }

      if (statsData) setStats(statsData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, cycleId]);

  if (isLoading && !cycle) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xl -mt-xxl">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-sm text-sm font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <ChevronLeft size={18} />
          Retour aux cycles
        </button>

        <div className="flex items-center gap-md">
          <h1 className="text-3xl font-bold text-slate tracking-tight">Cycle : {cycle?.name}</h1>
          <Badge variant="success" className="bg-status-success/10 text-status-success border-none">ACTIVE</Badge>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          <Card className="bg-white border-slate-light/50 shadow-air">
            <CardContent className="p-xl flex flex-col gap-sm">
              <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Cagnotte Globale</span>
              <span className="text-lg font-bold text-slate">{(cycle?.targetAmount || cycle?.total_amount || 0).toLocaleString()} FCFA</span>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-light/50 shadow-air">
            <CardContent className="p-xl flex flex-col gap-sm">
              <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Fonds Collectés</span>
              <span className="text-lg font-bold text-primary">{(cycle?.collectedAmount || cycle?.collected_amount || 0).toLocaleString()} FCFA</span>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-light/50 shadow-air">
            <CardContent className="p-xl flex flex-col gap-sm">
              <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Tours Complétés</span>
              <span className="text-lg font-bold text-slate">{cycle?.completedTurns || cycle?.completed_turns || 0} / {cycle?.totalTurns || cycle?.total_turns || 0}</span>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-light/50 shadow-air">
            <CardContent className="p-xl flex flex-col gap-sm">
              <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Taux de complétion <span className="text-slate font-bold">{cycle?.completionRate || cycle?.completion_rate || 0}%</span></span>
              <div className="h-1.5 w-full bg-slate-light/50 rounded-full mt-2">
                <div className="h-full bg-status-warning rounded-full" style={{ width: `${cycle?.completionRate || cycle?.completion_rate || 0}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-xl">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-xl">
            {/* Beneficiary Card */}
            <Card className="bg-white border-slate-light/50 shadow-air relative overflow-hidden">
              <div className="absolute top-0 right-0 px-md py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                Tour en cours
              </div>
              <CardContent className="p-xxl flex flex-col gap-xxl">
                <div className="flex flex-col gap-md">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Bénéficiaire</span>
                  <div className="flex items-center gap-xl">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-slate-100 flex items-center justify-center">
                      {cycle?.currentBeneficiary?.avatar || cycle?.current_beneficiary?.avatar ? (
                        <img src={cycle?.currentBeneficiary?.avatar || cycle?.current_beneficiary?.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <Users size={32} className="text-slate-grey/30" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold text-slate">
                        {cycle?.currentBeneficiary?.name || cycle?.current_beneficiary?.name || "En attente"}
                      </h2>
                      <p className="text-sm font-medium text-slate-grey">
                        Tour n°{cycle?.currentBeneficiary?.turnNumber || cycle?.current_turn || 1} •
                        <span className="text-status-warning ml-1">
                          {cycle?.currentBeneficiary?.status || cycle?.status || "Collecte en cours"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-md">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate">Collecte du tour</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-primary">
                        {(cycle?.currentBeneficiary?.turnCollected || cycle?.collected_amount || 0).toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-slate-grey">
                        / {(cycle?.currentBeneficiary?.turnTarget || cycle?.target_amount || 0).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-light/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, ((cycle?.currentBeneficiary?.turnCollected || cycle?.collected_amount || 0) / (cycle?.currentBeneficiary?.turnTarget || cycle?.target_amount || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-lg">
                  <Button className="flex-1 h-14 rounded-2xl gap-sm shadow-lg shadow-primary/20">
                    <CreditCard size={20} />
                    Enregistrer un paiement
                  </Button>
                  <Button variant="secondary" className="flex-1 h-14 rounded-2xl gap-sm border-slate-light text-slate">
                    <Megaphone size={20} />
                    Relancer les membres
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bottom mini-stats */}
            <div className="grid grid-cols-2 gap-lg">
              <div className="bg-white p-lg rounded-3xl border border-slate-light/50 flex items-center gap-lg shadow-air">
                <div className="w-12 h-12 rounded-2xl bg-status-success/10 flex items-center justify-center text-status-success">
                  <TrendingUp size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Moyenne de collecte</span>
                  <span className="text-sm font-bold text-slate">{cycle?.stats?.averageCollection?.toLocaleString()} FCFA</span>
                </div>
              </div>
              <div className="bg-white p-lg rounded-3xl border border-slate-light/50 flex items-center gap-lg shadow-air">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Prochaine levée</span>
                  <span className="text-sm font-bold text-slate">{cycle?.stats?.nextCollectionDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Timeline Area */}
          <div className="w-full lg:w-[320px]">
            <Card className="bg-white border-slate-light/50 shadow-air h-full">
              <div className="p-xl border-b border-slate-light/30">
                <h3 className="text-lg font-bold text-slate">Chronologie du cycle</h3>
              </div>
              <CardContent className="p-0 flex flex-col">
                <div className="flex flex-col">
                  {cycle?.timeline?.map((item: any, idx: number) => (
                    <div key={idx} className={cn(
                      "p-xl flex items-center gap-md relative",
                      item.status === "EN COURS" && "bg-primary/[0.03]"
                    )}>
                      {idx !== cycle.timeline.length - 1 && (
                        <div className="absolute left-[36px] top-[70px] w-0.5 h-10 bg-slate-light/30" />
                      )}

                      {/* Avatar with status icon */}
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-light overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt={item.name} />
                        </div>
                        {item.status === "PAYÉ" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-status-success rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle2 size={10} className="text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col">
                        <span className="text-sm font-bold text-slate">{item.name}</span>
                        <span className="text-[10px] font-medium text-slate-grey">{item.date}</span>
                      </div>

                      <Badge
                        className={cn(
                          "border-none text-[8px] font-bold",
                          item.status === "PAYÉ" ? "bg-status-success/10 text-status-success" :
                          item.status === "EN COURS" ? "bg-primary/10 text-primary" :
                          "bg-slate-light/50 text-slate-grey"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <button className="p-xl border-t border-slate-light/30 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-sm">
                  Voir tout le calendrier
                  <ExternalLink size={14} />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
