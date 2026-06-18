import React, { useState } from 'react';
import { useTontine } from '@/presentation/hooks/useTontine';
import { Button } from '@/presentation/components/ui/Button';
import { X, Calendar, Loader2 } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface CreateCycleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
  onSuccess: () => void;
}

export const CreateCycleDrawer = ({ isOpen, onClose, tontineId, onSuccess }: CreateCycleDrawerProps) => {
  const { createCycle, isLoading, error } = useTontine();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    const success = await createCycle(tontineId, {
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    if (success) {
      onSuccess();
      onClose();
      setFormData({ startDate: '', endDate: '' });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-slate/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[100] transition-transform duration-300 ease-out p-xl flex flex-col gap-xl border-l border-slate-light",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate tracking-tight">Lancer un nouveau cycle</h2>
            <p className="text-xs text-slate-grey mt-0.5">Configurez les dates de la nouvelle période d'épargne.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-light/50 flex items-center justify-center text-slate hover:bg-slate-light transition-colors"
          >
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
              <Calendar size={12} className="text-slate-grey" />
              Date de début
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-[10px] font-bold text-slate uppercase tracking-widest flex items-center gap-sm">
              <Calendar size={12} className="text-slate-grey" />
              Date de fin contractuelle
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full bg-slate-light/30 border border-slate-light/60 rounded-2xl px-md py-sm text-sm font-bold text-slate focus:outline-none focus:border-primary/50 transition-colors h-12"
            />
          </div>

          <div className="mt-auto flex gap-md">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-12 rounded-2xl"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.startDate || !formData.endDate}
              className="flex-1 h-12 rounded-2xl gap-sm"
            >
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              Lancer le cycle
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
