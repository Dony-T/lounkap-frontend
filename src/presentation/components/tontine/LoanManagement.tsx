import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Plus,
  HandCoins,
  Scale,
  Clock,
  History,
  Search,
  Loader2,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useFinancials } from '@/presentation/hooks/useFinancials';

interface LoanManagementProps {
  tontineId: string;
}

export const LoanManagement = ({ tontineId }: LoanManagementProps) => {
  const { listLoans, isLoading } = useFinancials();
  const [loans, setLoans] = useState<any[]>([]);

  const fetchLoans = async () => {
    const result = await listLoans(tontineId);
    if (result) setLoans(result);
  };

  useEffect(() => {
    fetchLoans();
  }, [tontineId]);

  if (isLoading && !loans.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">En-cours Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate">3,400,000</span>
              <span className="text-[10px] font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Prêts Actifs</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">12</span>
              <span className="text-[10px] font-bold text-slate-grey">Membres</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air border-l-4 border-l-status-success">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Capacité de Prêt</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-status-success">450,000</span>
              <span className="text-[10px] font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air border-l-4 border-l-status-error">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Impayés</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-status-error">0</span>
              <span className="text-[10px] font-bold text-slate-grey">Retard</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Header */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-3xl p-md border border-slate-light/30 shadow-sm">
        <div className="flex items-center gap-md px-md">
          <Scale size={24} className="text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate tracking-tight">Gestion des Prêts</h2>
            <p className="text-[10px] text-slate-grey font-medium uppercase">Accès au crédit et remboursements</p>
          </div>
        </div>
        <Button className="gap-sm bg-primary hover:bg-primary/90 text-white border-none shadow-lg shadow-primary/20 px-lg h-11 rounded-2xl">
          <Plus size={20} />
          <span className="font-bold">Demander un prêt</span>
        </Button>
      </div>

      {/* Loan List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Active/Pending Loans */}
        <Card className="bg-white border-slate-light/50 shadow-air h-fit">
          <div className="px-xl py-lg border-b border-slate-light/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate flex items-center gap-sm">
              <Clock size={16} className="text-status-warning" />
              Demandes et Prêts en cours
            </h3>
          </div>
          <div className="flex flex-col divide-y divide-slate-light/30">
            {loans.filter(l => l.status !== 'REPAID').map((loan: any) => (
              <div key={loan.id} className="p-xl hover:bg-slate-light/5 transition-colors">
                <div className="flex justify-between items-start mb-md">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-slate-light overflow-hidden flex items-center justify-center font-bold text-slate-grey">
                      {loan.user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate">{loan.user?.name || 'Inconnu'}</span>
                      <span className="text-[10px] text-slate-grey">{loan.reason}</span>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "border-none text-[8px] font-bold",
                      loan.status === 'APPROVED' ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                    )}
                  >
                    {loan.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Montant emprunté</span>
                    <span className="text-lg font-bold text-primary">{loan.amount.toLocaleString()} FCFA</span>
                  </div>
                  <Button size="sm" variant="secondary" className="h-8 text-[10px] rounded-xl border-slate-light text-slate">
                    Détails
                  </Button>
                </div>
              </div>
            ))}
            {!loans.filter(l => l.status !== 'REPAID').length && (
              <div className="p-xxl text-center text-slate-grey italic text-sm">
                Aucun prêt actif.
              </div>
            )}
          </div>
        </Card>

        {/* Repayment History / Stats */}
        <Card className="bg-white border-slate-light/50 shadow-air h-fit">
          <div className="px-xl py-lg border-b border-slate-light/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate flex items-center gap-sm">
              <CheckCircle2 size={16} className="text-status-success" />
              Derniers Remboursements
            </h3>
          </div>
          <CardContent className="p-xl flex flex-col gap-lg">
            <div className="bg-primary/5 rounded-2xl p-lg border border-primary/10 flex items-center gap-lg">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <HandCoins size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-grey uppercase">Intérêts collectés</span>
                <span className="text-lg font-bold text-primary">45,000 FCFA</span>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Historique Récent</span>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-sm border-b border-slate-light/30 last:border-0">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate">Remboursement Partiel</span>
                    <span className="text-[10px] text-slate-grey">12 Mars 2024</span>
                  </div>
                  <span className="text-xs font-bold text-status-success">+ 50,000 FCFA</span>
                </div>
              ))}
            </div>

            <button className="text-sm font-bold text-primary hover:underline w-full text-center mt-md">
              Voir tout l'historique de crédit
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
