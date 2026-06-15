'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Coins
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', id: 'dashboard', href: '/' },
  { icon: Settings, label: 'Paramètres', id: 'settings', href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

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
        <button
          onClick={() => {
            // Simulate logout by removing the cookie
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
