import React, { useState } from 'react';
import { useFinancials } from '@/presentation/hooks/useFinancials';
import { Button } from '@/presentation/components/ui/Button';
import { X, HandCoins, Loader2, Calendar, Percent } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface RequestLoanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess: () => void;
}

export const RequestLoanDrawer = ({ isOpen, onClose, tontineId, onSuccess }: RequestLoanDrawerProps) => {
  const { requestLoan, isLoading, error } = useFinancials();
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '5',
    durationMonths: '6',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.reason) return;

    const success = await requestLoan(tontineId, {
      amount: Number(formData.amount),
      interestRate: Number(formData.interestRate),
      durationMonths: Number(formData.durationMonths),
      reason: formData.reason,
    });

    if (success) {
      onSuccess();
      onClose();
      setFormData({ amount: '', interestRate: '5', durationMonths: '6', reason: '' });
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
            <h2 className="text-xl font-bold text-slate tracking-tight">Demander un prêt</h2>
            <p className="text-xs text-slate-grey mt-0.5">Soumettez votre dossier de crédit pour validation.</p>
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

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-lg overflow-y-auto no-scrollbar pb-xxl">
          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <HandCoins size={12} className="text-slate-grey" />
              Montant souhaité (FCFA)
            </label>
            <input
              type="number"
              required
              placeholder="Ex: 200000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-sm">
              <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
                <Percent size={12} className="text-slate-grey" />
                Taux d'intérêt (%)
              </label>
              <input
                type="number"
                required
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
              />
            </div>
            <div className="flex flex-col gap-sm">
              <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
                <Calendar size={12} className="text-slate-grey" />
                Durée (Mois)
              </label>
              <input
                type="number"
                required
                value={formData.durationMonths}
                onChange={(e) => setFormData({ ...formData, durationMonths: e.target.value })}
                className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <X size={12} className="text-slate-grey invisible" />
              Motif du prêt
            </label>
            <textarea
              required
              placeholder="Expliquez brièvement le besoin de ce crédit..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-medium text-slate focus:outline-none focus:border-primary/50 transition-colors min-h-[120px] resize-none"
            />
          </div>

          <div className="mt-auto flex gap-md pt-xl bg-white sticky bottom-0">
            <Button type="button" variant="secondary" className="flex-1 h-12 rounded-2xl" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || !formData.amount || !formData.reason} className="flex-1 h-12 rounded-2xl gap-sm">
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              Soumettre
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
