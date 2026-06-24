import React from 'react';
import { ChevronLeft, Copy, UserPlus } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { cn } from '@/presentation/utils/cn';

import Link from 'next/link';

interface DetailHeaderProps {
  title: string;
  code: string;
  onAddMember?: () => void;
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = ['Aperçu', 'Membres', 'Cycles', 'Paiements', 'Payouts'];

export const DetailHeader = ({ title, code, onAddMember, selectedTab, onTabChange }: DetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-sm border-b border-slate-light bg-background sticky top-0 z-20 pt-lg">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-xs px-base text-[10px] font-medium text-slate-grey">
        <Link href="/" className="hover:text-primary transition-colors">Tontines</Link>
        <ChevronRight size={10} />
        <span>Détails de la Tontine</span>
        <ChevronRight size={10} />
        <span className="text-status-warning font-bold">{selectedTab}</span>
      </div>

      <div className="flex justify-between items-center px-base pb-md">
        <div className="flex items-center gap-md">
          <div className="flex flex-col gap-0">
            <h1 className="text-3xl font-bold text-slate tracking-tight">{title}</h1>
            <div className="flex items-center gap-sm mt-1">
              <span className="badge-success h-5 px-2 text-[10px]">Active</span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-grey mono">
                <span className="uppercase tracking-wider">CODE: {code}</span>
                <button className="hover:text-primary transition-colors">
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <Button variant="secondary" className="gap-sm h-10 border-slate-light text-slate" onClick={onAddMember}>
            <UserPlus size={18} />
            Ajouter un membre
          </Button>
          <Button className="gap-sm h-10 bg-status-warning hover:bg-status-warning/90 border-none text-slate-dark">
            <Plus size={18} />
            Action
          </Button>
        </div>
      </div>

      <nav className="flex gap-xl px-base overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            className={cn(
              "pb-md text-sm font-semibold transition-all relative whitespace-nowrap",
              selectedTab === tab
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
