import React from 'react';
import { Briefcase, Users, Home } from 'lucide-react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { cn } from '@/presentation/utils/cn';
import Link from 'next/link';

import { TontineType, TontineRole } from '@/core/domain/entities/Tontine';

interface TontineCardProps {
  id: string;
  type: TontineType;
  title: string;
  description: string;
  contribution: string;
  frequency: string;
  members: { current: number; total: number };
  role: TontineRole;
  code: string;
}

const icons: Record<TontineType, { icon: any, bg: string, color: string }> = {
  business: { icon: Briefcase, bg: 'bg-primary/10', color: 'text-primary' },
  family: { icon: Users, bg: 'bg-secondary/10', color: 'text-secondary' },
  realestate: { icon: Home, bg: 'bg-status-error/10', color: 'text-status-error' },
  other: { icon: Briefcase, bg: 'bg-slate-light', color: 'text-slate-grey' },
};

export const TontineCard = (props: any) => {
  // Defensive mapping to handle various backend response formats
  const {
    id,
    type = 'other',
    name,
    title,
    description,
    contribution,
    amount,
    frequency,
    members,
    maxMembers,
    currentMembers,
    role = 'MEMBER',
    code,
    inviteCode
  } = props;

  const displayTitle = name || title || "Sans titre";
  const displayAmount = Number(amount || contribution) || 0;
  const displayCode = inviteCode || code || "N/A";

  // Calculate members count based on common backend field names
  const totalCount = Number(maxMembers || (members as any)?.total) || 10;
  const currentCount = Number(currentMembers || (members as any)?.current) || 1;

  const config = icons[type as TontineType] || icons.other;
  const progress = totalCount > 0 ? (currentCount / totalCount) * 100 : 0;

  const getFrequencyLabel = (freq: string) => {
    const f = freq?.toString().trim().toUpperCase();
    if (f === 'WEEKLY') return 'Hebdomadaire';
    if (f === 'MONTHLY') return 'Mensuelle';
    return freq || 'N/A';
  };

  return (
    <Link href={`/tontines/${id}`} className="block">
      <Card className="hover:scale-[1.02] transition-transform duration-300 cursor-pointer active:scale-100 group">
        <CardContent className="flex flex-col gap-lg relative">
          <div className="flex justify-between items-start">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary/20", config.bg, config.color)}>
              <config.icon size={24} />
            </div>
            <span className="badge-success">Active</span>
          </div>

          <div className="flex flex-col gap-xs">
            <h3 className="text-2xl font-bold text-slate tracking-tight group-hover:text-primary transition-colors">{displayTitle}</h3>
            <p className="text-body-sm text-slate-grey line-clamp-2 leading-relaxed">{description}</p>
          </div>

          <div className="flex flex-col gap-sm pt-md border-t border-slate-light/50">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-grey font-medium">Cotisation</span>
              <span className="text-lg font-bold mono text-primary tracking-tight">
                {typeof displayAmount === 'number' ? displayAmount.toLocaleString() : (Number(displayAmount) || 0).toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-grey font-medium">Fréquence</span>
              <span className="text-sm font-bold text-slate">{getFrequencyLabel(frequency)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-grey font-medium">Membres</span>
                <span className="font-bold text-slate">{currentCount}/{totalCount}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-light rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-500", role === 'PRESIDENT' || role === 'ADMIN' ? "bg-primary" : "bg-slate-grey")}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-md border-t border-slate-light/50">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-grey font-bold">Rôle</span>
              <span className={cn(
                "badge text-[10px]",
                (role === 'PRESIDENT' || role === 'ADMIN') ? "bg-secondary/10 text-secondary" : "bg-slate-light/50 text-slate-grey"
              )}>
                {role}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-grey font-bold">Code</span>
              <span className="text-xs font-bold mono text-secondary">{displayCode}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

