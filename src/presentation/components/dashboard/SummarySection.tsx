import React from 'react';
import { TrendingUp } from 'lucide-react';

export const SummarySection = () => {
  return (
    <div className="card-summary flex flex-col md:flex-row justify-between items-center gap-xl relative overflow-hidden">
      {/* Decorative gradient background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-sm flex-1">
        <h2 className="text-3xl font-bold tracking-tight">Total en cours d'épargne</h2>
        <p className="text-body-md text-inverse-on-surface/70">Vous participez à 3 tontines actives.</p>

        <div className="flex flex-wrap gap-xxl mt-lg">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-inverse-on-surface/50">Total Cotisé</span>
            <div className="flex items-baseline gap-xs">
              <span className="text-5xl font-extrabold text-primary tracking-tighter">450,000</span>
              <span className="text-xl font-bold text-primary opacity-80 uppercase tracking-widest">FCFA</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-inverse-on-surface/50">Prochain Tirage</span>
            <span className="text-xl font-bold tracking-tight">15 Mars 2024</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-grey/10 border border-white/5 rounded-[32px] p-lg flex flex-col gap-lg w-full md:w-80 relative z-10 backdrop-blur-sm">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <TrendingUp size={20} />
          </div>
          <span className="text-lg font-bold">Performance</span>
        </div>

        <div className="flex justify-between items-end h-32 gap-3 px-2">
          {[40, 65, 30, 85, 55].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col gap-2 group">
              <div className="w-full bg-white/10 rounded-full h-full relative overflow-hidden">
                <div
                  className={cn(
                    "absolute bottom-0 w-full rounded-full transition-all duration-700 delay-300",
                    i === 3 ? "bg-primary" : "bg-primary/40"
                  )}
                  style={{ height: `${height}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classes within this file if needed
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
