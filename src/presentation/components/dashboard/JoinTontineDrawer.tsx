'use client';

import React, { useEffect, useState } from 'react';
import { X, Users, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { cn } from '@/presentation/utils/cn';
import { useTontine } from '@/presentation/hooks/useTontine';

interface JoinTontineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const JoinTontineDrawer = ({ isOpen, onClose, onSuccess }: JoinTontineDrawerProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [code, setCode] = useState('');
  const { joinTontine, isLoading, error } = useTontine();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsRendered(false);
        setCode('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!code) return;
    const result = await joinTontine(code);
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
          <h2 className="text-xl font-bold text-slate">Rejoindre une tontine</h2>
          <button
            onClick={onClose}
            className="p-xs text-slate-grey hover:text-slate hover:bg-slate-light/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-lg flex flex-col items-center gap-xl">
          {error && (
            <div className="w-full bg-status-error/10 border border-status-error/20 rounded-2xl p-md text-status-error text-sm font-medium">
              {error}
            </div>
          )}

          {/* Icon Circle */}
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mt-xl">
            <Users size={40} strokeWidth={1.5} />
          </div>

          <div className="text-center flex flex-col gap-sm max-w-[280px]">
            <p className="text-sm text-slate-grey leading-relaxed">
              Entrez le code d'invitation unique fourni par le président du cercle pour intégrer la tontine.
            </p>
          </div>

          <div className="w-full mt-lg">
            <Input
              label="Code d'invitation"
              placeholder="LNK-000-000"
              className="text-center font-mono tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* Placeholder for the abstract image at the bottom of content if needed */}
          <div className="mt-auto opacity-10 pointer-events-none">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 150C50 120 150 180 200 120V0H0V150Z" fill="url(#paint0_linear)"/>
                <defs>
                    <linearGradient id="paint0_linear" x1="100" y1="0" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#64748B"/>
                        <stop offset="1" stopColor="#64748B" stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="p-lg border-t border-slate-light/30">
          <Button
            className="w-full gap-sm py-md shadow-md shadow-primary/20"
            onClick={handleSubmit}
            disabled={isLoading || !code}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Rejoindre le cercle'}
            {!isLoading && <ArrowRight size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};
