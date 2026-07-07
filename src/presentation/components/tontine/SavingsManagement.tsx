import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  History,
  Search,
  Loader2,
  TrendingUp,
  CircleDollarSign
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useFinancials } from '@/presentation/hooks/useFinancials';

interface SavingsManagementProps {
  tontineId: string;
}

export const SavingsManagement = ({ tontineId }: SavingsManagementProps) => {
  const { getMySavings, isLoading } = useFinancials();
  const [data, setData] = useState<any>(null);

  const fetchSavings = async () => {
    const result = await getMySavings(tontineId);
    console.log("SavingsManagement: Final result from hook:", result);
    if (result) setData(result);
  };

  useEffect(() => {
    fetchSavings();
  }, [tontineId]);

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // Robustly extract operations array
  let operationsList = [];
  if (data?.operations) {
    if (Array.isArray(data.operations)) {
      operationsList = data.operations;
    } else if (data.operations.data && Array.isArray(data.operations.data)) {
      operationsList = data.operations.data;
    } else if (data.operations.savings && Array.isArray(data.operations.savings)) {
      operationsList = data.operations.savings;
    }
  }

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <Card className="bg-primary text-white shadow-lg shadow-primary/20">
          <CardContent className="p-xl flex flex-col gap-md">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Mon Solde Épargne</span>
              <Wallet size={20} className="text-white/50" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{(data?.balance?.balance || 0).toLocaleString()}</span>
              <span className="text-sm font-bold text-white/70">FCFA</span>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>Dépôts: {(data?.balance?.totalDeposits || 0).toLocaleString()}</span>
              <span>Retraits: {(data?.balance?.totalWithdrawals || 0).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-md">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-grey uppercase tracking-widest">Total Épargné (Individuel)</span>
              <TrendingUp size={20} className="text-slate-grey/30" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate">
                {(data?.globalStats?.totalIndividualSavings || 0).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
            <p className="text-xs font-medium text-slate-grey/60 mt-1">Épargne cumulée de {data?.globalStats?.activeSaversCount || 0} membres</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-md">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-grey uppercase tracking-widest">Caisse Collective</span>
              <CircleDollarSign size={20} className="text-slate-grey/30" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate">
                {(data?.globalStats?.totalCollectiveSavings || 0).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
            <button className="text-xs font-bold text-primary hover:underline transition-all text-left">Gérer les fonds de groupe</button>
          </CardContent>
        </Card>
      </div>

      {/* Operations Table */}
      <Card className="bg-white border-slate-light/50 shadow-air overflow-hidden">
        <div className="px-xl py-lg border-b border-slate-light/30 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate">Historique de vos opérations</h3>
          <div className="flex gap-2">
            <Badge variant="neutral" className="bg-slate-light/30 text-slate-grey border-none text-[10px] cursor-pointer hover:bg-slate-light">Tout</Badge>
            <Badge variant="neutral" className="bg-slate-light/30 text-slate-grey border-none text-[10px] cursor-pointer hover:bg-slate-light">Dépôts</Badge>
            <Badge variant="neutral" className="bg-slate-light/30 text-slate-grey border-none text-[10px] cursor-pointer hover:bg-slate-light">Retraits</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-light/5 border-b border-slate-light/30">
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Type</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Date</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Montant</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              {operationsList.map((op: any) => (
                <tr key={op.id} className="hover:bg-slate-light/5 transition-colors group">
                  <td className="px-lg py-lg">
                    <div className="flex items-center gap-md">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center",
                        op.type === 'DEPOSIT' ? "bg-status-success/10 text-status-success" : "bg-status-error/10 text-status-error"
                      )}>
                        {op.type === 'DEPOSIT' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <span className="text-sm font-bold text-slate">{op.type === 'DEPOSIT' ? 'Dépôt' : 'Retrait'}</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-medium text-slate-grey">
                      {new Date(op.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-lg py-lg">
                    <span className={cn(
                      "text-sm font-bold",
                      op.type === 'DEPOSIT' ? "text-status-success" : "text-status-error"
                    )}>
                      {op.type === 'DEPOSIT' ? '+' : '-'} {op.amount.toLocaleString()} FCFA
                    </span>
                  </td>
                  <td className="px-lg py-lg text-center">
                    <Badge
                      className={cn(
                        "border-none text-[9px] font-bold px-3 py-1",
                        op.status === 'COMPLETED' ? "bg-status-success/10 text-status-success" :
                        op.status === 'PENDING' ? "bg-status-warning/10 text-status-warning" : "bg-status-error/10 text-status-error"
                      )}
                    >
                      {op.status}
                    </Badge>
                  </td>
                  <td className="px-lg py-lg text-right">
                    <button className="text-xs font-bold text-primary hover:underline">Reçu PDF</button>
                  </td>
                </tr>
              ))}
              {operationsList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-lg py-xxl text-center text-slate-grey italic">
                    Aucune opération enregistrée pour le moment.
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
