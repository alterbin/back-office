import { User } from "../auth/types";

export interface Interest {
  id: string;
  note: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
  givenId: string;
  isAccepted: boolean;
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
