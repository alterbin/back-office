export interface IUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  onboarded: boolean;
  availableBalance: string;
  createdAt: string;
  fullName: string;
  stageName: string;
  type: string;
  status: string;
}
export interface IUsers {
  data: IUser[];
  total: number;
}

export interface BlockUserResponse {
  statusCode: number;
  description: string;
}

export enum AccountType {
  BRAND = 'brand',
  INFLUENCER = 'influencer',
}

export interface PageQuery {
  page: number;
  sortDir: string;
  take: number;
  searchTerm: string;
  maxBalance: string;
  minBalance: string;
  fromDate: string;
  toDate: string;
  type: string;
  id?: string;
}
