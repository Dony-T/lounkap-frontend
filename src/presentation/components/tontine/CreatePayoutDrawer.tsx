import React, { useState, useEffect } from 'react';
import { useTontine } from '@/presentation/hooks/useTontine';
import { useFinancials } from '@/presentation/hooks/useFinancials';
import { Button } from '@/presentation/components/ui/Button';
import { X, ArrowUpRight, Loader2, User, Coins } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface CreatePayoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess: () => void;
}

export const CreatePayoutDrawer = ({ isOpen, onClose, tontineId, onSuccess }: CreatePayoutDrawerProps) => {
  const { getMembers } = useTontine();
  const { createPayout, isLoading, error } = useFinancials() as any; // Using financials for payouts
  const [members, setMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    recipientId: '',
    amount: '',
    cycleId: '', // Should be selected from active cycle
  });

  useEffect(() => {
    if (isOpen) {
      const loadMembers = async () => {
        const list = await getMembers(tontineId);
        if (list) setMembers(list);
      };
      loadMembers();
    }
  }, [isOpen, tontineId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientId || !formData.amount) return;

    // Direct repository call via hook logic
    const success = await createPayout(tontineId, {
      recipientId: formData.recipientId,
      amount: Number(formData.amount),
      cycleId: formData.cycleId || undefined
    });

    if (success) {
      onSuccess();
      onClose();
      setFormData({ recipientId: '', amount: '', cycleId: '' });
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
            <h2 className="text-xl font-bold text-slate tracking-tight">Effectuer un versement</h2>
            <p className="text-xs text-slate-grey mt-0.5">Attribuez la cagnotte collectée au bénéficiaire du tour.</p>
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
              <User size={12} className="text-slate-grey" />
              Choisir le bénéficiaire
            </label>
            <select
              required
              value={formData.recipientId}
              onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12 appearance-none"
            >
              <option value="">Sélectionner un membre...</option>
              {members.map(m => (
                <option key={m.id} value={m.user?.id}>{m.user?.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <Coins size={12} className="text-slate-grey" />
              Montant à verser (FCFA)
            </label>
            <input
              type="number"
              required
              placeholder="Ex: 500000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
            />
          </div>

          <div className="mt-auto flex gap-md">
            <Button type="button" variant="secondary" className="flex-1 h-12 rounded-2xl" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || !formData.recipientId || !formData.amount} className="flex-1 h-12 rounded-2xl gap-sm">
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              Confirmer le versement
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
