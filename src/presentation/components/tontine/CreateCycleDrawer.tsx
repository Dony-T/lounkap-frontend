import React, { useState, useEffect } from 'react';
import { useTontine } from '@/presentation/hooks/useTontine';
import { Button } from '@/presentation/components/ui/Button';
import { X, Calendar, Loader2, ListOrdered, User } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface CreateCycleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess: () => void;
}

export const CreateCycleDrawer = ({ isOpen, onClose, tontineId, onSuccess }: CreateCycleDrawerProps) => {
  const { createCycle, getMembers, isLoading, error } = useTontine();
  const [members, setMembers] = useState<any[]>([]);
  const [payoutOrder, setPayoutOrder] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (isOpen) {
      const loadMembers = async () => {
        const list = await getMembers(tontineId);
        if (list) {
          setMembers(list);
          // Default order: existing order or all members
          setPayoutOrder(list.map(m => m.user?.id).filter(Boolean));
        }
      };
      loadMembers();
    }
  }, [isOpen, tontineId]);

  const toggleMemberInOrder = (userId: string) => {
    if (!userId) return;
    setPayoutOrder(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    const success = await createCycle(tontineId, {
      startDate: formData.startDate,
      endDate: formData.endDate,
      payoutOrder: payoutOrder
    });

    if (success) {
      onSuccess();
      onClose();
      setFormData({ startDate: '', endDate: '' });
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
            <h2 className="text-xl font-bold text-slate tracking-tight">Lancer un nouveau cycle</h2>
            <p className="text-xs text-slate-grey mt-0.5">Configurez les dates et l'ordre des bénéficiaires.</p>
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
            <label className="text-xs font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <Calendar size={14} className="text-slate-grey" />
              Dates du cycle
            </label>
            <div className="grid grid-cols-2 gap-md">
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
              />
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-xs font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <ListOrdered size={14} className="text-slate-grey" />
              Ordre de Payout (Calendrier)
            </label>
            <div className="flex flex-col gap-2">
              {members.map((m, i) => (
                <div
                  key={m.id}
                  onClick={() => toggleMemberInOrder(m.user?.id)}
                  className={cn(
                    "p-md rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                    payoutOrder.includes(m.user?.id)
                      ? "bg-primary/5 border-primary/20 shadow-sm"
                      : "bg-white border-slate-light/50 grayscale opacity-60"
                  )}
                >
                  <div className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                      {payoutOrder.indexOf(m.user?.id) !== -1 ? payoutOrder.indexOf(m.user?.id) + 1 : '-'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate">{m.user?.name}</span>
                      <span className="text-xs text-slate-grey uppercase font-bold tracking-tighter">{m.role}</span>
                    </div>
                  </div>
                  {payoutOrder.includes(m.user?.id) && <User size={16} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-md pt-xl bg-white sticky bottom-0">
            <Button type="button" variant="secondary" className="flex-1 h-12 rounded-2xl" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || !formData.startDate || !formData.endDate} className="flex-1 h-12 rounded-2xl gap-sm">
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              Lancer le cycle
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
