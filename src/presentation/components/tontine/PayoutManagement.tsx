import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useFinancials } from '@/presentation/hooks/useFinancials';

interface PayoutManagementProps {
  tontineId: string;
}

export const PayoutManagement = ({ tontineId }: PayoutManagementProps) => {
  const { listPayouts, markPayoutPaid, isLoading, error } = useFinancials();
  const [data, setData] = useState<{ payouts: any[], stats: any } | null>(null);

  const fetchData = async () => {
    const result = await listPayouts(tontineId);
    if (result) setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [tontineId]);

  const handleMarkAsPaid = async (payoutId: string) => {
    if (await markPayoutPaid(tontineId, payoutId)) {
      fetchData(); // Refresh list
    }
  };

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-md">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-slate-grey font-medium">Chargement des versements...</p>
      </div>
    );
  }

  const payouts = data?.payouts || [];
  const stats = data?.stats || {};

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">TOTAL VERSÉ (HISTORIQUE)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-success">
                {(stats.totalDistributed || 0).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
            <p className="text-[10px] text-slate-grey/60 mt-1 italic">{stats.completedPayoutsCount || 0} versements effectués</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">EN ATTENTE DE VERSEMENT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-warning">
                {(stats.pendingPayouts || 0).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="bg-white border-slate-light/50 shadow-air overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-light/5 border-b border-slate-light/30">
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Bénéficiaire</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Cycle / Date</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Montant</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              {payouts.map((payout: any) => (
                <tr key={payout.id} className="hover:bg-slate-light/5 transition-colors group">
                  <td className="px-lg py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                        {payout.user?.name?.[0] || payout.beneficiary?.name?.[0] || 'U'}
                      </div>
                      <span className="text-sm font-bold text-slate">{payout.user?.name || payout.beneficiary?.name || 'Inconnu'}</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-grey">{payout.cycleId ? 'Cycle Actuel' : 'N/A'}</span>
                      <span className="text-[10px] text-slate-grey/60">
                        {payout.createdAt ? new Date(payout.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate">{(Number(payout.amount) || 0).toLocaleString()}</span>
                      <span className="text-[10px] font-medium text-slate-grey">FCFA</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg text-center">
                    <Badge
                      className={cn(
                        "border-none text-[10px] font-bold px-3 py-1",
                        payout.status === 'PAID' ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                      )}
                    >
                      {payout.status === 'PAID' ? 'PAYÉ' : 'EN ATTENTE'}
                    </Badge>
                  </td>
                  <td className="px-lg py-lg text-right">
                    {payout.status !== 'PAID' ? (
                      <Button
                        onClick={() => handleMarkAsPaid(payout.id)}
                        disabled={isLoading}
                        className="bg-status-success hover:bg-status-success/90 text-white border-none text-[11px] font-bold h-9 px-4 rounded-xl shadow-md shadow-status-success/20"
                      >
                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : 'Marquer Payé'}
                      </Button>
                    ) : (
                      <button className="p-sm text-slate-grey hover:text-slate transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {payouts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-lg py-xxl text-center text-slate-grey italic">
                    Aucun versement enregistré pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
