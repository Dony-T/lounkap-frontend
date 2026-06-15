import React from 'react';
import { ChevronLeft, Copy, UserPlus } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { cn } from '@/presentation/utils/cn';

import Link from 'next/link';

interface DetailHeaderProps {
  title: string;
  code: string;
}

const tabs = ['Aperçu', 'Membres', 'Cycles', 'Paiements', 'Payouts'];

export const DetailHeader = ({ title, code }: DetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-lg border-b border-slate-light bg-background sticky top-0 z-20 pt-xxl">
      <div className="flex justify-between items-center px-base">
        <div className="flex items-center gap-md">
          <Link href="/" className="w-10 h-10 rounded-xl bg-white border border-slate-light flex items-center justify-center text-slate hover:bg-slate-light/10 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-sm">
            <h1 className="text-3xl font-bold text-slate tracking-tight">{title}</h1>
            <span className="badge-success">Active</span>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div className="bg-white border border-slate-light rounded-xl px-md py-sm flex items-center gap-sm">
            <span className="text-xs font-bold mono text-slate-grey uppercase tracking-wider">{code}</span>
            <button className="text-slate-grey hover:text-primary transition-colors">
              <Copy size={16} />
            </button>
          </div>
          <Button className="gap-sm">
            <UserPlus size={18} />
            Ajouter un membre
          </Button>
        </div>
      </div>

      <nav className="flex gap-xl px-base">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "pb-md text-sm font-semibold transition-all relative",
              i === 0
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary after:rounded-t-full"
                : "text-slate-grey hover:text-slate"
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};
