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
      <div className="hidden lg:flex w-1/2 bg-[#0F2747] text-white p-xl flex-col justify-between relative">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-secondary/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center h-full gap-lg">
          <div className="flex items-center gap-sm">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-[#0F2747] shadow-lg">
              <span className="font-bold text-lg">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">LounKap</span>
              <span className="text-[9px] text-white/60 font-medium uppercase tracking-widest leading-none">Épargne collective & tontines</span>
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-md">
              Epargnez ensemble, <br />
              <span className="text-primary font-bold">progressez ensemble</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-lg">
              Rejoignez la premiere plateforme de tontines digitales. Simple, securisee, accessible a tous.
            </p>

            <div className="flex flex-col gap-lg">
              <div className="flex items-center gap-md group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Tontines collaboratives</h4>
                  <p className="text-[11px] text-white/50">Epargnez ensemble, atteignez vos objectifs plus rapidement</p>
                </div>
              </div>

              <div className="flex items-center gap-md group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Transparence totale</h4>
                  <p className="text-[11px] text-white/50">Suivez chaque transaction en temps reel</p>
                </div>
              </div>

              <div className="flex items-center gap-md group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10 shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Securite garantie</h4>
                  <p className="text-[11px] text-white/50">Vos fonds sont proteges par un systeme securise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-xs mt-auto">
          © 2024 LounKap. Tous droits réservés.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-md bg-[#F8FAFC] overflow-y-auto">
        <div className="w-full max-w-[500px] animate-fade-in py-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
