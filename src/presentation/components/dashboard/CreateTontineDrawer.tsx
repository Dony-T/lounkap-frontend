'use client';

import React, { useEffect, useState } from 'react';
import { X, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { cn } from '@/presentation/utils/cn';

interface CreateTontineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTontineDrawer = ({ isOpen, onClose }: CreateTontineDrawerProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        "relative w-full max-w-xl bg-white h-full shadow-2xl transition-transform duration-300 flex flex-col z-[101]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex justify-between items-center p-lg border-b border-slate-light/30">
          <h2 className="text-xl font-bold text-slate">Créer une tontine</h2>
          <button
            onClick={onClose}
            className="p-xs text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl">
          <Input
            label="Nom de la tontine"
            placeholder="Ex: Famille & Amis 2024"
          />

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
              Description
            </label>
            <textarea
              placeholder="Quels sont les objectifs de cette épargne collective ?"
              className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/50 text-slate min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                Montant
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="50000"
                  className="w-full border border-slate-light rounded-2xl pl-md pr-14 py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/50 text-slate"
                />
                <span className="absolute right-md top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-grey uppercase tracking-widest">
                  FCFA
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                Fréquence
              </label>
              <select className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate bg-white appearance-none cursor-pointer">
                <option>Hebdomadaire</option>
                <option>Mensuelle</option>
                <option>Trimestrielle</option>
              </select>
            </div>
          </div>

          <Input
            label="Nombre maximum de membres"
            placeholder="10"
            type="number"
          />

          {/* Info Box */}
          <div className="bg-[#e7f0ff] rounded-2xl p-md flex gap-sm border border-blue-100">
            <Info className="text-secondary shrink-0" size={18} />
            <p className="text-[11px] leading-relaxed text-secondary font-medium">
              <span className="font-bold">Attention :</span> Une fois le premier cycle démarré, le montant et la fréquence ne pourront plus être modifiés.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-lg border-t border-slate-light/30">
          <Button className="w-full gap-sm py-md shadow-md shadow-primary/20">
            <CheckCircle2 size={18} />
            Valider la création
          </Button>
        </div>
      </div>
    </div>
  );
};
