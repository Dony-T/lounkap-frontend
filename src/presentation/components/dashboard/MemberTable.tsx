import React, { useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, UserCog, UserMinus, ShieldAlert, CheckCircle } from 'lucide-react';
import { Badge } from '@/presentation/components/ui/Badge';
import { cn } from '@/presentation/utils/cn';
import { useSearchParams } from 'next/navigation';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'PRESIDENT' | 'TREASURER' | 'MEMBER' | 'SECRETARY';
  status: 'ACTIVE' | 'INACTIVE';
  joinedAt: string;
  avatarColor?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  }
}

interface MemberTableProps {
  members: Member[];
  isLoading?: boolean;
}

const roleConfig = {
  PRESIDENT: { variant: 'primary' as const, label: 'PRÉSIDENT' },
  TREASURER: { variant: 'secondary' as const, label: 'TRÉSORIER' },
  MEMBER: { variant: 'neutral' as const, label: 'MEMBRE' },
  SECRETARY: { variant: 'info' as const, label: 'SECRÉTAIRE' },
  ADMIN: { variant: 'primary' as const, label: 'ADMIN' },
};

export const MemberTable = ({ members, isLoading }: MemberTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const membersList = Array.isArray(members) ? members : [];

  const filteredMembers = membersList.filter((m: any) =>
    (m.user?.name || '').toLowerCase().includes(searchQuery) ||
    (m.user?.email || '').toLowerCase().includes(searchQuery) ||
    (m.user?.phone || '').toLowerCase().includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-air p-xxl flex flex-col items-center justify-center gap-md border border-slate-light/50">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-grey font-medium">Chargement des membres...</p>
      </div>
    );
  }

  if (membersList.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-air p-xxl text-center border border-slate-light/50">
        <p className="text-slate-grey text-xs">Aucun membre trouvé pour cette tontine.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-air overflow-hidden border border-slate-light/50">
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-light/30 bg-slate-light/5">
              <th className="px-lg py-md text-xs font-bold text-slate-grey uppercase tracking-widest">Membre</th>
              <th className="px-lg py-md text-xs font-bold text-slate-grey uppercase tracking-widest text-center">Rôle</th>
              <th className="px-lg py-md text-xs font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
              <th className="px-lg py-md text-xs font-bold text-slate-grey uppercase tracking-widest">Date d'adhésion</th>
              <th className="px-lg py-md text-xs font-bold text-slate-grey uppercase tracking-widest text-right w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-light/30">
            {filteredMembers.map((membership: any) => (
              <tr key={membership.id} className="hover:bg-slate-light/5 transition-colors group relative">
                <td className="px-lg py-md">
                  <div className="flex items-center gap-md">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-slate-100 text-slate-600 border border-slate-light",
                    )}>
                      {membership.user?.name ? membership.user.name.split(' ').map((n: any) => n[0]).join('') : '?'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate leading-tight">{membership.user?.name || 'Inconnu'}</span>
                      <span className="text-xs text-slate-grey">{membership.user?.email || membership.user?.phone || 'Pas d\'identifiant'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-md text-center">
                  <Badge variant={(roleConfig[membership.role as keyof typeof roleConfig] || roleConfig.MEMBER).variant} className="text-xs">
                    {(roleConfig[membership.role as keyof typeof roleConfig] || roleConfig.MEMBER).label}
                  </Badge>
                </td>
                <td className="px-lg py-md text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      membership.status === 'ACTIVE' ? "bg-status-success" : "bg-slate-grey"
                    )} />
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-widest",
                      membership.status === 'ACTIVE' ? "text-status-success" : "text-slate-grey"
                    )}>
                      {membership.status || 'INCONNU'}
                    </span>
                  </div>
                </td>
                <td className="px-lg py-md">
                  <span className="text-sm font-medium text-slate-grey">
                    {membership.joinedAt ? new Date(membership.joinedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                  </span>
                </td>
                <td className="px-lg py-md text-right">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === membership.id ? null : membership.id)}
                      className="p-sm text-slate-grey hover:text-slate hover:bg-slate-light/20 rounded-lg transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Action Menu Dropdown */}
                    {openMenuId === membership.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-light rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button className="w-full px-lg py-sm text-left text-sm font-semibold text-slate hover:bg-slate-light/10 flex items-center gap-md">
                          <UserCog size={16} className="text-slate-grey" />
                          Changer le rôle
                        </button>
                        <button className="w-full px-lg py-sm text-left text-sm font-semibold text-slate hover:bg-slate-light/10 flex items-center gap-md">
                          {membership.status === 'ACTIVE' ? <ShieldAlert size={16} className="text-status-warning" /> : <CheckCircle size={16} className="text-status-success" />}
                          {membership.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
                        </button>
                        <div className="h-px bg-slate-light/30 my-1" />
                        <button className="w-full px-lg py-sm text-left text-sm font-semibold text-status-error hover:bg-status-error/5 flex items-center gap-md">
                          <UserMinus size={16} />
                          Exclure le membre
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-lg py-md border-t border-slate-light/30 bg-slate-light/5 flex items-center justify-between">
        <p className="text-xs text-slate-grey font-medium">
          Affichage de <span className="font-bold text-slate">1 à {membersList.length}</span> sur <span className="font-bold text-slate">{membersList.length}</span> membres
        </p>
        <div className="flex gap-sm">
          <button className="p-1 rounded border border-slate-light text-slate-grey hover:bg-slate-light transition-colors"><ChevronLeft size={16} /></button>
          <button className="p-1 rounded border border-slate-light text-slate-grey hover:bg-slate-light transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};
