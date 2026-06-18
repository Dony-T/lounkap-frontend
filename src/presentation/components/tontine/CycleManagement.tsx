import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  ArrowRight,
  Lock,
  ChevronRight,
  History,
  Trash2,
  Plus,
  Calendar,
  Clock
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface CycleManagementProps {
  tontineId: string;
}

export const CycleManagement = ({ tontineId }: CycleManagementProps) => {
  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section with Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate tracking-tight">Gestion des Cycles</h2>
        <Button className="gap-sm bg-status-warning hover:bg-status-warning/90 border-none shadow-md shadow-status-warning/20">
          <Plus size={18} />
          Nouveau Cycle
        </Button>
      </div>

      {/* Active Cycle Card */}
      <Card className="bg-white border border-slate-light/50 overflow-hidden shadow-air">
        <CardContent className="p-xl flex flex-col gap-xl">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-md">
                <h3 className="text-lg font-bold text-slate">Cycle en cours</h3>
                <Badge variant="success" className="bg-status-success/10 text-status-success border-none text-[10px]">ACTIVE</Badge>
              </div>
              <div className="flex items-center gap-sm text-slate-grey">
                <Calendar size={14} />
                <span className="text-xs font-medium">Du 01 Jan 2024 au 30 Juin 2024</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Périodicité</span>
              <span className="text-sm font-bold text-slate">Mensuel</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <div className="flex flex-col gap-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Tour actuel</span>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                  JD
                </div>
                <span className="text-sm font-bold text-primary">Jean Dupont</span>
              </div>
            </div>

            <div className="flex flex-col gap-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Fonds collectés</span>
              <div className="flex items-baseline gap-sm">
                <span className="text-lg font-bold text-slate">450,000</span>
                <span className="text-xs font-medium text-slate-grey">/ 500,000 FCFA</span>
              </div>
            </div>

            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-grey">Progression</span>
                <span className="text-xs font-bold text-status-warning">90%</span>
              </div>
              <div className="h-2 w-full bg-slate-light/50 rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-status-warning rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-xl border-t border-slate-light/30">
            <div className="flex items-center gap-md">
              <Button variant="secondary" className="gap-sm border-primary/20 text-primary hover:bg-primary/5">
                Avancer le tour
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" className="gap-sm border-status-error/20 text-status-error hover:bg-status-error/5">
                <Lock size={16} />
                Clôturer le cycle
              </Button>
            </div>
            <button className="flex items-center gap-sm text-sm font-bold text-slate-grey hover:text-slate transition-colors group">
              Détails du cycle
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="bg-white border border-slate-light/50 overflow-hidden shadow-air">
        <div className="px-xl py-lg border-b border-slate-light/30">
          <h3 className="text-lg font-bold text-slate">Historique des Cycles</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-light/5">
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Période</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Tours complétés</th>
                <th className="px-xl py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-light/30">
              <tr className="hover:bg-slate-light/5 transition-colors">
                <td className="px-xl py-lg">
                  <div className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-lg bg-slate-light/50 flex items-center justify-center text-slate-grey">
                      <History size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate">01 Juil 2023 - 31 Déc 2023</span>
                  </div>
                </td>
                <td className="px-xl py-lg text-center">
                  <Badge className="bg-slate-light/50 text-slate-grey border-none text-[10px]">COMPLETED</Badge>
                </td>
                <td className="px-xl py-lg">
                  <div className="flex flex-col gap-2 max-w-[120px] mx-auto">
                    <div className="flex justify-between text-[10px] font-bold text-slate-grey">
                      <span>12 / 12</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-light/50 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-status-success rounded-full" />
                    </div>
                  </div>
                </td>
                <td className="px-xl py-lg text-right">
                  <div className="flex items-center justify-end gap-md">
                    <button className="p-sm text-slate-grey hover:text-primary transition-colors">
                      <EyeIcon size={18} />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-light/5 transition-colors">
                <td className="px-xl py-lg">
                  <div className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-lg bg-slate-light/50 flex items-center justify-center text-slate-grey">
                      <Clock size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate">01 Juil 2024 - 31 Déc 2024</span>
                  </div>
                </td>
                <td className="px-xl py-lg text-center">
                  <Badge className="bg-status-warning/10 text-status-warning border-none text-[10px]">EN ATTENTE</Badge>
                </td>
                <td className="px-xl py-lg">
                  <div className="flex flex-col gap-2 max-w-[120px] mx-auto">
                    <div className="flex justify-between text-[10px] font-bold text-slate-grey">
                      <span>0 / 12</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-light/50 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-primary rounded-full" />
                    </div>
                  </div>
                </td>
                <td className="px-xl py-lg text-right">
                  <div className="flex items-center justify-end gap-md">
                    <button className="p-sm text-slate-grey hover:text-primary transition-colors">
                      <EyeIcon size={18} />
                    </button>
                    <button className="p-sm text-slate-grey hover:text-status-error transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-xl py-lg border-t border-slate-light/30 text-center">
          <button className="text-sm font-bold text-primary hover:underline transition-all">
            Voir l'historique complet
          </button>
        </div>
      </Card>
    </div>
  );
};

const EyeIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
