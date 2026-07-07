import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Banknote, Calendar, Wallet, Users } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface StatCardsProps {
  amount: number | string;
  frequency: string;
  maxMembers: number;
  currentMembers?: number;
}

export const StatCards = ({ amount, frequency, maxMembers, currentMembers = 1 }: StatCardsProps) => {
  const getFrequencyLabel = (freq: string) => {
    const f = freq?.toString().trim().toUpperCase();
    if (f === 'WEEKLY') return 'Hebdomadaire';
    if (f === 'MONTHLY') return 'Mensuelle';
    return freq || 'N/A';
  };

  const contributionAmount = Number(amount) || 0;
  const totalMaxMembers = Number(maxMembers) || 0;

  const stats = [
    {
      label: 'Cotisation',
      value: `${contributionAmount.toLocaleString()} FCFA`,
      icon: Banknote
    },
    {
      label: 'Fréquence',
      value: getFrequencyLabel(frequency),
      icon: Calendar
    },
    {
      label: 'Cagnotte Totale',
      value: `${(contributionAmount * totalMaxMembers).toLocaleString()} FCFA`,
      icon: Wallet
    },
    {
      label: 'Membres',
      value: `${currentMembers || 1}/${totalMaxMembers || 1} actifs`,
      icon: Users
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
      {stats.map((stat, i) => (
        <Card key={i} padding="md" className="border border-slate-light/30">
          <CardContent className="flex flex-col gap-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-light/10 flex items-center justify-center text-slate-grey">
              <stat.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-grey">{stat.label}</span>
              <span className={cn(
                "text-lg font-bold text-slate mt-1",
                stat.value?.toString().includes('FCFA') && "mono"
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
