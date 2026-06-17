'use client';

import React, { useEffect } from 'react';
import { Bell, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';

export const TopBar = () => {
  const { user, getProfile, isLoading } = useAuth();

  useEffect(() => {
    // Only fetch if user isn't already loaded in the hook state
    if (!user) {
      getProfile();
    }
  }, [getProfile, user]);

  return (
    <header className="flex justify-end items-center py-md px-xxl gap-lg min-h-[72px]">
      <button className="relative p-sm text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-xl transition-all">
        <Bell size={22} strokeWidth={1.5} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-status-error rounded-full border-2 border-background" />
      </button>

      <div className="flex items-center gap-md">
        {isLoading && !user ? (
          <div className="flex items-center gap-sm">
            <Loader2 className="animate-spin text-slate-grey" size={16} />
            <span className="text-[11px] text-slate-grey italic">Chargement...</span>
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-slate leading-none">
              {user?.fullName || user?.name || 'Utilisateur'}
            </span>
            <span className="text-[11px] text-slate-grey mt-[2px]">
              {user?.email || 'email@example.com'}
            </span>
          </div>
        )}
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/20 cursor-pointer hover:scale-105 transition-transform overflow-hidden">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profil" className="w-full h-full object-cover" />
          ) : (
            <User size={20} />
          )}
        </div>
      </div>
    </header>
  );
};
