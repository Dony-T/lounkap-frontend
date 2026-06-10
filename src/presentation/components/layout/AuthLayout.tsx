'use client';

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Side: Branding and Info */}
      <div className="hidden lg:flex w-1/2 bg-[#0F2747] text-white p-xxl flex-col justify-start relative">
        <div className="relative z-10 flex flex-col gap-xxl mt-xl">
          <div className="flex items-center gap-sm">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-[#0F2747] shadow-lg">
              <span className="font-bold text-2xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight leading-none">LounKap</span>
              <span className="text-xs text-white/60 font-medium uppercase tracking-widest mt-1">Épargne collective & tontines</span>
            </div>
          </div>

          <div className="max-w-md mt-xxl">
            <h1 className="text-5xl font-bold leading-tight mb-lg">
              Epargnez ensemble, <br />
              <span className="text-primary font-bold">progressez ensemble</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Rejoignez la premiere plateforme de tontines digitales. Simple, securisee, accessible a tous.
            </p>
          </div>
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
