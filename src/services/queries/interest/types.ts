import { User } from "../auth/types";
import { Given } from "../givens/types";

export interface Interest {
  id: string;
  note: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
  givenId: string;
  isAccepted: boolean;
  givens: Given;
}

export interface Interests {
  data: Interest[];
  total: number;
}

export interface ReadRequest {
  page?: number;
  order?: string;
  take?: number;
  searchTerm?: string | string[] | undefined;
  fromDate?: string;
  toDate?: string;
  given?: string;
  isFullfilled?: string;
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

export interface PageQuery {
  page: number;
  sortDir?: string;
  take: number;
  searchTerm?: string;
  fromDate: string;
  toDate?: string;
  from?: string;
  to?: string;
  status?: string;
  isFullfilled?: string;
  given?: string;
}
