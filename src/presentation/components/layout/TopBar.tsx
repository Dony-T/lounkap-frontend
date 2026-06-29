'use client';

import React, { useEffect, useState } from 'react';
import { Bell, User, Search, Copy, Plus, UserPlus } from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useTontineContext } from '@/presentation/context/TontineContext';
import { Button } from '@/presentation/components/ui/Button';

export const TopBar = () => {
  const { user, getProfile } = useAuth();
  const { currentTontine } = useTontineContext();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [getProfile, user]);

  return (
    <header className="flex flex-col border-b border-slate-light bg-white sticky top-0 z-30">
      <div className="flex justify-between items-center py-sm px-xxl gap-lg min-h-[72px]">
        <div className="flex-1 flex items-center gap-xl">
          {/* Tontine Identity on the LEFT */}
          {currentTontine && (
            <div className="flex items-center gap-md animate-in fade-in slide-in-from-left-4 duration-500 min-w-max">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate leading-tight tracking-tight">{currentTontine.name || (currentTontine as any).title}</h2>
                <div className="flex items-center gap-sm mt-0.5">
                  <span className="badge-success h-4 px-1.5 text-[9px] font-bold">{currentTontine.status || 'Active'}</span>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-grey mono">
                    <span className="uppercase tracking-wider">CODE: {currentTontine.inviteCode || (currentTontine as any).code}</span>
                    <button className="hover:text-primary transition-colors">
                      <Copy size={10} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-light/50 ml-md" />
            </div>
          )}

          {/* Expanded Search Bar */}
          <div className="relative w-full max-w-2xl group flex-1">
            <Search className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Rechercher une tontine, un membre ou une transaction..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-xxl pr-md py-sm bg-slate-light/30 border border-transparent rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:shadow-lg focus:shadow-primary/5 transition-all h-11 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-lg ml-xl">
          <button className="relative p-sm text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-xl transition-all">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-status-error rounded-full border-2 border-white" />
          </button>

          <div className="flex items-center gap-md">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate leading-none">
                {user?.fullName || user?.name || 'Utilisateur'}
              </span>
              <span className="text-[10px] text-slate-grey mt-[2px]">
                {user?.email || 'email@example.com'}
              </span>
            </div>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/20 cursor-pointer hover:scale-105 transition-transform overflow-hidden">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
