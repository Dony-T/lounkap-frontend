'use client';

import React, { useEffect, useState } from 'react';
import { X, Search, Link as LinkIcon, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { cn } from '@/presentation/utils/cn';
import { useTontine } from '@/presentation/hooks/useTontine';

interface AddMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess?: () => void;
}

export const AddMemberDrawer = ({ isOpen, onClose, tontineId, onSuccess }: AddMemberDrawerProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [role, setRole] = useState('MEMBER');
  const { addMember, isLoading, error } = useTontine();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIdentifier('');
        setRole('MEMBER');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!identifier) return;

    const success = await addMember(tontineId, {
      emailOrPhone: identifier,
      role: role
    });

    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  if (!isRendered && !isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex justify-end",
      isOpen ? "visible" : "invisible"
    )}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-slate/40 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        "relative w-[500px] bg-white h-full shadow-2xl transition-transform duration-300 flex flex-col z-[101]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex justify-between items-center p-lg border-b border-slate-light/30">
          <h2 className="text-xl font-bold text-slate">Ajouter un membre</h2>
          <button
            onClick={onClose}
            className="p-xs text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl">
          {error && (
            <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-md text-status-error text-sm font-medium">
              {error}
            </div>
          )}

          <p className="text-sm text-slate-grey leading-relaxed">
            Ajoutez un membre directement à cette tontine en utilisant son adresse email ou son numéro de téléphone Lounkap.
          </p>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
              Email ou Téléphone du membre
            </label>
            <div className="relative">
              <Search className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey/50" size={18} />
              <input
                type="text"
                placeholder="nom@email.com ou +237..."
                className="w-full border border-slate-light rounded-2xl pl-[48px] pr-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/30 text-slate"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
              Rôle attribué
            </label>
            <select
              className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate bg-white appearance-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="MEMBER">Membre (Défaut)</option>
              <option value="PRESIDENT">Président</option>
              <option value="TREASURER">Trésorier</option>
              <option value="SECRETARY">Secrétaire</option>
            </select>
          </div>

          {/* Hint Box */}
          <div className="bg-slate-light/10 rounded-2xl p-md flex gap-sm border border-slate-light/20">
            <LinkIcon className="text-[#a68928] shrink-0" size={18} />
            <p className="text-[11px] leading-relaxed text-slate-grey font-medium">
              <span className="font-bold text-slate">Astuce :</span> Vous pouvez aussi simplement partager le code d'invitation de la tontine pour que les membres vous rejoignent d'eux-mêmes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-lg border-t border-slate-light/30">
          <Button
            className="w-full gap-sm py-md shadow-md shadow-primary/20"
            onClick={handleSubmit}
            disabled={isLoading || !identifier}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
            {isLoading ? 'Ajout...' : 'Ajouter au cercle'}
          </Button>
        </div>
      </div>
    </div>
  );
};
