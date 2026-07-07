import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Landmark, Eye } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';

interface CurrentCycleProps {
  amount?: number | string;
  onPayment?: () => void;
  beneficiary?: any;
}

export const CurrentCycle = ({ amount, onPayment, beneficiary }: CurrentCycleProps) => {
  return (
    <Card className="flex-1 bg-gradient-to-br from-white to-primary/5 border border-slate-light/30 shadow-sm w-full">
      <CardContent className="flex flex-col gap-xl p-xl">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-slate">Cycle en cours</h3>
            <div className="flex items-center gap-sm mt-md">
              <div className="w-10 h-10 rounded-full bg-slate-light overflow-hidden border-2 border-white shadow-sm">
                <img src={beneficiary?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${beneficiary?.name || 'Jean'}`} alt="Beneficiary" />
              </div>
              <p className="text-sm font-medium text-slate-grey">
                Tour de: <span className="text-slate font-bold">{beneficiary?.name || "Bénéficiaire en attente"}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Prochaine levée</span>
            <span className="text-sm font-bold text-primary tracking-tight">À définir</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-medium text-slate-grey italic">Progression du tour actuel</span>
            <span className="text-sm font-bold text-primary">0%</span>
          </div>
          <div className="h-2 w-full bg-slate-light/50 rounded-full overflow-hidden">
            <div className="h-full w-[0%] bg-primary rounded-full transition-all duration-1000" />
          </div>
        </div>

        <div className="flex items-center gap-xl pt-md border-t border-slate-light/50">
          <Button
            onClick={onPayment}
            variant="secondary"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white gap-sm h-12 rounded-2xl font-bold"
          >
            <Landmark size={18} />
            Payer mes {(Number(amount) || 0).toLocaleString()} FCFA
          </Button>
          <button className="flex items-center gap-sm text-sm font-bold text-slate-grey hover:text-slate transition-colors px-4">
            <Eye size={18} />
            Planning
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
