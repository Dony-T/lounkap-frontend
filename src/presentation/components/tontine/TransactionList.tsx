import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { MoreHorizontal, CheckCircle2 } from 'lucide-react';

const transactions = [
  { name: 'Marc Lukman', date: "Aujourd'hui, 09:41", amount: '100,000', seed: 'Marc' },
  { name: 'Sarah Kouam', date: 'Hier, 18:15', amount: '100,000', seed: 'Sarah' },
  { name: 'David Olinga', date: '25 Mars, 10:02', amount: '100,000', seed: 'David' },
  { name: 'Alice Mbia', date: '24 Mars, 14:30', amount: '100,000', seed: 'Alice' },
];

export const TransactionList = () => {
  return (
    <Card className="w-full lg:w-96 border border-slate-light/30">
      <CardContent className="flex flex-col gap-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate">Dernières transactions</h3>
          <button className="text-slate-grey hover:text-slate">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-md">
          {transactions.map((tx, i) => (
            <div key={i} className="flex justify-between items-center group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-slate-light overflow-hidden group-hover:scale-110 transition-transform">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tx.seed}`} alt={tx.name} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate">{tx.name}</span>
                  <span className="text-[10px] text-slate-grey font-medium">{tx.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold mono text-slate">{tx.amount}</span>
                <CheckCircle2 size={14} className="text-status-success" />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-md text-sm font-bold text-primary hover:text-primary-hover transition-colors py-sm border-t border-slate-light/50">
          Voir tout l'historique
        </button>
      </CardContent>
    </Card>
  );
};
