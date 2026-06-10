import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Landmark, Eye } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';

export const CurrentCycle = () => {
  return (
    <Card className="flex-1 bg-gradient-to-br from-white to-primary/5 border border-slate-light/30">
      <CardContent className="flex flex-col gap-xl">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-slate">Cycle en cours</h3>
            <div className="flex items-center gap-sm mt-md">
              <div className="w-8 h-8 rounded-full bg-slate-light overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jean" alt="Jean Dupont" />
              </div>
              <p className="text-sm font-medium text-slate-grey">
                Tour de: <span className="text-slate font-bold">Jean Dupont</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Prochaine levée</span>
            <span className="text-sm font-bold text-primary tracking-tight">30 Mars 2024</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-medium text-slate-grey italic">9/15 membres ont cotisé</span>
            <span className="text-sm font-bold text-primary">60%</span>
          </div>
          <div className="h-2 w-full bg-slate-light/50 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-primary rounded-full transition-all duration-1000" />
          </div>
        </div>

        <div className="flex items-center gap-xl pt-md border-t border-slate-light/50">
          <Button variant="secondary" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white gap-sm">
            <Landmark size={18} />
            Effectuer mon paiement
          </Button>
          <button className="flex items-center gap-sm text-sm font-bold text-slate-grey hover:text-slate transition-colors">
            <Eye size={18} />
            Voir le planning
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
