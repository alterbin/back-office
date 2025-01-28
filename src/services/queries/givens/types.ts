import { User } from '../auth/types';

export interface Given {
  id: string;
  address: string;
  description: string;
  name: string;
  photos: string[];
  location: string;
  contact: string;
  userId?: string;
  interests?: string;
  status?: string;
}
export interface Givens {
  data: Given[];
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
  data: Given;
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
