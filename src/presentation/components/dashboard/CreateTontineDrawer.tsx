'use client';

import React, { useEffect, useState } from 'react';
import { X, Info, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { cn } from '@/presentation/utils/cn';
import { useTontine } from '@/presentation/hooks/useTontine';

interface CreateTontineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateTontineDrawer = ({ isOpen, onClose, onSuccess }: CreateTontineDrawerProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const { createTontine, isLoading, error } = useTontine();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contribution: '',
    frequency: 'Mensuelle',
    maxMembers: '10',
  });

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsRendered(false);
        setFormData({
          title: '',
          description: '',
          contribution: '',
          frequency: 'Mensuelle',
          maxMembers: '10',
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.contribution) return;

    const result = await createTontine({
      title: formData.title,
      description: formData.description,
      contribution: Number(formData.contribution),
      frequency: formData.frequency,
      maxMembers: Number(formData.maxMembers),
    });

    if (result) {
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
          {error && (
            <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-md text-status-error text-sm font-medium">
              {error}
            </div>
          )}

          <Input
            label="Nom de la tontine"
            placeholder="Ex: Famille & Amis 2024"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
              Description
            </label>
            <textarea
              placeholder="Quels sont les objectifs de cette épargne collective ?"
              className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/50 text-slate min-h-[100px] resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                Montant
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full border border-slate-light rounded-2xl pl-md pr-14 py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-grey/50 text-slate"
                  value={formData.contribution}
                  onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
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
              <select
                className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate bg-white appearance-none cursor-pointer"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              >
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Mensuelle">Mensuelle</option>
                <option value="Trimestrielle">Trimestrielle</option>
              </select>
            </div>
          </div>

          <Input
            label="Nombre maximum de membres"
            placeholder="10"
            type="number"
            value={formData.maxMembers}
            onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
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
          <Button
            className="w-full gap-sm py-md shadow-md shadow-primary/20"
            onClick={handleSubmit}
            disabled={isLoading || !formData.title || !formData.contribution}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isLoading ? 'Création...' : 'Valider la création'}
          </Button>
        </div>
      </div>
    </div>
  );
};
