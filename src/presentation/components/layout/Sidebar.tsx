'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Coins,
  RefreshCw,
  Wallet,
  TrendingUp,
  ArrowLeft,
  CreditCard,
  HandCoins
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

const defaultNavItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', id: 'dashboard', href: '/' },
  { icon: Settings, label: 'Paramètres', id: 'settings', href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const tontineId = params?.id as string;
  const activeTab = searchParams.get('tab') || 'Aperçu';

  // Determine if we are in a tontine detail view
  const isTontineDetail = !!(tontineId && pathname.includes(`/tontines/${tontineId}`));

  const tontineNavItems = [
    { icon: LayoutDashboard, label: 'Aperçu', id: 'apercu', tab: 'Aperçu', href: `/tontines/${tontineId}` },
    { icon: Users, label: 'Membres', id: 'membres', tab: 'Membres', href: `/tontines/${tontineId}?tab=Membres` },
    { icon: RefreshCw, label: 'Cycles', id: 'cycles', tab: 'Cycles', href: `/tontines/${tontineId}?tab=Cycles` },
    { icon: Wallet, label: 'Paiements', id: 'paiements', tab: 'Paiements', href: `/tontines/${tontineId}?tab=Paiements` },
    { icon: TrendingUp, label: 'Payouts', id: 'payouts', tab: 'Payouts', href: `/tontines/${tontineId}?tab=Payouts` },
    { icon: CreditCard, label: 'Épargne', id: 'epargne', tab: 'Epargne', href: `/tontines/${tontineId}?tab=Epargne` },
    { icon: HandCoins, label: 'Prêts', id: 'prets', tab: 'Prets', href: `/tontines/${tontineId}?tab=Prets` },
  ];

  const currentNavItems = isTontineDetail ? tontineNavItems : defaultNavItems;

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-light flex flex-col p-md fixed left-0 top-0 z-40">
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
        {isTontineDetail && (
          <Link
            href="/"
            className="flex items-center gap-md px-md py-sm rounded-2xl transition-all font-medium text-sm text-slate-grey hover:bg-slate-light/10 hover:text-slate mb-md"
          >
            <ArrowLeft size={20} />
            Retour
          </Link>
        )}

        {currentNavItems.map((item: any) => {
          const isActive = isTontineDetail
            ? activeTab === item.tab
            : pathname === item.href;

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
        <button
          onClick={() => {
            document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.location.href = "/auth/login";
          }}
          className="flex items-center gap-md px-md py-sm rounded-2xl text-slate-grey hover:text-status-error transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
