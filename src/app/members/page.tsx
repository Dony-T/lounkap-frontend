import React from 'react';
import { Search, UserPlus, Shield, UserCheck, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { Button } from '@/presentation/components/ui/Button';
import { MemberTable } from '@/presentation/components/dashboard/MemberTable';
import { InfoCard } from '@/presentation/components/dashboard/InfoCard';

export default function MembersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xl">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey" size={18} />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              className="w-full bg-white border border-slate-light rounded-2xl pl-[48px] pr-md py-sm text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-slate-grey/50 shadow-sm"
            />
          </div>
          <Button className="gap-sm py-[10px]">
            <UserPlus size={18} />
            Ajouter un membre
          </Button>
        </div>

        {/* Member Table Section */}
        <section>
          <MemberTable />
        </section>

        {/* Info Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <InfoCard
            icon={Shield}
            title="Gouvernance Partagée"
            description="Chaque membre dispose d'un rôle spécifique (Président, Trésorier, Secrétaire) assurant une transparence totale dans la gestion immobilière."
          />
          <InfoCard
            icon={UserCheck}
            title="Vérification KYC"
            description="Tous les membres du Projet Immobilier ont complété leur vérification d'identité pour garantir la sécurité des fonds collectés."
          />
          <InfoCard
            icon={BarChart3}
            title="Suivi d'Activité"
            description="Visualisez le taux de participation et la ponctualité de chaque membre lors des cycles de cotisations mensuelles."
          />
        </section>
      </div>
    </DashboardLayout>
  );
}
