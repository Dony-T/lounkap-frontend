import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { usePayment } from '@/presentation/hooks/usePayment';

interface PaymentManagementProps {
  tontineId: string;
}

export const PaymentManagement = ({ tontineId }: PaymentManagementProps) => {
  const { getTontinePayments, isLoading } = usePayment();
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  const fetchData = async () => {
    const result = await getTontinePayments(tontineId);

    if (result && !Array.isArray(result)) {
      setPayments(result.payments || []);
      setStats(result.stats || null);
    } else if (Array.isArray(result)) {
      setPayments(result);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tontineId]);

  if (isLoading && payments.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const paymentsList = Array.isArray(payments) ? payments : [];

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters - Flat Layout */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="relative flex-1 w-full md:max-w-md">
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="w-full px-md py-sm bg-white border border-slate-light rounded-2xl text-sm focus:outline-none focus:border-primary/50 transition-colors h-11"
          />
        </div>
        <div className="flex items-center gap-sm w-full md:w-auto">
          <Button variant="secondary" className="gap-sm h-11 rounded-2xl border-slate-light text-slate flex-1 md:flex-none">
            <Filter size={18} />
            Filtrer
          </Button>
          <Button variant="secondary" className="gap-sm h-11 rounded-2xl border-slate-light text-slate flex-1 md:flex-none">
            <Calendar size={18} />
            Période
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Collecte Totale</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate">
                {(stats?.totalCollected || paymentsList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Nombre de paiements</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {stats?.paymentsCount || paymentsList.length}
              </span>
              <span className="text-xs font-bold text-slate-grey">validés</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Taux de réussite</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-success">
                {stats?.successRate || '100'}%
              </span>
              <span className="text-xs font-bold text-slate-grey">moyenne</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="bg-white border-slate-light/50 shadow-air overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-light/5 border-b border-slate-light/30">
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Transaction</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Type</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Date</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Montant</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              {paymentsList.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-light/5 transition-colors group">
                  <td className="px-lg py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <ArrowDownLeft size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate">{payment.user?.name || payment.userName || 'Membre'}</span>
                        <span className="text-[10px] text-slate-grey font-medium tracking-tight">
                          {payment.description || 'Cotisation'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <Badge variant="neutral" className="text-[10px] font-bold">
                      {payment.type || 'COTISATION'}
                    </Badge>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-medium text-slate-grey">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-bold text-slate">{(Number(payment.amount) || 0).toLocaleString()} FCFA</span>
                  </td>
                  <td className="px-lg py-lg text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} className={payment.status === 'SUCCESS' || payment.status === 'COMPLETED' ? "text-status-success" : "text-slate-grey"} />
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        payment.status === 'SUCCESS' || payment.status === 'COMPLETED' ? "text-status-success" : "text-slate-grey"
                      )}>
                        {payment.status || 'TERMINÉ'}
                      </span>
                    </div>
                  </td>
                  <td className="px-lg py-lg text-right">
                    <button className="p-sm text-slate-grey hover:text-slate transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paymentsList.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-lg py-xxl text-center text-slate-grey italic">
                    Aucune transaction trouvée pour cette tontine.
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
