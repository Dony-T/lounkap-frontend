import React from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

export const PaymentManagement = () => {
  // Mock data for payments/contributions
  const payments = [
    { id: '1', member: 'Marc Lukman', date: '28 Mars 2024', amount: 100000, type: 'COTISATION', status: 'COMPLETED' },
    { id: '2', member: 'Sarah Kouam', date: '27 Mars 2024', amount: 100000, type: 'COTISATION', status: 'COMPLETED' },
    { id: '3', member: 'David Olinga', date: '25 Mars 2024', amount: 100000, type: 'COTISATION', status: 'COMPLETED' },
    { id: '4', member: 'Alice Mbia', date: '24 Mars 2024', amount: 100000, type: 'COTISATION', status: 'COMPLETED' },
    { id: '5', member: 'Jean Dupont', date: '20 Mars 2024', amount: 100000, type: 'COTISATION', status: 'COMPLETED' },
  ];

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey" size={18} />
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="w-full pl-xxl pr-md py-sm bg-white border border-slate-light rounded-2xl text-sm focus:outline-none focus:border-primary/50 transition-colors h-11"
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
              <span className="text-2xl font-bold text-slate">2,450,000</span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Cotisations du mois</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">800,000</span>
              <span className="text-xs font-bold text-slate-grey">FCFA</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-light/50 shadow-air">
          <CardContent className="p-xl flex flex-col gap-sm">
            <span className="text-[10px] font-bold text-slate-grey uppercase tracking-widest">Taux de Ponctualité</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-success">98%</span>
              <span className="text-xs font-bold text-slate-grey">en moyenne</span>
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
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-light/5 transition-colors group">
                  <td className="px-lg py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <ArrowDownLeft size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate">{payment.member}</span>
                        <span className="text-[10px] text-slate-grey font-medium tracking-tight">Cotisation mensuelle</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-lg py-lg">
                    <Badge variant="neutral" className="text-[10px] font-bold">{payment.type}</Badge>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-medium text-slate-grey">{payment.date}</span>
                  </td>
                  <td className="px-lg py-lg">
                    <span className="text-sm font-bold text-slate">{payment.amount.toLocaleString()} FCFA</span>
                  </td>
                  <td className="px-lg py-lg text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} className="text-status-success" />
                      <span className="text-[10px] font-bold text-status-success uppercase tracking-widest">TERMINÉ</span>
                    </div>
                  </td>
                  <td className="px-lg py-lg text-right">
                    <button className="p-sm text-slate-grey hover:text-slate transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
