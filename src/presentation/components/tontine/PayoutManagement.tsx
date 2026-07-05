import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Search,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

export const PayoutManagement = () => {
  // Mock data for payouts
  const payouts = [
    {
      id: '1',
      beneficiary: { name: 'Amina Kouamé', avatar: 'AK' },
      cycle: 'Janv - Juin 2024',
      amount: 500000,
      date: '-',
      status: 'EN ATTENTE',
    },
    {
      id: '2',
      beneficiary: { name: 'Jean Dupont', avatar: 'JD' },
      cycle: 'Janv - Juin 2024',
      amount: 500000,
      date: '15 Fév 2024',
      status: 'PAYÉ',
    },
    {
      id: '3',
      beneficiary: { name: 'Marc Penda', avatar: 'MP' },
      cycle: 'Juil - Déc 2023',
      amount: 450000,
      date: '10 Déc 2023',
      status: 'PAYÉ',
    }
  ];

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">TOTAL VERSÉ (HISTORIQUE)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-success">15,000,000</span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">EN ATTENTE DE VERSEMENT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-warning">500,000</span>
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
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Cycle / Tour</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Montant</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Date</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-slate-light/5 transition-colors group">
                  <td className="px-lg py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-slate-light flex items-center justify-center font-bold text-xs text-slate-grey">
                        {payout.beneficiary.avatar}
                      </div>
                      <span className="text-sm font-bold text-slate">{payout.beneficiary.name}</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-medium text-slate-grey">{payout.cycle}</span>
                  </td>
                  <td className="px-lg py-lg">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate">{payout.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-medium text-slate-grey">FCFA</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-medium text-slate-grey">{payout.date}</span>
                  </td>
                  <td className="px-lg py-lg text-center">
                    <Badge
                      className={cn(
                        "border-none text-[10px] font-bold px-3 py-1",
                        payout.status === 'PAYÉ' ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                      )}
                    >
                      {payout.status}
                    </Badge>
                  </td>
                  <td className="px-lg py-lg text-right">
                    {payout.status === 'EN ATTENTE' ? (
                      <Button className="bg-status-success hover:bg-status-success/90 text-white border-none text-[11px] font-bold h-9 px-4 rounded-xl">
                        Marquer Payé
                      </Button>
                    ) : (
                      <button className="p-sm text-slate-grey hover:text-slate transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-lg py-md border-t border-slate-light/30 flex items-center justify-between">
          <p className="text-xs text-slate-grey">
            Affichage de <span className="font-bold text-slate">1 à 3</span> sur <span className="font-bold text-slate">24</span> payouts
          </p>
          <div className="flex items-center gap-sm">
            <button className="p-xs rounded-lg border border-slate-light text-slate-grey hover:bg-slate-light transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-xs rounded-lg border border-slate-light text-slate-grey hover:bg-slate-light transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
