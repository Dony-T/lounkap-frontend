'use client';

import React from 'react';
import { Users, TrendingUp, Shield, Coins } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Branding and Info */}
      <div className="hidden lg:flex w-1/2 bg-[#0F2747] text-white p-xxl flex-col justify-between relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-sm mb-xxl">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-[#0F2747] shadow-lg">
              <span className="font-bold text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">LounKap</span>
              <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Épargne collective & tontines</span>
            </div>
          </div>

          <div className="mt-xl max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-lg">
              Epargnez ensemble, <br />
              <span className="text-primary font-bold">progressez ensemble</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-xxl">
              Rejoignez la premiere plateforme de tontines digitales. Simple, securisee, accessible a tous.
            </p>

            <div className="flex flex-col gap-xl">
              <div className="flex items-center gap-lg group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Tontines collaboratives</h4>
                  <p className="text-sm text-white/50">Epargnez ensemble, atteignez vos objectifs plus rapidement</p>
                </div>
              </div>

              <div className="flex items-center gap-lg group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Transparence totale</h4>
                  <p className="text-sm text-white/50">Suivez chaque transaction en temps reel</p>
                </div>
              </div>

              <div className="flex items-center gap-lg group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#0F2747] transition-all border border-white/10">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Securite garantie</h4>
                  <p className="text-sm text-white/50">Vos fonds sont proteges par un systeme securise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-sm">
          © 2024 LounKap. Tous droits réservés.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-md bg-[#F8FAFC]">
        <div className="w-full max-w-[500px] animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};
