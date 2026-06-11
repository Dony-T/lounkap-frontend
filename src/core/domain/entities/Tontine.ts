export type TontineType = 'business' | 'family' | 'realestate' | 'other';
export type TontineRole = 'PRESIDENT' | 'TREASURER' | 'MEMBER' | 'SECRETARY' | 'ADMIN';

export interface TontineMembersCount {
  current: number;
  total: number;
}

export interface Tontine {
  id: string;
  type: TontineType;
  title: string;
  description: string;
  contribution: string;
  frequency: string;
  members: TontineMembersCount;
  role: TontineRole;
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTontineDTO {
  title: string;
  description: string;
  contribution: number;
  frequency: string;
  maxMembers: number;
}

export interface UpdateTontineDTO extends Partial<CreateTontineDTO> {}
