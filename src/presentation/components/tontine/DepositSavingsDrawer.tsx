import React, { useState } from 'react';
import { useFinancials } from '@/presentation/hooks/useFinancials';
import { Button } from '@/presentation/components/ui/Button';
import { X, Wallet, Loader2, Coins } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface DepositSavingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess: () => void;
}

export const DepositSavingsDrawer = ({ isOpen, onClose, tontineId, onSuccess }: DepositSavingsDrawerProps) => {
  const { depositSavings, isLoading, error } = useFinancials();
  const [formData, setFormData] = useState({
    amount: '',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;

    const success = await depositSavings(tontineId, {
      amount: Number(formData.amount),
      note: formData.note || 'Dépôt d\'épargne',
    });

    if (success) {
      onSuccess();
      onClose();
      setFormData({ amount: '', note: '' });
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-slate/20 backdrop-blur-sm z-[998] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-[450px] bg-white shadow-2xl z-[999] transition-transform duration-500 ease-in-out p-xl flex flex-col gap-xl border-l border-slate-light",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate tracking-tight">Déposer de l'épargne</h2>
            <p className="text-xs text-slate-grey mt-0.5">Ajoutez des fonds à votre compte d'épargne personnel.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-light/50 flex items-center justify-center text-slate hover:bg-slate-light transition-colors">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-md text-sm font-bold text-status-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <Coins size={12} className="text-slate-grey" />
              Montant du dépôt (FCFA)
            </label>
            <input
              type="number"
              required
              placeholder="Ex: 50000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <X size={12} className="text-slate-grey invisible" />
              Note / Commentaire
            </label>
            <textarea
              placeholder="Ex: Épargne pour projet construction"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-medium text-slate focus:outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-none"
            />
          </div>

          <div className="mt-auto flex gap-md">
            <Button type="button" variant="secondary" className="flex-1 h-12 rounded-2xl" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || !formData.amount} className="flex-1 h-12 rounded-2xl gap-sm">
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              Confirmer le dépôt
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
