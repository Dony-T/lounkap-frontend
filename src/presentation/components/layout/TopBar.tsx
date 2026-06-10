'use client';

import React from 'react';
import { Bell, User } from 'lucide-react';

export const TopBar = () => {
  // Mock user data
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
  };

  return (
    <header className="flex justify-end items-center py-md px-xxl gap-lg">
      <button className="relative p-sm text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-xl transition-all">
        <Bell size={22} strokeWidth={1.5} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-status-error rounded-full border-2 border-background" />
      </button>

      <div className="flex items-center gap-md">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate leading-none">{user.name}</span>
          <span className="text-[11px] text-slate-grey mt-[2px]">{user.email}</span>
        </div>
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/20 cursor-pointer hover:scale-105 transition-transform">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};
