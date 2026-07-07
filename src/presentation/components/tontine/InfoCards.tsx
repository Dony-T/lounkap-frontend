import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Info, ArrowRight } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface InfoCardsProps {
  description?: string;
  membersCount?: number;
}

export const InfoCards = ({ description, membersCount = 0 }: InfoCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl w-full">
      <Card className="bg-inverse-surface text-inverse-on-surface">
        <CardContent className="flex flex-col gap-lg p-xl">
          <h4 className="text-xl font-bold tracking-tight">Note du Projet</h4>
          <p className="text-sm text-inverse-on-surface/70 leading-relaxed min-h-[60px]">
            {description || "Aucune description fournie pour ce projet de tontine."}
          </p>
          <div className="flex -space-x-2 mt-auto pt-4 border-t border-white/10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-inverse-surface overflow-hidden bg-slate-grey">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + (membersCount % 10)}`} alt="Member" />
              </div>
            ))}
            {membersCount > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-inverse-surface bg-white/10 flex items-center justify-center text-[10px] font-bold">
                +{membersCount - 3}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-surface-container-low border border-primary/10">
        <CardContent className="flex flex-col gap-lg">
          <div className="flex items-center gap-md text-primary">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Info size={20} />
            </div>
            <h4 className="text-xl font-bold text-slate">Règlement</h4>
          </div>
          <button className="flex items-center justify-between text-sm font-bold text-primary hover:gap-2 transition-all mt-auto group">
            Consulter le contrat
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
