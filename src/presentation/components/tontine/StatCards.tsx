import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Banknote, Calendar, Wallet, Users } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

const stats = [
  { label: 'Cotisation', value: '100,000 FCFA', icon: Banknote },
  { label: 'Fréquence', value: 'Mensuelle', icon: Calendar },
  { label: 'Cagnotte Totale', value: '1,500,000 FCFA', icon: Wallet },
  { label: 'Membres', value: '15/30 actifs', icon: Users },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
      {stats.map((stat, i) => (
        <Card key={i} padding="md" className="border border-slate-light/30">
          <CardContent className="flex flex-col gap-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-light/10 flex items-center justify-center text-slate-grey">
              <stat.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">{stat.label}</span>
              <span className={cn(
                "text-lg font-bold text-slate mt-1",
                stat.value.includes('FCFA') && "mono"
              )}>
                {stat.value}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
