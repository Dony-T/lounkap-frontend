'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { AuthLayout } from '@/presentation/components/layout/AuthLayout';
import { Button } from '@/presentation/components/ui/Button';

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="bg-white rounded-[32px] p-xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-lg">
        <div className="text-center flex flex-col gap-sm">
          <h2 className="text-3xl font-bold text-[#0F2747]">Réinitialisation</h2>
          <p className="text-sm text-slate-grey">Saisissez votre email pour réinitialiser votre mot de passe</p>
        </div>

        <div className="flex flex-col gap-xl mt-md">
          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Votre Adresse Email</label>
            <div className="relative">
              <Mail className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/40" size={18} />
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
              />
            </div>
          </div>

          <Button className="w-full py-md text-base shadow-lg shadow-primary/20 flex gap-md items-center justify-center">
            Envoyer le lien
            <Send size={18} />
          </Button>

          <Link href="/auth/login" className="flex items-center justify-center gap-sm text-sm font-bold text-slate-grey hover:text-primary transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
