import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { TontineProvider } from '@/presentation/context/TontineContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <TontineProvider>
      <div className="min-h-screen bg-background text-slate relative">
        <Sidebar />
        <div className="pl-64 flex flex-col min-h-screen">
          <TopBar />
          <main className="p-xxl pt-md flex-1">
            <div className="max-w-[1440px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </TontineProvider>
  );
};
