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
  avatarColor: string;
}

const members: Member[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    role: 'PRESIDENT',
    status: 'ACTIVE',
    joinDate: '15 Janv. 2024',
    avatarColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: '2',
    name: 'Amina Kouamé',
    email: 'a.kouame@finance.ci',
    role: 'TREASURER',
    status: 'ACTIVE',
    joinDate: '16 Janv. 2024',
    avatarColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: '3',
    name: 'Marc Penda',
    email: 'marc.penda@techhub.net',
    role: 'MEMBER',
    status: 'ACTIVE',
    joinDate: '20 Janv. 2024',
    avatarColor: 'bg-slate-100 text-slate-600',
  },
  {
    id: '4',
    name: 'Catherine Leroi',
    email: 'c.leroi@design.fr',
    role: 'MEMBER',
    status: 'ACTIVE',
    joinDate: '22 Janv. 2024',
    avatarColor: 'bg-amber-100 text-amber-600',
  },
];

const roleConfig = {
  PRESIDENT: { variant: 'primary' as const, label: 'PRESIDENT' },
  TREASURER: { variant: 'secondary' as const, label: 'TREASURER' },
  MEMBER: { variant: 'neutral' as const, label: 'MEMBER' },
  SECRETARY: { variant: 'info' as const, label: 'SECRETARY' },
};

export const MemberTable = () => {
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
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-light/5 transition-colors group">
                <td className="px-lg py-md">
                  <div className="flex items-center gap-md">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0", member.avatarColor)}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate leading-tight">{member.name}</span>
                      <span className="text-xs text-slate-grey">{member.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-md text-center">
                  <Badge variant={roleConfig[member.role].variant}>
                    {roleConfig[member.role].label}
                  </Badge>
                </td>
                <td className="px-lg py-md text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-status-success" />
                    <span className="text-[10px] font-bold text-status-success uppercase tracking-widest">
                      {member.status}
                    </span>
                  </div>
                </td>
                <td className="px-lg py-md">
                  <span className="text-sm font-medium text-slate-grey">{member.joinDate}</span>
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

      {/* Pagination */}
      <div className="px-lg py-md border-t border-slate-light/30 flex items-center justify-between">
        <p className="text-xs text-slate-grey">
          Affichage de <span className="font-bold text-slate">1 à 4</span> sur <span className="font-bold text-slate">12</span> membres
        </p>
        <div className="flex items-center gap-xs">
          <button className="p-xs rounded-lg border border-slate-light text-slate-grey hover:bg-slate-light/10 transition-all">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={cn(
                "w-8 h-8 rounded-lg text-xs font-bold transition-all border",
                page === 1
                  ? "bg-[#8b701c] border-[#8b701c] text-white shadow-md shadow-primary/20"
                  : "border-slate-light text-slate-grey hover:bg-slate-light/10"
              )}
            >
              {page}
            </button>
          ))}
          <button className="p-xs rounded-lg border border-slate-light text-slate-grey hover:bg-slate-light/10 transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
