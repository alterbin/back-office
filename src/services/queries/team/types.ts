import { User } from '../auth/types';

export interface Team {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  onboarded: boolean;
}
export interface Teams {
  data: Team[];
  total: number;
}

export interface ReadRequest {
  page?: number;
  order?: string;
  take?: number;
  searchTerm?: string | string[] | undefined;
}

export interface InviteResponse {
  statusCode: number;
  description: string;
  data: Team;
}

export interface Invite {
  email: string;
  callbackUrl: string;
}

export interface IOnboard {
  firstName: string;
  lastName: string;
  newPassword: string;
}

export interface OnboardResponse {
  statusCode: number;
  description: string;
  data: User;
}
