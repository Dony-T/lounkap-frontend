'use client';

import React from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Bell, Check, Info, AlertTriangle, Clock, X } from 'lucide-react';
import { cn } from '@/presentation/utils/cn';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  createdAt: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  // Mock data for now, but ready for real API integration
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Cotisation reçue',
      message: 'Marc Lukman a payé sa cotisation de 100 000 FCFA.',
      type: 'SUCCESS',
      createdAt: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      title: 'Rappel de tour',
      message: 'C\'est bientôt votre tour de recevoir la cagnotte (Cycle Janvier).',
      type: 'INFO',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'Demande de prêt',
      message: 'Sarah Kouam a soumis une demande de prêt de 200 000 FCFA.',
      type: 'WARNING',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile or to close on click outside */}
      <div className="fixed inset-0 z-[100]" onClick={onClose} />

      <div className="absolute right-xxl top-full mt-2 w-96 bg-white border border-slate-light rounded-[32px] shadow-2xl z-[101] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="p-xl border-b border-slate-light/30 flex justify-between items-center bg-slate-light/5">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Bell size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-sm hover:bg-slate-light/20 rounded-full transition-colors text-slate-grey">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
          {notifications.length > 0 ? (
            <div className="flex flex-col divide-y divide-slate-light/30">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "p-xl flex gap-md hover:bg-slate-light/5 transition-colors cursor-pointer group",
                    !n.read && "bg-primary/[0.02]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center",
                    n.type === 'SUCCESS' ? "bg-status-success/10 text-status-success" :
                    n.type === 'WARNING' ? "bg-status-warning/10 text-status-warning" :
                    "bg-primary/10 text-primary"
                  )}>
                    {n.type === 'SUCCESS' ? <Check size={20} /> :
                     n.type === 'WARNING' ? <AlertTriangle size={20} /> :
                     <Info size={20} />}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate group-hover:text-primary transition-colors">{n.title}</span>
                      {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                    </div>
                    <p className="text-xs text-slate-grey leading-relaxed line-clamp-2">{n.message}</p>
                    <div className="flex items-center gap-sm mt-1 text-[10px] text-slate-grey/60 font-medium">
                      <Clock size={12} />
                      {new Date(n.createdAt).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center flex flex-col items-center gap-md">
              <Bell size={40} className="text-slate-light" />
              <p className="text-sm text-slate-grey font-medium italic">Aucune nouvelle notification</p>
            </div>
          )}
        </div>

        <div className="p-md bg-slate-light/5 border-t border-slate-light/30 text-center">
          <button className="text-xs font-bold text-primary hover:underline transition-all">
            Voir tout l'historique
          </button>
        </div>
      </div>
    </>
  );
};
