'use client';

import React, { useState } from 'react';
import { Camera, Upload, User, Lock, Sliders, Save, Trash2, ChevronDown, Check } from 'lucide-react';
import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { Card } from '@/presentation/components/ui/Card';
import { cn } from '@/presentation/utils/cn';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'preferences', label: 'Préférences', icon: Sliders },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-lg max-w-4xl">
        <header className="flex flex-col gap-sm">
          <h1 className="text-3xl font-bold text-slate tracking-tight">Paramètres</h1>
          <p className="text-sm text-slate-grey">Gérez vos informations personnelles et la sécurité de votre compte.</p>
        </header>

        {/* Tabs */}
        <div className="flex gap-lg border-b border-slate-light/30 mb-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-md px-sm text-sm font-medium transition-all relative",
                activeTab === tab.id
                  ? "text-secondary"
                  : "text-slate-grey hover:text-slate"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="flex flex-col gap-lg animate-fade-in">
            {/* Profile Photo Card */}
            {/* ... (keep existing profile code) */}
            <Card padding="lg" className="flex items-center gap-xl">
              <div className="relative">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-slate-light shadow-sm text-slate-grey hover:text-secondary transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-md">
                <h4 className="text-sm font-bold text-slate">Photo de profil</h4>
                <div className="flex items-center gap-md">
                   <Button variant="secondary" size="sm" className="gap-sm py-2 px-md font-medium text-xs">
                    <Upload size={14} />
                    Changer la photo
                  </Button>
                  <span className="text-[11px] text-slate-grey">Format JPG ou PNG, max 2MB.</span>
                </div>
              </div>
            </Card>

            {/* Personal Info Card */}
            <Card padding="lg" className="flex flex-col gap-lg">
              <div className="flex items-center gap-sm text-slate">
                <User size={18} className="text-[#a68928]" strokeWidth={2.5} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[11px]">Informations Personnelles</h3>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <Input label="Nom complet" defaultValue="Jean Dupont" />
                <div className="flex flex-col gap-xs w-full">
                  <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <input
                      disabled
                      defaultValue="jean.dupont@example.com"
                      className="w-full border border-slate-light rounded-2xl px-md py-sm bg-slate-light/5 text-slate-grey cursor-not-allowed text-sm"
                    />
                    <Lock size={14} className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey/40" />
                  </div>
                </div>
              </div>

              <Input label="Numéro de téléphone" defaultValue="+237 6 00 00 00 00" />

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                    Ville
                  </label>
                  <div className="relative">
                    <select className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none appearance-none bg-white text-sm text-slate">
                      <option>Douala</option>
                      <option>Yaoundé</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="text-sm font-medium text-slate-grey ml-1 uppercase tracking-wider text-[11px]">
                    Devise préférée
                  </label>
                  <div className="relative">
                    <select className="w-full border border-slate-light rounded-2xl px-md py-sm outline-none appearance-none bg-white text-sm text-slate">
                      <option>XAF - Franc CFA</option>
                      <option>EUR - Euro</option>
                      <option>USD - Dollar</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-md top-1/2 -translate-y-1/2 text-slate-grey pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-md">
                <Button className="gap-sm px-xl py-md">
                  <Save size={18} />
                  Enregistrer les modifications
                </Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <div className="bg-status-error/[0.03] border border-status-error/10 rounded-3xl p-lg flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-status-error uppercase tracking-wider text-[11px]">Zone de danger</h4>
                <p className="text-sm text-slate-grey">Désactivez votre compte ou demandez la suppression de vos données.</p>
              </div>
              <button className="text-status-error font-bold text-sm hover:underline transition-all">
                Désactiver mon compte
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="flex flex-col gap-lg animate-fade-in">
            <Card padding="lg" className="flex flex-col gap-xl">
              <div className="flex items-center gap-sm text-slate">
                <div className="w-8 h-8 bg-[#fdfaf1] rounded-lg flex items-center justify-center text-[#a68928] border border-[#f5ead2]">
                   <Lock size={18} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-slate">Mot de passe</h3>
              </div>

              <div className="flex flex-col gap-lg">
                <div className="flex flex-col gap-xs">
                  <label className="text-sm font-bold text-slate">Mot de passe actuel</label>
                  <Input
                    type="password"
                    defaultValue="........"
                    className="bg-slate-light/5 border-slate-light/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="text-sm font-bold text-slate">Nouveau mot de passe</label>
                    <Input
                      type="password"
                      defaultValue="........"
                      className="bg-slate-light/5 border-slate-light/40"
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="text-sm font-bold text-slate">Confirmer le mot de passe</label>
                    <Input
                      type="password"
                      defaultValue="........"
                      className="bg-slate-light/5 border-slate-light/40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-md">
                <Button className="gap-sm px-xl py-md rounded-full font-bold">
                  <Check size={18} />
                  Mettre à jour
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
      </div>
    </DashboardLayout>
  );
}
