'use client';

import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, UserCheck, BarChart3, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { Button } from '@/presentation/components/ui/Button';
import { MemberTable } from '@/presentation/components/dashboard/MemberTable';
import { InfoCard } from '@/presentation/components/dashboard/InfoCard';
import { AddMemberDrawer } from '@/presentation/components/dashboard/AddMemberDrawer';
import { useTontine } from '@/presentation/hooks/useTontine';

export default function MembersPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedTontineId, setSelectedTontineId] = useState<string | null>(null);
  const [tontines, setTontines] = useState<any[]>([]);

  const { listTontines, getMembers, isLoading, error } = useTontine();

  const loadData = async () => {
    const tontineList = await listTontines();
    if (tontineList && tontineList.length > 0) {
      setTontines(tontineList);
      // Par défaut, on prend la première tontine
      const firstId = tontineList[0].id;
      setSelectedTontineId(firstId);
      const memberList = await getMembers(firstId);
      if (memberList) setMembers(memberList);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTontineChange = async (id: string) => {
    setSelectedTontineId(id);
    const memberList = await getMembers(id);
    if (memberList) setMembers(memberList);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xl">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div className="flex flex-col gap-sm w-full md:w-auto">
            <label className="text-[10px] font-bold text-slate-grey uppercase tracking-widest ml-1">Sélectionner une tontine</label>
            <select
              className="bg-white border border-slate-light rounded-2xl px-md py-[10px] text-sm focus:outline-none focus:border-primary transition-colors shadow-sm min-w-[240px]"
              value={selectedTontineId || ''}
              onChange={(e) => handleTontineChange(e.target.value)}
            >
              {tontines.map(t => (
                <option key={t.id} value={t.id}>{t.name || t.title}</option>
              ))}
              {tontines.length === 0 && <option value="">Aucune tontine</option>}
            </select>
          </div>

          <div className="flex gap-md w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-md top-1/2 -translate-y-1/2 text-slate-grey" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white border border-slate-light rounded-2xl pl-[48px] pr-md py-[10px] text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
            </div>
            <Button
              className="gap-sm py-[10px]"
              onClick={() => setIsAddMemberOpen(true)}
              disabled={!selectedTontineId}
            >
              <UserPlus size={18} />
              Ajouter
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error/20 rounded-2xl p-md flex items-center gap-md text-status-error">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Member Table Section */}
        <section>
          <MemberTable members={members} isLoading={isLoading} />
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

      <AddMemberDrawer
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        tontineId={selectedTontineId || ''}
        onSuccess={() => selectedTontineId && handleTontineChange(selectedTontineId)}
      />
    </DashboardLayout>
  );
}
