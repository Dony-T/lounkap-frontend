'use client';

import React from 'react';
import { Users, TrendingUp, Shield, Coins } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Side: Branding and Info */}
      <div className="hidden lg:flex w-1/2 bg-[#0F2747] text-white p-lg flex-col justify-between relative">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[200px] h-[200px] bg-secondary/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center h-full gap-md">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-[#0F2747] shadow-lg">
              <span className="font-bold text-base">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight leading-none">LounKap</span>
              <span className="text-[8px] text-white/60 font-medium uppercase tracking-widest mt-1">Épargne collective & tontines</span>
            </div>
          </div>

          <div className="max-w-md mt-sm">
            <h1 className="text-3xl font-bold leading-tight mb-sm">
              Epargnez ensemble, <br />
              <span className="text-primary font-bold">progressez ensemble</span>
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mb-md">
              Rejoignez la premiere plateforme de tontines digitales. Simple, securisee, accessible a tous.
            </p>

            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-sm group">
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Tontines collaboratives</h4>
                  <p className="text-[10px] text-white/40">Atteignez vos objectifs plus rapidement</p>
                </div>
              </div>

              <div className="flex items-center gap-sm group">
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Transparence totale</h4>
                  <p className="text-[10px] text-white/40">Suivez chaque transaction en temps reel</p>
                </div>
              </div>

              <div className="flex items-center gap-sm group">
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Securite garantie</h4>
                  <p className="text-[10px] text-white/40">Fonds proteges par un systeme securise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-[10px] mt-auto">
          © 2024 LounKap. Tous droits réservés.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-md bg-[#F8FAFC] overflow-y-auto">
        <div className="w-full max-w-[480px] animate-fade-in py-md">
          {children}
        </div>
      </div>
    </div>
  );
};
