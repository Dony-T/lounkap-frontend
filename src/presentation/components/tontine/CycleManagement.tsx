import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  ArrowRight,
  Lock,
  ChevronRight,
  History,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useTontine } from '@/presentation/hooks/useTontine';
import { CreateCycleDrawer } from './CreateCycleDrawer';
import Link from 'next/link';

interface CycleManagementProps {
  tontineId: string;
}

export const CycleManagement = ({ tontineId }: CycleManagementProps) => {
  const { listCycles, getCycleStats, advanceCycleTurn, closeCycle, deleteCycle, isLoading } = useTontine();
  const [cycles, setCycles] = useState<any[]>([]);
  const [activeCycleStats, setActiveCycleStats] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchCycles = async () => {
    console.log("CycleManagement: Fetching cycles for tontine:", tontineId);
    const data = await listCycles(tontineId);
    if (data) {
      setCycles(data);
      const active = Array.isArray(data) ? data.find((c: any) => {
        const s = c.status?.toUpperCase();
        return s === 'ACTIVE' || s === 'IN_PROGRESS';
      }) : null;

      if (active) {
        const stats = await getCycleStats(tontineId, active.id);
        if (stats) setActiveCycleStats(stats);
      } else {
        setActiveCycleStats(null);
      }
    }
  };

  useEffect(() => {
    fetchCycles();
  }, [tontineId]);

  const cyclesList = Array.isArray(cycles) ? cycles : [];
  const activeCycle = cyclesList.find(c => {
    const s = c.status?.toUpperCase();
    return s === 'ACTIVE' || s === 'IN_PROGRESS' || s === 'PENDING' || s === 'STARTED';
  });

  const pastCycles = cyclesList.filter(c => {
    const s = c.status?.toUpperCase();
    return s !== 'ACTIVE' && s !== 'IN_PROGRESS' && s !== 'PENDING' && s !== 'STARTED';
  });

  // Mapping using stats if available, fallback to basic cycle object
  const displayFrequency = activeCycleStats?.frequency || (activeCycle as any)?.tontine?.frequency || "N/A";
  const collected = activeCycleStats?.totalCollected || activeCycle?.collectedAmount || (activeCycle as any)?.collected_amount || 0;
  const target = activeCycleStats?.globalPot || activeCycle?.targetAmount || (activeCycle as any)?.target_amount || 0;
  const progress = activeCycleStats?.completionRate || (target > 0 ? Math.round((collected / target) * 100) : 0);
  const beneficiaryName = activeCycleStats?.beneficiary || activeCycle?.currentBeneficiary?.name || "En attente";

  const handleNextTurn = async (cycleId: string) => {
    if (await advanceCycleTurn(tontineId, cycleId)) {
      fetchCycles();
    }
  };

  const handleCloseCycle = async (cycleId: string) => {
    if (window.confirm("Voulez-vous vraiment clôturer ce cycle ?")) {
      if (await closeCycle(tontineId, cycleId)) {
        fetchCycles();
      }
    }
  };

  const handleDelete = async (cycleId: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce cycle ?")) {
      if (await deleteCycle(tontineId, cycleId)) {
        fetchCycles();
      }
    }
  };

  if (isLoading && cycles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-md">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-slate-grey font-medium">Chargement des cycles...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header section with Create Button */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30 py-md -mx-base px-base border-b border-slate-light/20 mb-md">
        <h2 className="text-xl font-bold text-slate tracking-tight">Gestion des Cycles</h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-sm bg-status-warning hover:bg-status-warning/90 text-slate-dark border-none shadow-lg shadow-status-warning/30 px-lg h-11"
        >
          <Plus size={20} className="text-slate-dark" />
          <span className="font-bold text-slate-dark">Nouveau Cycle</span>
        </Button>
      </div>

      {/* Active Cycle Card */}
      {activeCycle ? (
        <Card className="bg-white border border-slate-light/50 overflow-hidden shadow-air">
          <CardContent className="p-xl flex flex-col gap-xl">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-md">
                <div className="flex items-center gap-md">
                  <h3 className="text-lg font-bold text-slate">Cycle en cours</h3>
                  <Badge variant="success" className="bg-status-success/10 text-status-success border-none text-[10px]">ACTIVE</Badge>
                </div>
                <div className="flex items-center gap-sm text-slate-grey">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">
                    Du {activeCycle.startDate ? new Date(activeCycle.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    au {activeCycle.endDate ? new Date(activeCycle.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Périodicité</span>
                <span className="text-sm font-bold text-slate">{activeCycle.frequency || (activeCycle as any).tontine?.frequency || 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              <div className="flex flex-col gap-sm">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Tour actuel</span>
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                    {(activeCycle.currentBeneficiary?.name || (activeCycle as any).beneficiary?.name || '?')[0]}
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {activeCycle.currentBeneficiary?.name || (activeCycle as any).beneficiary?.name || 'En attente'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-sm">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Fonds collectés</span>
                <div className="flex items-baseline gap-sm">
                  <span className="text-lg font-bold text-slate">
                    {Number(activeCycle.collectedAmount || (activeCycle as any).collected_amount || 0).toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-slate-grey">
                    / {Number(activeCycle.targetAmount || (activeCycle as any).target_amount || 0).toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Progression</span>
                  <span className="text-xs font-bold text-status-warning">
                    {Math.round(((activeCycle.collectedAmount || (activeCycle as any).collected_amount || 0) / (activeCycle.targetAmount || (activeCycle as any).target_amount || 1)) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-light/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-status-warning rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round(((activeCycle.collectedAmount || (activeCycle as any).collected_amount || 0) / (activeCycle.targetAmount || (activeCycle as any).target_amount || 1)) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-xl border-t border-slate-light/30">
              <div className="flex items-center gap-md">
                <Button
                  onClick={() => handleNextTurn(activeCycle.id)}
                  disabled={isLoading}
                  variant="secondary" className="gap-sm border-primary/20 text-primary hover:bg-primary/5"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Avancer le tour"}
                  <ArrowRight size={16} />
                </Button>
                <Button
                  onClick={() => handleCloseCycle(activeCycle.id)}
                  disabled={isLoading}
                  variant="secondary" className="gap-sm border-status-error/20 text-status-error hover:bg-status-error/5"
                >
                  <Lock size={16} />
                  Clôturer le cycle
                </Button>
              </div>
              <Link
                href={`/tontines/${tontineId}/cycles/${activeCycle.id}`}
                className="flex items-center gap-sm text-sm font-bold text-slate-grey hover:text-slate transition-colors group"
              >
                Détails du cycle
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-light p-xxl text-center">
          <p className="text-slate-grey italic">Aucun cycle actif. Lancez un nouveau cycle pour commencer.</p>
        </div>
      )}

      {/* History Table */}
      <Card className="bg-white border border-slate-light/50 overflow-hidden shadow-air">
        <div className="px-xl py-lg border-b border-slate-light/30">
          <h3 className="text-lg font-bold text-slate">Historique des Cycles</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-light/5">
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Période</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Tours complétés</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              {pastCycles.map((cycle) => (
                <tr key={cycle.id} className="hover:bg-slate-light/5 transition-colors">
                  <td className="px-xl py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-8 h-8 rounded-lg bg-slate-light/50 flex items-center justify-center text-slate-grey">
                        <History size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate">
                        {new Date(cycle.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} -
                        {new Date(cycle.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-xl py-lg text-center">
                    <Badge
                      className={cn(
                        "border-none text-[10px]",
                        cycle.status === 'COMPLETED' ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                      )}
                    >
                      {cycle.status}
                    </Badge>
                  </td>
                  <td className="px-xl py-lg">
                    <div className="flex flex-col gap-2 max-w-[120px] mx-auto">
                      <div className="flex justify-between text-[10px] font-bold text-slate-grey">
                        <span>{cycle.completedTurns || 0} / {cycle.totalTurns || 0}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-light/50 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            cycle.status === 'COMPLETED' ? "bg-status-success" : "bg-primary"
                          )}
                          style={{ width: `${(cycle.completedTurns / cycle.totalTurns) * 100 || 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-xl py-lg text-right">
                    <div className="flex items-center justify-end gap-md">
                      <Link
                        href={`/tontines/${tontineId}/cycles/${cycle.id}`}
                        className="p-sm text-slate-grey hover:text-primary transition-colors"
                      >
                        <EyeIcon size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cycle.id)}
                        className="p-sm text-slate-grey hover:text-status-error transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pastCycles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-xl py-lg text-center text-slate-grey italic">
                    Aucun historique disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateCycleDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        tontineId={tontineId}
        onSuccess={fetchCycles}
      />
    </div>
  );
};
// ... rest of the file (EyeIcon)

const EyeIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
