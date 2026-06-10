import React from 'react';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { DetailHeader } from '@/presentation/components/tontine/DetailHeader';
import { StatCards } from '@/presentation/components/tontine/StatCards';
import { CurrentCycle } from '@/presentation/components/tontine/CurrentCycle';
import { TransactionList } from '@/presentation/components/tontine/TransactionList';
import { InfoCards } from '@/presentation/components/tontine/InfoCards';

export default function TontineDetailPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-xxl -mt-xxl">
        <DetailHeader title="Projet Immobilier" code="PRO-5678-C" />

        <div className="flex flex-col gap-xl">
          <StatCards />

          <div className="flex flex-col lg:flex-row gap-xl items-start">
            <div className="flex-1 flex flex-col gap-xl w-full">
              <CurrentCycle />
              <InfoCards />
            </div>

            <TransactionList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
