import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { MoreHorizontal, CheckCircle2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionListProps {
  transactions: any[];
}

export const TransactionList = ({ transactions = [] }: TransactionListProps) => {
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
          {transactions.slice(0, 5).map((tx, i) => (
            <div key={tx.id || i} className="flex justify-between items-center group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-slate-light overflow-hidden group-hover:scale-110 transition-transform flex items-center justify-center">
                  {tx.member?.avatarUrl ? (
                    <img src={tx.member.avatarUrl} alt={tx.member.name} />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {tx.type === 'DEBIT' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate">{tx.member?.name || tx.description || 'Transaction'}</span>
                  <span className="text-[10px] text-slate-grey font-medium">
                    {new Date(tx.createdAt || tx.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold mono text-slate">
                  {Number(tx.amount).toLocaleString()}
                </span>
                <CheckCircle2 size={14} className={tx.status === 'COMPLETED' ? "text-status-success" : "text-slate-grey"} />
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="py-xl text-center">
              <p className="text-xs text-slate-grey italic">Aucune transaction récente</p>
            </div>
          )}
        </div>

        <button className="mt-md text-sm font-bold text-primary hover:text-primary-hover transition-colors py-sm border-t border-slate-light/50">
          Voir tout l'historique
        </button>
      </CardContent>
    </Card>
  );
};
