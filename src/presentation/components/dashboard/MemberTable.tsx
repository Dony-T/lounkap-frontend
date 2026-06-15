import React from 'react';
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/presentation/components/ui/Badge';
import { cn } from '@/presentation/utils/cn';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'PRESIDENT' | 'TREASURER' | 'MEMBER' | 'SECRETARY';
  status: 'ACTIVE' | 'INACTIVE';
  joinDate: string;
  avatarColor?: string;
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
  const membersList = Array.isArray(members) ? members : [];

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
        <p className="text-slate-grey">Aucun membre trouvé pour cette tontine.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-air overflow-hidden border border-slate-light/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-light/30">
              <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Membre</th>
              <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Rôle</th>
              <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-center">Statut</th>
              <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest">Date d'adhésion</th>
              <th className="px-lg py-md text-[10px] font-bold text-slate-grey uppercase tracking-widest text-right w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-light/30">
            {membersList.map((member) => (
              <tr key={member.id} className="hover:bg-slate-light/5 transition-colors group">
                <td className="px-lg py-md">
                  <div className="flex items-center gap-md">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                      member.avatarColor || "bg-slate-100 text-slate-600"
                    )}>
                      {member.name ? member.name.split(' ').map((n: any) => n[0]).join('') : '?'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate leading-tight">{member.name || 'Inconnu'}</span>
                      <span className="text-xs text-slate-grey">{member.email || 'Pas d\'email'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-md text-center">
                  <Badge variant={(roleConfig[member.role as keyof typeof roleConfig] || roleConfig.MEMBER).variant}>
                    {(roleConfig[member.role as keyof typeof roleConfig] || roleConfig.MEMBER).label}
                  </Badge>
                </td>
                <td className="px-lg py-md text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      member.status === 'ACTIVE' ? "bg-status-success" : "bg-slate-grey"
                    )} />
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      member.status === 'ACTIVE' ? "text-status-success" : "text-slate-grey"
                    )}>
                      {member.status || 'INCONNU'}
                    </span>
                  </div>
                </td>
                <td className="px-lg py-md">
                  <span className="text-sm font-medium text-slate-grey">{member.joinDate || 'N/A'}</span>
                </td>
                <td className="px-lg py-md text-right">
                  <button className="p-sm text-slate-grey hover:text-slate transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (statique pour l'instant) */}
      <div className="px-lg py-md border-t border-slate-light/30 flex items-center justify-between">
        <p className="text-xs text-slate-grey">
          Affichage de <span className="font-bold text-slate">1 à {membersList.length}</span> sur <span className="font-bold text-slate">{membersList.length}</span> membres
        </p>
      </div>
    </div>
  );
};
