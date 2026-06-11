'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/presentation/components/layout/AuthLayout';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result) {
      window.location.href = "/";
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-lg">
        <div className="text-center flex flex-col gap-sm">
          <h2 className="text-3xl font-bold text-[#0F2747]">Connexion</h2>
          <p className="text-sm text-slate-grey">Accédez à votre compte LounKap</p>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error/20 text-status-error text-xs p-md rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-xl mt-md">
          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1">Email ou Téléphone</label>
            <div className="relative">
              <Mail className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/40" size={18} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com ou +225 XX XX XX XX"
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey/40 hover:text-slate transition-colors"
              >
                <Eye size={18} className={showPassword ? "text-primary" : ""} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-sm cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-light text-primary focus:ring-primary" />
              <span className="text-sm text-slate-grey group-hover:text-slate transition-colors">Se souvenir de moi</span>
            </label>
            <Link href="/auth/reset-password" title="Mot de passe oublié ?" className="text-sm font-bold text-primary hover:underline transition-all">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-md text-base shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>

          <div className="relative flex items-center justify-center py-md">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-light/50"></div>
            </div>
            <span className="relative px-md bg-white text-xs text-slate-grey uppercase tracking-widest font-medium">ou</span>
          </div>

          <p className="text-center text-sm text-slate-grey">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-primary font-bold hover:underline transition-all">
              Créer un compte
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
