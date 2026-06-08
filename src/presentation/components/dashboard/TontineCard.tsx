import React from 'react';
import { Briefcase, Users, Home } from 'lucide-react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { cn } from '@/presentation/utils/cn';

interface TontineCardProps {
  type: 'business' | 'family' | 'realestate';
  title: string;
  description: string;
  contribution: string;
  frequency: string;
  members: { current: number; total: number };
  role: 'PRESIDENT' | 'MEMBER';
  code: string;
}

const icons = {
  business: { icon: Briefcase, bg: 'bg-primary/10', color: 'text-primary' },
  family: { icon: Users, bg: 'bg-secondary/10', color: 'text-secondary' },
  realestate: { icon: Home, bg: 'bg-status-error/10', color: 'text-status-error' },
};

export const TontineCard = ({ type, title, description, contribution, frequency, members, role, code }: TontineCardProps) => {
  const config = icons[type];
  const progress = (members.current / members.total) * 100;

  return (
    <Card className="hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="flex flex-col gap-lg relative">
        <div className="flex justify-between items-start">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", config.bg, config.color)}>
            <config.icon size={24} />
          </div>
          <span className="badge-success">Active</span>
        </div>

        <div className="flex flex-col gap-xs">
          <h3 className="text-2xl font-bold text-slate tracking-tight">{title}</h3>
          <p className="text-body-sm text-slate-grey line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col gap-sm pt-md border-t border-slate-light/50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-grey font-medium">Cotisation</span>
            <span className="text-lg font-bold mono text-primary tracking-tight">{contribution}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-grey font-medium">Fréquence</span>
            <span className="text-sm font-bold text-slate">{frequency}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-grey font-medium">Membres</span>
              <span className="font-bold text-slate">{members.current}/{members.total}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-light rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500", role === 'PRESIDENT' ? "bg-primary" : "bg-slate-grey")}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-md border-t border-slate-light/50">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest text-slate-grey font-bold">Rôle</span>
            <span className={cn(
              "badge text-[9px]",
              role === 'PRESIDENT' ? "bg-secondary/10 text-secondary" : "bg-slate-light/50 text-slate-grey"
            )}>
              {role}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[9px] uppercase tracking-widest text-slate-grey font-bold">Code d'invitation</span>
            <span className="text-xs font-bold mono text-secondary">{code}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
