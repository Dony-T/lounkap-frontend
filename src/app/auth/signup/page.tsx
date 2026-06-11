'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, Eye, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/presentation/components/layout/AuthLayout';
import { Button } from '@/presentation/components/ui/Button';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function SignupPage() {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("--- Tentative d'Inscription ---");
    console.log("Données transmises:", formData);

    if (formData.password !== formData.confirmPassword) {
      console.log("ERREUR: Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const result = await register(formData);
      if (result) {
        console.log("Inscription RÉUSSIE:", result);
        window.location.href = "/";
      } else {
        console.log("Inscription ÉCHOUÉE (Vérifiez les données)");
      }
    } catch (err) {
      console.error("ERREUR CRITIQUE lors de l'inscription:", err);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-md">
        <div className="text-center flex flex-col gap-sm">
          <h2 className="text-3xl font-bold text-[#0F2747]">Creer mon compte</h2>
          <p className="text-sm text-slate-grey">Rejoignez la communaute LounKap</p>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error/20 text-status-error text-xs p-md rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-md mt-md">
          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Nom complet</label>
            <div className="relative">
              <User className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/40" size={18} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Jean Dupont"
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Adresse email</label>
            <div className="relative">
              <Mail className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/40" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="votre@email.com"
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Numero de telephone</label>
            <div className="relative">
              <Phone className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/40" size={18} />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+225 07 XX XX XX XX"
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Choisissez un mot de passe"
                className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey/40"
              >
                <Eye size={18} className={showPassword ? "text-primary" : ""} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-bold text-[#0F2747] ml-1 uppercase tracking-wider text-[10px]">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Repetez le mot de passe"
                className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey/40"
              >
                <Eye size={18} className={showConfirmPassword ? "text-primary" : ""} />
              </button>
            </div>
          </div>

          <div className="px-1 py-2">
            <label className="flex items-start gap-sm cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-light text-primary focus:ring-primary" required />
              <span className="text-xs text-slate-grey leading-relaxed">
                J'accepte les <Link href="#" className="text-primary font-bold hover:underline">conditions d'utilisation</Link> et la <Link href="#" className="text-primary font-bold hover:underline">politique de confidentialité</Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full py-md text-base shadow-lg shadow-primary/20 mt-md"
            disabled={isLoading}
          >
            {isLoading ? "Création en cours..." : "Creer mon compte"}
          </Button>

          <p className="text-center text-sm text-slate-grey mt-md">
            Déjà membre ?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline transition-all">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

          <div className="px-1 py-2">
            <label className="flex items-start gap-sm cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-light text-primary focus:ring-primary" />
              <span className="text-xs text-slate-grey leading-relaxed">
                J'accepte les <Link href="#" className="text-primary font-bold hover:underline">conditions d'utilisation</Link> et la <Link href="#" className="text-primary font-bold hover:underline">politique de confidentialité</Link>
              </span>
            </label>
          </div>

          <Button className="w-full py-md text-base shadow-lg shadow-primary/20 mt-md">
            Creer mon compte
          </Button>

          <p className="text-center text-sm text-slate-grey mt-md">
            Déjà membre ?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline transition-all">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
