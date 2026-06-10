'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Wallet,
  HelpCircle,
  LogOut,
  UserPlus,
  Coins
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', id: 'dashboard', href: '/' },
  { icon: Coins, label: 'Mes Tontines', id: 'tontines', href: '/tontines' },
  { icon: Users, label: 'Membres', id: 'members', href: '/members' },
  { icon: Wallet, label: 'Transactions', id: 'transactions', href: '/transactions' },
  { icon: HelpCircle, label: 'Aide', id: 'help', href: '/help' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-light flex flex-col p-md fixed left-0 top-0">
      <div className="flex items-center gap-sm mb-xxl px-sm">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Coins size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate tracking-tight">LounKap</span>
          <span className="text-[10px] text-slate-grey font-medium uppercase tracking-widest">Épargne Collective</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-md px-md py-sm rounded-2xl transition-all font-medium text-sm",
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-slate-grey hover:bg-slate-light/10 hover:text-slate"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-md">
        <div className="bg-background rounded-3xl p-md flex flex-col gap-sm border border-slate-light/50">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserPlus size={16} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-slate">Inviter un membre</p>
            <p className="text-[10px] text-slate-grey">Gagnez des bonus d'épargne.</p>
          </div>
        </div>

        <button className="flex items-center gap-md px-md py-sm rounded-2xl text-slate-grey hover:text-status-error transition-colors text-sm font-medium">
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
