'use client';

import React, { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { TontineCard } from '@/presentation/components/dashboard/TontineCard';
import { SummarySection } from '@/presentation/components/dashboard/SummarySection';
import { CreateTontineDrawer } from '@/presentation/components/dashboard/CreateTontineDrawer';

const tontines = [
  {
    id: '1',
    type: 'business' as const,
    title: 'Épargne Entrepreneurs',
    description: 'Réunion mensuelle pour le financement de projets innovants.',
    contribution: '50,000 FCFA',
    frequency: 'Mensuelle',
    members: { current: 12, total: 20 },
    role: 'PRESIDENT' as const,
    code: 'TX-9824-A',
  },
  {
    id: '2',
    type: 'family' as const,
    title: 'Cercle Familial',
    description: 'Tontine restreinte aux membres de la famille Kouamé.',
    contribution: '25,000 FCFA',
    frequency: 'Hebdomadaire',
    members: { current: 8, total: 10 },
    role: 'MEMBER' as const,
    code: 'FAM-1234-B',
  },
  {
    id: '3',
    type: 'realestate' as const,
    title: 'Projet Immobilier',
    description: 'Objectif d\'achat de terrains groupés en périphérie.',
    contribution: '100,000 FCFA',
    frequency: 'Mensuelle',
    members: { current: 15, total: 30 },
    role: 'MEMBER' as const,
    code: 'PRO-5678-C',
  },
];

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl">
        <header className="flex justify-between items-end">
          <div className="flex flex-col gap-sm">
            <h1 className="text-4xl font-bold text-slate tracking-tight">Mes Tontines</h1>
            <p className="text-body-md text-slate-grey">Gérez vos cercles d'épargne et suivez vos cotisations.</p>
          </div>
          <div className="flex gap-md">
            <Button variant="secondary" className="gap-sm">
              <UserPlus size={18} />
              Rejoindre
            </Button>
            <Button
              className="gap-sm"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Plus size={18} />
              Créer une tontine
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {tontines.map((tontine, i) => (
            <TontineCard key={i} {...tontine} />
          ))}
        </section>

        <SummarySection />
      </div>

      <CreateTontineDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </DashboardLayout>
  );
}
